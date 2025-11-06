import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import SignupImage from "../assets/images/signup-page-img.png";
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
	password: z.string().min(6, "Password must be at least 6 characters")
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
			<div className="w-full max-w-md">
				<h1 className="text-3xl font-bold mb-6 text-center">Welcome to NoteRoom</h1>

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

					{/* Password Field */}
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
								className={`w-full border ${errors.password ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"} rounded-lg px-3 py-2 focus:ring-2 outline-none`}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							>
								{showPassword ? (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12c0 3.866-3.134 7-7 7S1 15.866 1 12s3.134-7 7-7 7 3.134 7 7z"
										/>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
										className="w-5 h-5"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={2}
											d="M15 12c0 3.866-3.134 7-7 7S1 15.866 1 12s3.134-7 7-7 7 3.134 7 7z"
										/>
									</svg>
								)}
							</button>
						</div>
						{errors.password && <p className="text-sm text-red-500 mt-1">{errors.password}</p>}
						{isPasswordFocused && (
							<div className="mt-2 text-sm">
								<ul className="grid grid-cols-2 gap-x-5">
									<li className={passwordCriteria.minLength ? "text-green-500" : "text-red-500"}>
										Minimum 6 characters
									</li>
									<li className={passwordCriteria.upperCase ? "text-green-500" : "text-red-500"}>
										At least 1 uppercase letter
									</li>
									<li className={passwordCriteria.lowerCase ? "text-green-500" : "text-red-500"}>
										At least 1 lowercase letter
									</li>
									<li className={passwordCriteria.number ? "text-green-500" : "text-red-500"}>
										At least 1 number
									</li>
								</ul>
							</div>
						)}
					</div>

					<AuthBtn label="Sign Up" onClick={handleSignup} disabled={!isFormValid} />

					<p className="text-sm text-center mt-4 text-gray-500">
						Already have an account?{" "}
						<Link to="/login" className="text-blue-400 hover:underline">
							Log in
						</Link>
					</p>
				</form>
			</div>
		</AuthLayout>
	);
};

export default Signup;
