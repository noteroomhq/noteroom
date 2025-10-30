import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import AuthInput from "./AuthInput";
import AuthBtn from "./AuthBtn";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    minLength: false,
    upperCase: false,
    lowerCase: false,
    number: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Track password visibility

  useEffect(() => {
    validateForm();
  }, [form]);

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

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const validateForm = () => {
    const newErrors: any = {};
    let valid = true;

    // Validate Name (more than 1 character)
    if (form.name.length <= 1 && form.name.length > 0) {
      newErrors.name = "Full Name must be more than one character";
      valid = false;
    } else {
      newErrors.name = "";
    }

    // Validate Email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (form.email && !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Validate Password Criteria
    const passwordCriteriaState = {
      minLength: form.password.length >= 6,
      upperCase: /[A-Z]/.test(form.password),
      lowerCase: /[a-z]/.test(form.password),
      number: /[0-9]/.test(form.password),
    };

    setPasswordCriteria(passwordCriteriaState);

    if (form.password && !passwordCriteriaState.minLength) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else if (
      form.password &&
      (!passwordCriteriaState.upperCase ||
        !passwordCriteriaState.lowerCase ||
        !passwordCriteriaState.number)
    ) {
      newErrors.password =
        "Password must include uppercase, lowercase letters, and numbers";
      valid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    setIsFormValid(valid);
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();

    if (isFormValid) {
      // todo: connect to backend later
      console.log("Signup form:", form);
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <AuthLayout imageSrc="/auth-imgs/signup-page-img.png">
      <div className="w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to NoteRoom</h1>

        <form className="flex flex-col gap-4" onSubmit={handleSignup}>
          <AuthInput
            label="Full Name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            errorMessage={errors.name}
            required
          />
          <AuthInput
            label="Email"
            type="email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            errorMessage={errors.email}
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
                className={`w-full border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none`}
              />
              <button
                type="button"
                onClick={handlePasswordToggle}
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

          <AuthBtn label="Sign Up" disabled={!isFormValid} />

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
