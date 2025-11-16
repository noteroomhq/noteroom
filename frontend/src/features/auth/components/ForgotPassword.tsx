import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "./AuthLayout"; 
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import OTPInput from "./OTPInput"; 
import ForgotImage from "../assets/images/forgot-password-page-img.png";
import NoteRoomLogo from "../assets/images/NoteRoom Logo Files/Logotype/PNG/Rectangle Horizontal/NoteRoom_logo-fullcolor-rgb-2-1000_1000px.png";

// small helper to validate email syntax
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---- password strength helpers (same as Signup) ----
type TPasswordCriteria = {
  minLength: boolean;
  upperCase: boolean;
  lowerCase: boolean;
  number: boolean;
};

const checkPasswordCriteria = (password: string): TPasswordCriteria => ({
  minLength: password.length >= 6,
  upperCase: /[A-Z]/.test(password),
  lowerCase: /[a-z]/.test(password),
  number: /[0-9]/.test(password),
});

const ForgotPassword: React.FC = () => {
  // --- Stage management: "email" | "otp" | "reset"
  const [stage, setStage] = useState<"email" | "otp" | "reset">("email");

  // --- email state + validation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);

  // --- loading + API error (for later backend integration)
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  // --- OTP UI
  const [otpValue, setOtpValue] = useState(""); // joined digits
  const [otpError, setOtpError] = useState<string | null>(null);

  // --- resend timer (seconds)
  const RESEND_SECONDS = 120;
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const timerRef = useRef<number | null>(null);

  // animation class toggles
  const [animateOtp, setAnimateOtp] = useState(false);

  // --- reset password stage state
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // password strength tracking (same as Signup)
  const [passwordCriteria, setPasswordCriteria] = useState<TPasswordCriteria>({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    number: false,
  });
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const allCriteriaMet = Object.values(passwordCriteria).every(Boolean);

  useEffect(() => {
    setPasswordCriteria(checkPasswordCriteria(newPassword));
  }, [newPassword]);

  // Clean up timer on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, []);

  // Start countdown when OTP stage activated
  useEffect(() => {
    if (stage === "otp") {
      setSecondsLeft(RESEND_SECONDS);
      // clear any existing
      if (timerRef.current) window.clearInterval(timerRef.current);

      timerRef.current = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            if (timerRef.current) window.clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [stage]);

  // --- helper: format seconds as mm:ss
  const formatTime = (s: number) => {
    const mm = Math.floor(s / 60)
      .toString()
      .padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${mm}:${ss}`;
  };

  // --- handle submit of email (first step)
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setEmailError(null);

    if (!email.trim()) {
      setEmailError("Email is required.");
      return;
    }
    if (!EMAIL_REGEX.test(email)) {
      setEmailError("Please provide an appropriate email address.");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with actual API call

      await new Promise((r) => setTimeout(r, 600));

      setStage("otp");
      requestAnimationFrame(() => setAnimateOtp(true));
    } catch (err) {
      setApiError("Unable to send reset code. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // --- handle OTP verify
  const handleOtpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);
    setApiError(null);

    if (otpValue.length !== 6 || /\D/.test(otpValue)) {
      setOtpError("Please enter the full 6-digit numeric code.");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with API call to verify OTP
      await new Promise((r) => setTimeout(r, 700));
      console.log("OTP verified:", otpValue);

      if (timerRef.current) {
        window.clearInterval(timerRef.current);
      }

      setStage("reset");
    } catch (err) {
      setApiError("Verification failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- handle resend code (enabled when secondsLeft === 0)
  const handleResend = async () => {
    setApiError(null);
    setOtpError(null);
    setSecondsLeft(RESEND_SECONDS);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    try {
      // TODO: API call to resend OTP
      await new Promise((r) => setTimeout(r, 500));
    } catch (err) {
      setApiError("Unable to resend code. Try again later.");
    }
  };

  // --- handle new password submit
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setApiError(null);

    if (!newPassword || !confirmPassword) {
      setPasswordError("Both password fields are required.");
      return;
    }

    if (!allCriteriaMet) {
      setPasswordError("Your password must meet the requirements below.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // TODO: call backend to actually reset password
      await new Promise((r) => setTimeout(r, 700));
      console.log("Password reset to:", newPassword);
      // redirect to login / success page here later
    } catch (err) {
      setApiError("Unable to reset password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout imageSrc={ForgotImage}>
      <div className="w-full h-3/4 lg:h-auto max-w-md relative">
        <img 
          src={NoteRoomLogo}
          alt="NoteRoom Logo"
          onClick={ ()=>{window.location.href="https://noteroom.co"} } 
          className="h-16 w-auto mx-auto md:h-20 mb-4 absolute -top-25 -right-4 md:-right-10 xl:-top-60 2xl:-top-80 xl:-right-25 2xl:-right-60 cursor-pointer" 	
        />

        {/* Email stage */}
        {stage === "email" && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-1 text-center">Forgot Password</h1>
            <p className="text-sm text-[#4B5563] text-center mb-4">
              Enter your email to reset your password
            </p>

            <AuthInput
              label="Email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                if (!email.trim()) setEmailError("Email is required.");
                else if (!EMAIL_REGEX.test(email))
                  setEmailError("Please provide an appropriate email address.");
                else setEmailError(null);
              }}
              placeholder="you@example.com"
              errorMessage={emailError ?? undefined}
              required
              disabled={loading}
            />

            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

            <AuthBtn label={loading ? "Sending..." : "Submit"} onClick={() => {}} disabled={loading} />
          </form>
        )}

        {/* OTP stage with animation */}
        {stage === "otp" && (
          <form
            onSubmit={handleOtpVerify}
            className={`flex flex-col gap-4 transition-all duration-400 ease-out transform ${
              animateOtp ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-6"
            }`}
          >
            <h1 className="text-3xl font-bold mb-1 text-center">OTP Verification</h1>
            <p className="text-sm text-gray-500 text-center mb-4">
              Check your email to see the verification code
            </p>

            <div className="flex justify-center mb-2">
              <OTPInput
                length={6}
                value={otpValue}
                onChange={(val) => {
                  setOtpValue(val);
                  if (val.length === 6) setOtpError(null);
                }}
                onComplete={(val) => {
                  setOtpValue(val);
                }}
                inputClassName="border-[#D3E0FE] text-[#2E3139] focus:border-[#42ACDE] focus:ring-[#42ACDE]"
                containerClassName="justify-center"
              />
            </div>

            {otpError && <p className="text-red-500 text-sm text-center">{otpError}</p>}
            {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

            <AuthBtn label={loading ? "Verifying..." : "Verify"} onClick={() => {}} disabled={loading || otpValue.length !== 6} />

            <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
              <div>
                <button
                  type="button"
                  onClick={() => {
                    setStage("email");
                    setAnimateOtp(false);
                    setOtpValue("");
                    setOtpError(null);
                  }}
                  className="underline text-[#6B6F89] hover:text-gray-800 cursor-pointer"
                >
                  Change email
                </button>
              </div>

              <div className="text-right">
                <div className="text-xs">
                  {secondsLeft > 0 ? (
                    <span>
                      Resend code in{" "}
                      <span className="text-[#42ACDE]">{formatTime(secondsLeft)}</span>
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="font-medium"
                    >
                      Didn't receive code?
                      <span className="text-[#42ACDE] hover:underline cursor-pointer">
                        {" "}Resend code
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}

        {/* Reset password stage */}
        {stage === "reset" && (
          <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-1 text-center">Set a new password</h1>
            <p className="text-sm text-[#4B5563] text-center mb-4">
              Enter your new password to complete the reset process
            </p>

            {/* New Password */}
            <div className="mb-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  name="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => setIsPasswordFocused(true)}
                  placeholder="Enter your new password"
                  className={`w-full text-xs border rounded-[18px] ${
                    passwordError ? "border-red-500 focus:border-[#42ACDE]" : "border-gray-300 focus:border-[#42ACDE]"
                  } px-3 py-3 caret-[#42ACDE] outline-none`}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showNewPassword ? (
                    // eye-open
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_open_new)">
                        <path d="M9.16798 12.7508C5.94298 12.8258 3.82798 10.0583 3.16798 9.00082C3.63783 8.25134 4.2025 7.56567 4.84798 6.96082L3.75298 5.90332C2.90648 6.70092 2.18129 7.61815 1.60048 8.62582C1.53465 8.73984 1.5 8.86917 1.5 9.00082C1.5 9.13247 1.53465 9.26181 1.60048 9.37582C2.07298 10.1933 4.60048 14.2508 9.01798 14.2508H9.20548C10.0361 14.2262 10.8561 14.0561 11.628 13.7483L10.443 12.5633C10.0263 12.6729 9.59862 12.7358 9.16798 12.7508Z" fill="#9CA3AF"/>
                        <path d="M16.4025 8.62429C15.9225 7.79179 13.275 3.61429 8.7975 3.74929C7.96684 3.77393 7.14693 3.94401 6.375 4.25179L7.56 5.43679C7.97672 5.32717 8.40436 5.26428 8.835 5.24929C12.0525 5.16679 14.1675 7.94179 14.835 8.99929C14.3535 9.75101 13.7762 10.4368 13.1175 11.0393L14.25 12.0968C15.1071 11.3013 15.8425 10.384 16.4325 9.37429C16.4938 9.25766 16.5233 9.12694 16.5181 8.99527C16.5128 8.86361 16.4729 8.73565 16.4025 8.62429Z" fill="#9CA3AF"/>
                      </g>
                      <circle cx="9" cy="9" r="2" fill="#9DA3AE"/>
                      <defs>
                        <clipPath id="clip0_open_new">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    // eye-closed
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_closed_new)">
                        <path d="M3.53166 2.46764C3.46173 2.39771 3.37872 2.34224 3.28735 2.30439C3.19598 2.26655 3.09806 2.24707 2.99916 2.24707C2.90027 2.24707 2.80234 2.26655 2.71098 2.30439C2.61961 2.34224 2.53659 2.39771 2.46666 2.46764C2.32543 2.60887 2.24609 2.80041 2.24609 3.00014C2.24609 3.19987 2.32543 3.39141 2.46666 3.53264L6.68916 7.75514C6.42202 8.2521 6.3221 8.82192 6.40423 9.38013C6.48636 9.93833 6.74615 10.4552 7.14512 10.8542C7.54408 11.2531 8.06097 11.5129 8.61918 11.5951C9.17738 11.6772 9.7472 11.5773 10.2442 11.3101L14.4667 15.5326C14.5364 15.6029 14.6193 15.6587 14.7107 15.6968C14.8021 15.7349 14.9002 15.7545 14.9992 15.7545C15.0982 15.7545 15.1962 15.7349 15.2876 15.6968C15.379 15.6587 15.4619 15.6029 15.5317 15.5326C15.602 15.4629 15.6578 15.38 15.6958 15.2886C15.7339 15.1972 15.7535 15.0991 15.7535 15.0001C15.7535 14.9011 15.7339 14.8031 15.6958 14.7117C15.6578 14.6203 15.602 14.5374 15.5317 14.4676L3.53166 2.46764ZM8.99916 10.1251C8.70079 10.1251 8.41465 10.0066 8.20367 9.79563C7.99269 9.58466 7.87416 9.29851 7.87416 9.00014V8.94764L9.04416 10.1176L8.99916 10.1251Z" fill="#9CA3AF"/>
                        <path d="M9.16798 12.7508C5.94298 12.8258 3.82798 10.0583 3.16798 9.00082C3.63783 8.25134 4.2025 7.56567 4.84798 6.96082L3.75298 5.90332C2.90648 6.70092 2.18129 7.61815 1.60048 8.62582C1.53465 8.73984 1.5 8.86917 1.5 9.00082C1.5 9.13247 1.53465 9.26181 1.60048 9.37582C2.07298 10.1933 4.60048 14.2508 9.01798 14.2508H9.20548C10.0361 14.2262 10.8561 14.0561 11.628 13.7483L10.443 12.5633C10.0263 12.6729 9.59862 12.7358 9.16798 12.7508Z" fill="#9CA3AF"/>
                        <path d="M16.4025 8.62429C15.9225 7.79179 13.275 3.61429 8.7975 3.74929C7.96684 3.77393 7.14693 3.94401 6.375 4.25179L7.56 5.43679C7.97672 5.32717 8.40436 5.26428 8.835 5.24929C12.0525 5.16679 14.1675 7.94179 14.835 8.99929C14.3535 9.75101 13.7762 10.4368 13.1175 11.0393L14.25 12.0968C15.1071 11.3013 15.8425 10.384 16.4325 9.37429C16.4938 9.25766 16.5233 9.12694 16.5181 8.99527C16.5128 8.86361 16.4729 8.73565 16.4025 8.62429Z" fill="#9CA3AF"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_closed_new">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </button>
              </div>

              {isPasswordFocused && (
                <div className="mt-2 text-sm">
                  <ul className="grid grid-cols-2 gap-x-5">
                    <li className={passwordCriteria.minLength ? "text-green-600" : "text-gray-400"}>
                      Minimum 6 characters
                    </li>
                    <li className={passwordCriteria.upperCase ? "text-green-600" : "text-gray-400"}>
                      At least 1 uppercase letter
                    </li>
                    <li className={passwordCriteria.lowerCase ? "text-green-600" : "text-gray-400"}>
                      At least 1 lowercase letter
                    </li>
                    <li className={passwordCriteria.number ? "text-green-600" : "text-gray-400"}>
                      At least 1 number
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Confirm New Password */}
            <div className="mb-1">
              <label className="block mb-1 text-sm font-medium text-gray-700">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
                  className={`w-full text-xs border rounded-[18px] ${
                    passwordError ? "border-red-500 focus:border-[#42ACDE]" : "border-gray-300 focus:border-[#42ACDE]"
                  } px-3 py-3 caret-[#42ACDE] outline-none`}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? (
                    // eye-open
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_open_confirm)">
                        <path d="M9.16798 12.7508C5.94298 12.8258 3.82798 10.0583 3.16798 9.00082C3.63783 8.25134 4.2025 7.56567 4.84798 6.96082L3.75298 5.90332C2.90648 6.70092 2.18129 7.61815 1.60048 8.62582C1.53465 8.73984 1.5 8.86917 1.5 9.00082C1.5 9.13247 1.53465 9.26181 1.60048 9.37582C2.07298 10.1933 4.60048 14.2508 9.01798 14.2508H9.20548C10.0361 14.2262 10.8561 14.0561 11.628 13.7483L10.443 12.5633C10.0263 12.6729 9.59862 12.7358 9.16798 12.7508Z" fill="#9CA3AF"/>
                        <path d="M16.4025 8.62429C15.9225 7.79179 13.275 3.61429 8.7975 3.74929C7.96684 3.77393 7.14693 3.94401 6.375 4.25179L7.56 5.43679C7.97672 5.32717 8.40436 5.26428 8.835 5.24929C12.0525 5.16679 14.1675 7.94179 14.835 8.99929C14.3535 9.75101 13.7762 10.4368 13.1175 11.0393L14.25 12.0968C15.1071 11.3013 15.8425 10.384 16.4325 9.37429C16.4938 9.25766 16.5233 9.12694 16.5181 8.99527C16.5128 8.86361 16.4729 8.73565 16.4025 8.62429Z" fill="#9CA3AF"/>
                      </g>
                      <circle cx="9" cy="9" r="2" fill="#9DA3AE"/>
                      <defs>
                        <clipPath id="clip0_open_confirm">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  ) : (
                    // eye-closed
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_closed_confirm)">
                        <path d="M3.53166 2.46764C3.46173 2.39771 3.37872 2.34224 3.28735 2.30439C3.19598 2.26655 3.09806 2.24707 2.99916 2.24707C2.90027 2.24707 2.80234 2.26655 2.71098 2.30439C2.61961 2.34224 2.53659 2.39771 2.46666 2.46764C2.32543 2.60887 2.24609 2.80041 2.24609 3.00014C2.24609 3.19987 2.32543 3.39141 2.46666 3.53264L6.68916 7.75514C6.42202 8.2521 6.3221 8.82192 6.40423 9.38013C6.48636 9.93833 6.74615 10.4552 7.14512 10.8542C7.54408 11.2531 8.06097 11.5129 8.61918 11.5951C9.17738 11.6772 9.7472 11.5773 10.2442 11.3101L14.4667 15.5326C14.5364 15.6029 14.6193 15.6587 14.7107 15.6968C14.8021 15.7349 14.9002 15.7545 14.9992 15.7545C15.0982 15.7545 15.1962 15.7349 15.2876 15.6968C15.379 15.6587 15.4619 15.6029 15.5317 15.5326C15.602 15.4629 15.6578 15.38 15.6958 15.2886C15.7339 15.1972 15.7535 15.0991 15.7535 15.0001C15.7535 14.9011 15.7339 14.8031 15.6958 14.7117C15.6578 14.6203 15.602 14.5374 15.5317 14.4676L3.53166 2.46764ZM8.99916 10.1251C8.70079 10.1251 8.41465 10.0066 8.20367 9.79563C7.99269 9.58466 7.87416 9.29851 7.87416 9.00014V8.94764L9.04416 10.1176L8.99916 10.1251Z" fill="#9CA3AF"/>
                        <path d="M9.16798 12.7508C5.94298 12.8258 3.82798 10.0583 3.16798 9.00082C3.63783 8.25134 4.2025 7.56567 4.84798 6.96082L3.75298 5.90332C2.90648 6.70092 2.18129 7.61815 1.60048 8.62582C1.53465 8.73984 1.5 8.86917 1.5 9.00082C1.5 9.13247 1.53465 9.26181 1.60048 9.37582C2.07298 10.1933 4.60048 14.2508 9.01798 14.2508H9.20548C10.0361 14.2262 10.8561 14.0561 11.628 13.7483L10.443 12.5633C10.0263 12.6729 9.59862 12.7358 9.16798 12.7508Z" fill="#9CA3AF"/>
                        <path d="M16.4025 8.62429C15.9225 7.79179 13.275 3.61429 8.7975 3.74929C7.96684 3.77393 7.14693 3.94401 6.375 4.25179L7.56 5.43679C7.97672 5.32717 8.40436 5.26428 8.835 5.24929C12.0525 5.16679 14.1675 7.94179 14.835 8.99929C14.3535 9.75101 13.7762 10.4368 13.1175 11.0393L14.25 12.0968C15.1071 11.3013 15.8425 10.384 16.4325 9.37429C16.4938 9.25766 16.5233 9.12694 16.5181 8.99527C16.5128 8.86361 16.4729 8.73565 16.4025 8.62429Z" fill="#9CA3AF"/>
                      </g>
                      <defs>
                        <clipPath id="clip0_closed_confirm">
                          <rect width="18" height="18" fill="white"/>
                        </clipPath>
                      </defs>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {passwordError && (
              <p className="text-sm text-red-500 mt-1">{passwordError}</p>
            )}
            {apiError && (
              <p className="text-sm text-red-500 mt-1">{apiError}</p>
            )}

            <AuthBtn
              label={loading ? "Confirming..." : "Confirm"}
              onClick={() => {}}
              disabled={loading}
            />
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
