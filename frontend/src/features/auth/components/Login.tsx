import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import LoginImage from "../assets/images/login-page-img.png";
import NoteRoomLogo from "../assets/images/NoteRoom Logo Files/Logotype/PNG/Rectangle Horizontal/NoteRoom_logo-fullcolor-rgb-2-1000_1000px.png";
import z, { treeifyError } from "zod";

const LoginFormSchema = z.object({
	email: z.email("Please provide a valid email address."),
	password: z.string().min(1, "Password is required.")
})
type TFormData = z.infer<typeof LoginFormSchema>
type TErrors = { email?: string, password?: string }

const Login = () => {
	const [form, setForm] = useState<TFormData>({
		email: "",
		password: ""
	})
	const [errors, setErrors] = useState<TErrors>({
		email: "",
		password: ""
	})
	const [isFormValid, setIsFormValid] = useState<boolean>(false)
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false); // NEW

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	}

	const validateForm = useCallback(() => {
		if (form.email || form.password) {
			const newErrors: TErrors = {}

			const parsedFormData = LoginFormSchema.safeParse(form)
			if (!parsedFormData.success) {
				const { properties } = treeifyError(parsedFormData.error)
				if (properties) {
					(Object.keys(properties) as Array<keyof TFormData>).forEach(key => {
						const error = properties[key]?.errors[0]
						newErrors[key] = error
					})
				}
			}

			setIsFormValid(parsedFormData.success)
			setErrors(newErrors)
		}
	}, [form])

	useEffect(() => {
		validateForm()
	}, [form, validateForm])

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		
		setLoading(true)

		try {
			const response = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ 
					email: form.email, 
					password: form.password,
					rememberMe, // NEW: front-end flag for backend
				}),
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
		} catch (err) {
			setError("Network error. Please check your connection.");
		} finally {
			setLoading(false);
		}
	};

	return (
		<AuthLayout imageSrc={LoginImage}>
			<div className="w-full max-w-md relative">
				<img 
					src={NoteRoomLogo}
					alt="NoteRoom Logo"
					onClick={ ()=>{window.location.href="https://noteroom.co"} } 
					className="h-16 w-auto mx-auto xl:h-20 mb-4 absolute -top-25 -right-4 xl:-right-10 xl:-top-30 2xl:-top-50 2xl:-right-40 cursor-pointer" 	
				/>
				<h1 className="text-3xl font-bold mb-6 text-center">
					Welcome Back to NoteRoom
				</h1>

				<form className="flex flex-col gap-4" onSubmit={handleLogin}>
					<AuthInput
						label="Email"
						name="email"
						type="email"
						value={form.email}
						onChange={handleChange}
						errorMessage={errors.email}
						disabled={loading}
						required
					/>

					{/* Password field with show/hide + same icons as Signup */}
					<div className="mb-2">
						<label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={form.password}
								onChange={handleChange}
								placeholder="Enter your password"
								className={`w-full text-xs border rounded-[18px] ${errors.password ? "border-red-500 focus:border-[#42ACDE]" : "border-gray-300 focus:border-[#42ACDE]"} px-3 py-3 caret-[#42ACDE] outline-none`}
								disabled={loading}
								required
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
							>
								{showPassword ? (
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_10309_5844)">
											<path d="M9.16798 12.7508C5.94298 12.8258 3.82798 10.0583 3.16798 9.00082C3.63783 8.25134 4.2025 7.56567 4.84798 6.96082L3.75298 5.90332C2.90648 6.70092 2.18129 7.61815 1.60048 8.62582C1.53465 8.73984 1.5 8.86917 1.5 9.00082C1.5 9.13247 1.53465 9.26181 1.60048 9.37582C2.07298 10.1933 4.60048 14.2508 9.01798 14.2508H9.20548C10.0361 14.2262 10.8561 14.0561 11.628 13.7483L10.443 12.5633C10.0263 12.6729 9.59862 12.7358 9.16798 12.7508Z" fill="#9CA3AF"/>
											<path d="M16.4025 8.62429C15.9225 7.79179 13.275 3.61429 8.7975 3.74929C7.96684 3.77393 7.14693 3.94401 6.375 4.25179L7.56 5.43679C7.97672 5.32717 8.40436 5.26428 8.835 5.24929C12.0525 5.16679 14.1675 7.94179 14.835 8.99929C14.3535 9.75101 13.7762 10.4368 13.1175 11.0393L14.25 12.0968C15.1071 11.3013 15.8425 10.384 16.4325 9.37429C16.4938 9.25766 16.5233 9.12694 16.5181 8.99527C16.5128 8.86361 16.4729 8.73565 16.4025 8.62429V8.62429Z" fill="#9CA3AF"/>
										</g>
										<circle cx="9" cy="9" r="2" fill="#9DA3AE"/>
										<defs>
											<clipPath id="clip0_10309_5844">
												<rect width="18" height="18" fill="white"/>
											</clipPath>
										</defs>
									</svg>
								) : (
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clipPath="url(#clip0_9435_10824)">
											<path d="M3.53166 2.46764C3.46173 2.39771 3.37872 2.34224 3.28735 2.30439C3.19598 2.26655 3.09806 2.24707 2.99916 2.24707C2.90027 2.24707 2.80234 2.26655 2.71098 2.30439C2.61961 2.34224 2.53659 2.39771 2.46666 2.46764C2.32543 2.60887 2.24609 2.80041 2.24609 3.00014C2.24609 3.19987 2.32543 3.39141 2.46666 3.53264L6.68916 7.75514C6.42202 8.2521 6.3221 8.82192 6.40423 9.38013C6.48636 9.93833 6.74615 10.4552 7.14512 10.8542C7.54408 11.2531 8.06097 11.5129 8.61918 11.5951C9.17738 11.6772 9.7472 11.5773 10.2442 11.3101L14.4667 15.5326C14.5364 15.6029 14.6193 15.6587 14.7107 15.6968C14.8021 15.7349 14.9002 15.7545 14.9992 15.7545C15.0982 15.7545 15.1962 15.7349 15.2876 15.6968C15.379 15.6587 15.4619 15.6029 15.5317 15.5326C15.602 15.4629 15.6578 15.38 15.6958 15.2886C15.7339 15.1972 15.7535 15.0991 15.7535 15.0001C15.7535 14.9011 15.7339 14.8031 15.6958 14.7117C15.6578 14.6203 15.602 14.5374 15.5317 14.4676L3.53166 2.46764ZM8.99916 10.1251C8.70079 10.1251 8.41465 10.0066 8.20367 9.79563C7.99269 9.58466 7.87416 9.29851 7.87416 9.00014V8.94764L9.04416 10.1176L8.99916 10.1251Z" fill="#9CA3AF"/>
											<path d="M9.16798 12.7508C5.94298 12.8258 3.82798 10.0583 3.16798 9.00082C3.63783 8.25134 4.2025 7.56567 4.84798 6.96082L3.75298 5.90332C2.90648 6.70092 2.18129 7.61815 1.60048 8.62582C1.53465 8.73984 1.5 8.86917 1.5 9.00082C1.5 9.13247 1.53465 9.26181 1.60048 9.37582C2.07298 10.1933 4.60048 14.2508 9.01798 14.2508H9.20548C10.0361 14.2262 10.8561 14.0561 11.628 13.7483L10.443 12.5633C10.0263 12.6729 9.59862 12.7358 9.16798 12.7508Z" fill="#9CA3AF"/>
											<path d="M16.4025 8.62429C15.9225 7.79179 13.275 3.61429 8.7975 3.74929C7.96684 3.77393 7.14693 3.94401 6.375 4.25179L7.56 5.43679C7.97672 5.32717 8.40436 5.26428 8.835 5.24929C12.0525 5.16679 14.1675 7.94179 14.835 8.99929C14.3535 9.75101 13.7762 10.4368 13.1175 11.0393L14.25 12.0968C15.1071 11.3013 15.8425 10.384 16.4325 9.37429C16.4938 9.25766 16.5233 9.12694 16.5181 8.99527C16.5128 8.86361 16.4729 8.73565 16.4025 8.62429Z" fill="#9CA3AF"/>
										</g>
										<defs>
											<clipPath id="clip0_9435_10824">
												<rect width="18" height="18" fill="white"/>
											</clipPath>
										</defs>
									</svg>
								)}
							</button>
						</div>
						{errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
					</div>

					{/* Remember me + Forgot Password */}
					<div className="flex items-center justify-between mb-2">
						<label className="flex items-center text-sm text-gray-600">
							<input
								type="checkbox"
								className="h-4 w-4 text-[#42ACDE] border-gray-300  rounded focus:ring-[#42ACDE] cursor-pointer"
								checked={rememberMe}
								onChange={(e) => setRememberMe(e.target.checked)}
								disabled={loading}
							/>
							<span className="ml-2 cursor-pointer">Remember me</span>
						</label>
						<Link
							to="/forgot-password"
							className="text-sm text-[#2E3139] hover:underline underline underline-offset-2 cursor-pointer"
						>
							Forgot Password?
						</Link>
					</div>

					{error && (
						<p className="text-red-500 text-sm text-center mt-2">{error}</p>
					)}

					<AuthBtn label={loading ? "Logging in..." : "Login"} onClick={handleLogin} disabled={loading || !isFormValid} />

					<p className="text-sm text-center mt-4 text-[#9CA3AF]">
						Don’t have an account?{" "}
						<Link to="/signup" className="text-[#42ACDE] hover:underline">
							Sign up
						</Link>
					</p>
				</form>
			</div>
		</AuthLayout>
	);
};

export default Login;
