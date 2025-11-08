import React, { useEffect, useRef, useState } from "react";
import AuthLayout from "./AuthLayout"; 
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import OTPInput from "./OTPInput"; 
import ForgotImage from "../assets/images/forgot-password-page-img.png";

// small helper to validate email syntax
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPassword: React.FC = () => {
  // --- Stage management: "email" | "otp"
  const [stage, setStage] = useState<"email" | "otp">("email");

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

    // Everything okay on client — trigger backend call to request OTP
    // For now we simulate and move to OTP stage
    setLoading(true);
    try {
      // TODO: replace with actual API call
      // const res = await fetch("/api/auth/forgot-password", { method: "POST", ... })
      // if (!res.ok) { ... }

      // small artificial delay to show loading and animation
      await new Promise((r) => setTimeout(r, 600));

      // move to OTP stage with animation
      setStage("otp");
      // trigger animation a tick later so the element can mount then animate
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
      // const res = await fetch('/api/auth/verify-otp', {method: 'POST', body: ...})
      // simulate delay
      await new Promise((r) => setTimeout(r, 700));
      // On success, redirect to reset password page or allow password reset:
      console.log("OTP verified:", otpValue);
      // For now we just console.log — replace with navigation to reset-password page
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
    // reset timer and simulate request
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
      // possible message: "A new code was sent"
    } catch (err) {
      setApiError("Unable to resend code. Try again later.");
    }
  };

  return (
    <AuthLayout imageSrc={ForgotImage}>
      <div className="w-full max-w-md">
        {/* Email stage */}
        {stage === "email" && (
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-1 text-center">Forgot Password</h1>
            <p className="text-sm text-gray-500 text-center mb-4">
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
                inputClassName="border-gray-300"
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
                    setStage("email"); // allow user to go back and re-enter email
                    setAnimateOtp(false);
                    setOtpValue("");
                    setOtpError(null);
                  }}
                  className="underline text-gray-600 hover:text-gray-800"
                >
                  Change email
                </button>
              </div>

              <div className="text-right">
                <div className="text-xs">
                  {secondsLeft > 0 ? (
                    <span>Resend code in {formatTime(secondsLeft)}</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Resend code
                    </button>
                  )}
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
