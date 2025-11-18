import React, { useState } from "react";
import AuthLayout from "./AuthLayout";
import ForgotImage from "../assets/images/forgot-password-page-img.png";
import NoteRoomLogo from "../assets/images/NoteRoom Logo Files/Logotype/PNG/Rectangle Horizontal/NoteRoom_logo-fullcolor-rgb-2-1000_1000px.png";
import z, { treeifyError } from "zod";
import EmailStage from "./forgot-password/EmailStage";
import OTPStage from "./forgot-password/OTPStage";
import PasswordResetStage from "./forgot-password/PasswordResetStage";
import { PasswordSchema } from "../utils";

const EmailSchema = z.string().nonempty({ error: "Email is required!" }).email({ error: "Provide a valid email address" })
const OTPSchema = z.array(z.string()).length(6, { error: "Please enter the full 6-digit code." })
const ResetPasswordSchema = z.object({
	password: PasswordSchema,
	confirmPassword: z.string()
})

const ForgotPassword: React.FC = () => {
	// --- Stage management: "email" | "otp" | "reset"
	const [stage, setStage] = useState<"email" | "otp" | "reset">("email");

	const [email, setEmail] = useState("");
	const [emailError, setEmailError] = useState<string | null>(null);

	// --- loading + API error (for later backend integration)
	const [loading, setLoading] = useState(false);
	const [apiError, setApiError] = useState<string | null>(null);

	const [otpValue, setOtpValue] = useState<Array<string>>(Array.from({ length: 6 }, () => ""))
	const [otpError, setOtpError] = useState<string | null>(null);

	const [password, setPassword] = useState<string>("")
	const [confirmPassword, setConfirmPassword] = useState<string>("")
	const [resetPasswordError, setResetPasswordError] = useState<string | null>(null)

	const handleEmailSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setApiError(null);
		setEmailError(null);

		const parsedEmail = EmailSchema.safeParse(email)
		if (!parsedEmail.success) {
			const { errors } = treeifyError(parsedEmail.error)
			return setEmailError(errors[0])
		}

		setLoading(true);
		try {
			// TODO: replace with actual API call
			await new Promise((r) => setTimeout(r, 600));

			setStage("otp");
		} catch (err) {
			setApiError("Unable to send reset code. Try again later.");
		} finally {
			setLoading(false);
		}
	};

	const handleOTPSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setOtpError(null);
		setApiError(null);

		const parsedOtp = OTPSchema.safeParse(otpValue)
		if (!parsedOtp.success) {
			const { errors } = treeifyError(parsedOtp.error)
			return setOtpError(errors[0])
		}

		setLoading(true);
		try {
			// TODO: Replace with API call to verify OTP
			await new Promise((r) => setTimeout(r, 700));
			console.log("OTP verified:", otpValue.join(""));

			setStage("reset");
		} catch (err) {
			setApiError("Verification failed. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleResetSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setResetPasswordError(null)
		setApiError(null);

		const parsedPasswords = ResetPasswordSchema.safeParse({ password, confirmPassword })
		if (!parsedPasswords.success) {
			const { errors } = treeifyError(parsedPasswords.error)
			return setResetPasswordError(errors[0])
		}

		setLoading(true);
		try {
			// TODO: Replace with API call to change password
			await new Promise((r) => setTimeout(r, 700));
			console.log("Password changed: ", password);
		} catch (err) {
			setApiError("Couldn't reset password. Please try again");
		} finally {
			setLoading(false);
		}
	}

	return (
		<AuthLayout imageSrc={ForgotImage}>
			<div className="w-full h-3/4 lg:h-auto max-w-md relative">
				<img
					src={NoteRoomLogo}
					alt="NoteRoom Logo"
					onClick={() => { window.location.href = "https://noteroom.co" }}
					className="h-16 w-auto mx-auto md:h-20 mb-4 absolute -top-25 -right-4 md:-right-10 xl:-top-60 2xl:-top-80 xl:-right-25 2xl:-right-60 cursor-pointer"
				/>

				{stage === "email" && (
					<EmailStage 
						email={[email, setEmail]} 
						error={[apiError, emailError]} 
						isLoading={loading} 
						handleEmailSubmit={handleEmailSubmit}
					/>
				)}

				{stage === "otp" && (
					<OTPStage 
						otpValue={[otpValue, setOtpValue]} 
						error={[apiError, otpError]}
						isLoading={loading}
						handleOTPSubmit={handleOTPSubmit}
					/>
				)}

				{stage === "reset" && (
					<PasswordResetStage 
						passwords={[[password, setPassword], [confirmPassword, setConfirmPassword]]}
						errors={[apiError, [resetPasswordError, setResetPasswordError]]}
						handleResetSubmit={handleResetSubmit}
						isLoading={loading}
					/>
				)}
			</div>
		</AuthLayout>
	);
};

export default ForgotPassword;
