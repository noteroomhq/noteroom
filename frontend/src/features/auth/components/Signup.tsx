import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import SignupImage from "../assets/images/signup-page-img.png";
import NoteRoomLogo from "../assets/images/NoteRoom Logo Files/Logotype/PNG/Rectangle Horizontal/NoteRoom_logo-fullcolor-rgb-2-1000_1000px.png";
import { treeifyError, z } from "zod"
import StrictPasswordInput from "./StrictPasswordInput";
import { PasswordSchema } from "../utils";

type TErrors = { name?: string, email?: string, password?: string }

const SignupFormSchema = z.object({
	name: z.string().min(4, "Full Name must be more than four characters"),
	email: z.email("Please enter a valid email address"),
	password: PasswordSchema
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
	
	const [isFormValid, setIsFormValid] = useState(false);
	const [loading, setLoading] = useState<boolean>(false)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		validateForm(); // Validate on blur to show errors
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


	return (
		<AuthLayout imageSrc={SignupImage}>
			<div className="w-full max-w-md relative">
				<img 
					src={NoteRoomLogo}
					alt="NoteRoom Logo"
					onClick={ ()=>{window.location.href="https://noteroom.co"} } 
					className="h-16 w-auto mx-auto xl:h-20 mb-4 absolute -top-25 -right-4 xl:-right-10 xl:-top-30 2xl:-top-50 xl:-right-25 2xl:-right-40 cursor-pointer" 	
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
						errorMessage={errors.email}
						placeholder="Enter your email"
						required
					/>

					<StrictPasswordInput
						password={[form.password, function(e: React.ChangeEvent<HTMLInputElement>) { setForm(prev => ({...prev, password: e.target.value})) }]}
					/>

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
