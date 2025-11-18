import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import SignupImage from "../assets/images/signup-page-img.png";
import NoteRoomLogo from "../assets/images/NoteRoom Logo Files/Logotype/PNG/Rectangle Horizontal/NoteRoom_logo-fullcolor-rgb-2-1000_1000px.png";
import { treeifyError, z } from "zod"

type TErrors = { name?: string, email?: string, password?: string }
type TPasswordCriteria = { minLength: boolean, upperCase: boolean, lowerCase: boolean, number: boolean }

const checkPasswordCriteria = (password: string): TPasswordCriteria => ({
	minLength: password.length >= 6,
	upperCase: /[A-Z]/.test(password),
	lowerCase: /[a-z]/.test(password),
	number: /[0-9]/.test(password),
})

const SignupFormSchema = z.object({
	name: z.string().min(4, "Full Name must be more than four characters"),
	email: z.email("Please enter a valid email address"),
	password: z.string().min(6, "Your password must meet below requirements")
		.refine(val => Object.values(checkPasswordCriteria(val)).every(v => v),
		{ error: "Password must contain uppercases, lowercases and numbers" })
})
type TFormData = z.infer<typeof SignupFormSchema>


const Signup = () => {
	const [form, setForm] = useState<TFormData>({
		name: "",
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<TErrors>({
		name: "",
		email: "",
		password: "",
	});
	const [passwordCriteria, setPasswordCriteria] = useState<TPasswordCriteria>({
		minLength: false,
		upperCase: false,
		lowerCase: false,
		number: false,
	});
	const [isFormValid, setIsFormValid] = useState(false);
	const [isPasswordFocused, setIsPasswordFocused] = useState(false);
	const [showPassword, setShowPassword] = useState(false); // Track password visibility
	const [loading, setLoading] = useState<boolean>(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		validateForm(); // Validate on blur to show errors
	};

	const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
		if (e.target.name === "password") {
			setIsPasswordFocused(true); // Show password criteria when focused
		}
	};

	const validateForm = useCallback(() => {
		if (form.name || form.password || form.email) {
			const newErrors: TErrors = {};
	
			const parsedFormData = SignupFormSchema.safeParse(form)
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
	}, [form]);

	const handleSignup = (e: React.FormEvent) => {
		e.preventDefault();

		setLoading(true)

		try {
			setTimeout(() => {
				setLoading(false)
			}, 3000)
		} catch (error) {
			console.error(error)
		} finally {
			setLoading(false)
		}
		
		//TODO: backend for signup
		console.log(form)
	};

	
	useEffect(() => {
		validateForm();
	}, [form, validateForm]);

	useEffect(() => {
		setPasswordCriteria(checkPasswordCriteria(form.password))
	}, [form.password])

	return (
		<AuthLayout imageSrc={SignupImage}>
			<div className="w-full max-w-md relative">
				<img 
					src={NoteRoomLogo}
					alt="NoteRoom Logo"
					onClick={ ()=>{window.location.href="https://noteroom.co"} } 
					className="h-16 w-auto mx-auto md:h-20 mb-4 absolute -top-25 -right-4 md:-right-10 xl:-top-30 2xl:-top-50 xl:-right-25 2xl:-right-40 cursor-pointer" 	
				/>
				<h1 className="text-3xl font-bold mb-6 text-center">Welcome to NoteRoom</h1>
				<div className="w-full">
					
				</div>

				<form className="flex flex-col gap-4">
					<AuthInput
						label="Full Name"
						name="name"
						value={form.name}
						onChange={handleChange}
						onBlur={handleBlur}
						onFocus={handleFocus}
						errorMessage={errors.name}
						placeholder="Enter your full name"
						required
					/>
					<AuthInput
						label="Email"
						name="email"
						type="email"
						value={form.email}
						onChange={handleChange}
						onBlur={handleBlur}
						onFocus={handleFocus}
						errorMessage={errors.email}
						placeholder="Enter your email"
						required
					/>

					{/* Password Field - used a different component */}
					<div className="mb-4">
						<label className="block mb-1 text-sm font-medium text-gray-700">Password</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								name="password"
								value={form.password}
								onChange={handleChange}
								onBlur={handleBlur}
								onFocus={handleFocus}
								placeholder="Enter your password"
								className={`w-full text-xs border rounded-[18px] ${errors.password ? "border-red-500 focus:border-[#42ACDE]" : "border-gray-300 focus:border-[#42ACDE]"} px-3 py-3 caret-[#42ACDE] outline-none`}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
							>
								{showPassword ? (
									<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
										<g clip-path="url(#clip0_10309_5844)">
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
										<g clip-path="url(#clip0_9435_10824)">
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

					<AuthBtn label={loading ? "Signing in..." : "Sign Up"} onClick={handleSignup} disabled={loading || !isFormValid} />

					<p className="text-sm text-center mt-4 text-[#9CA3AF]">
						Already have an account?{" "}
						<Link to="/login" className="text-[#42ACDE] hover:underline">
							Log in
						</Link>
					</p>
				</form>
			</div>
		</AuthLayout>
	);
};

export default Signup;
