import React from 'react'
import AuthInput from '../AuthInput'
import AuthButton from '../AuthBtn'

export default function EmailStage({ email: [email, setEmail], error: [apiError, emailError], isLoading, handleEmailSubmit }: { handleEmailSubmit: (e: React.FormEvent) => void, isLoading: boolean, error: [string | null, string | null], email: [string, React.Dispatch<React.SetStateAction<string>>] }) {
    return (
        <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-1 text-center">Forgot Password</h1>
            <p className="text-sm text-[#4B5563] text-center mb-4">
                Enter your email to reset your password
            </p>

            <AuthInput
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                errorMessage={emailError || undefined}
                required
                disabled={isLoading}
            />

            {apiError && <p className="text-red-500 text-sm">{apiError}</p>}

            <AuthButton label={isLoading ? "Sending..." : "Submit"} onClick={() => { }} disabled={isLoading} />
        </form>
    )
}
