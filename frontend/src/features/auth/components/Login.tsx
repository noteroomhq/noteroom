import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import LoginImage from "../assets/images/login-page-img.png";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Field-specific validation errors
	const [emailError, setEmailError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);

	// Simple email validation regex
	const validateEmail = (email: string) => {
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return regex.test(email);
	};

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setError(null);
		setEmailError(null);
		setPasswordError(null);

		let isValid = true;

		// Client-side validation before API call
		if (!email.trim()) {
			setEmailError("Email is required.");
			isValid = false;
		} else if (!validateEmail(email)) {
			setEmailError("Please provide a valid email address.");
			isValid = false;
		}

		if (!password.trim()) {
			setPasswordError("Password is required.");
			isValid = false;
		}

		if (!isValid) return; // Stop if validation fails

		setLoading(true);

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ email, password }),
			});

			if (!response.ok) {
				if (response.status === 401) {
					setError("Invalid email or password.");
				} else if (response.status === 404) {
					setError("No user found with this email. Try signing up instead.");
				} else {
					setError("Something went wrong. Please try again later.");
				}
				return;
			}

			const data = await response.json();
			console.log("Login success:", data);
			// redirect logic here (navigate("/dashboard")) etc.
		} catch (err) {
			setError("Network error. Please check your connection.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout imageSrc={LoginImage}>
			<div className="w-full max-w-md">
				<h1 className="text-3xl font-bold mb-6 text-center">
					Welcome Back to NoteRoom
				</h1>

				<form className="flex flex-col gap-4" onSubmit={handleLogin}>
					<AuthInput
						label="Email"
						name="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						errorMessage={emailError || undefined}
						disabled={loading}
						required
					/>
					<AuthInput
						label="Password"
						name="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						errorMessage={passwordError || undefined}
						disabled={loading}
						required
					/>

					{error && (
						<p className="text-red-500 text-sm text-center mt-2">{error}</p>
					)}

					<AuthBtn label={loading ? "Logging in..." : "Login"} disabled={loading} />

					<p className="text-sm text-center mt-4 text-gray-500">
						Don’t have an account?{" "}
						<Link to="/signup" className="text-blue-600 hover:underline">
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</AuthLayout>
	);
};

export default Login;
