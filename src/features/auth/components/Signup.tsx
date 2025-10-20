import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";
import SignupImage from "../assets/images/signup-page-img.png"

const Signup = () => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		password: "",
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSignup = (e: React.FormEvent) => {
		e.preventDefault();
		// TODO: connect to backend later
		console.log("Signup form:", form);
	};

	return (
		<AuthLayout imageSrc={SignupImage}>
			<div className="w-full max-w-md">
				<h1 className="text-3xl font-bold mb-6 text-center">Welcome to NoteRoom</h1>

				<form className="flex flex-col gap-4" onSubmit={handleSignup}>
					<AuthInput label="Full Name" value={form.name} onChange={handleChange} />
					<AuthInput label="Email" type="email" value={form.email} onChange={handleChange} />
					<AuthInput label="Password" type="password" value={form.password} onChange={handleChange} />

					<AuthBtn label="Sign Up" />

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
