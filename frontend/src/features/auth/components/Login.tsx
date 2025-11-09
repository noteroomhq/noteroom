import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import LoginImage from "../assets/images/login-page-img.png";
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
				body: JSON.stringify({ email: form.email, password: form.password }),
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
			<div className="w-full max-w-md">
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
					<AuthInput
						label="Password"
						name="password"
						type="password"
						value={form.password}
						onChange={handleChange}
						errorMessage={errors.password}
						disabled={loading}
						required
					/>

					{error && (
						<p className="text-red-500 text-sm text-center mt-2">{error}</p>
					)}

					<AuthBtn label={loading ? "Logging in..." : "Login"} onClick={handleLogin} disabled={loading || !isFormValid} />

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
