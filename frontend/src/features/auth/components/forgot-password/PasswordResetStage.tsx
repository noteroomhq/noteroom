import React, { useEffect, useState } from 'react'
import StrictPasswordInput from '../StrictPasswordInput'
import AuthButton from '../AuthBtn'
import AuthInput from '../AuthInput'
import { isPasswordValid } from '../../utils'
import type { StateController } from '@stypes/global'

export default function PasswordResetStage({ isLoading, handleResetSubmit, passwords: [[password, setPassword], [confirmPassword, setConfirmPassword]], errors: [apiError, [resetPasswordError, setResetPasswordError]] }: { isLoading: boolean,  errors: [string | null, StateController<string | null>], passwords: [StateController<string>, StateController<string>], handleResetSubmit: (e: React.FormEvent<HTMLFormElement>) => void }) {
    const [validPasswords, setValidPasswords] = useState<boolean>(false)
    
    useEffect(() => {
        setResetPasswordError(password !== confirmPassword ? "Password doesn't match" : null)
        setValidPasswords(password === confirmPassword)
    }, [password, confirmPassword, setResetPasswordError])

    return (
        <form onSubmit={handleResetSubmit} className="flex flex-col gap-4">
            <h1 className="text-3xl font-bold mb-1 text-center">Set a new password</h1>
            <p className="text-sm text-[#4B5563] text-center mb-4">
                Enter your new password to complete the reset process
            </p>

            <StrictPasswordInput
                password={[password, function(e: React.ChangeEvent<HTMLInputElement>) { setPassword(e.target.value) } ]}
            />

            <AuthInput 
                label="Confirm Password"
                name="password"
                type='password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
                errorMessage={resetPasswordError || undefined}
                required
            />

            {apiError && <p className="text-sm text-red-500 mt-1">{apiError}</p>}

            <AuthButton
                label={isLoading ? "Confirming..." : "Confirm"}
                disabled={isLoading || !isPasswordValid(password) || !validPasswords}
            />
        </form>
    )
}
