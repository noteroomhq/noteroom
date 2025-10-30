import React, { useState } from "react";

interface AuthInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
}

const AuthInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  errorMessage,
  required = false,
  autoFocus = false,
  disabled = false,
}: AuthInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block mb-1 text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          id={label}
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full border ${
            errorMessage ? "border-red-500" : "border-gray-300"
          } rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none ${
            disabled ? "bg-gray-200 cursor-not-allowed" : ""
          }`}
          autoFocus={autoFocus}
          disabled={disabled}
        />
        {type === "password" && (
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
        )}
      </div>
      {errorMessage && (
        <p className="text-sm text-red-500 mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default AuthInput;
