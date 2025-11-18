import React, { useEffect, useState } from 'react'
import AuthInput from './AuthInput'
import { checkPasswordCriteria, PasswordSchema } from '../utils';
import { treeifyError } from 'zod';

type TPasswordCriteria = { minLength: boolean, upperCase: boolean, lowerCase: boolean, number: boolean }

export default function StrictPasswordInput({ password: [password, onPasswordChange] }: { password: [string, (e: React.ChangeEvent<HTMLInputElement>) => void ] }) {
    const [isPasswordFocused, setIsPasswordFocused] = useState<boolean>(false)
    const [fieldError, setFieldError] = useState<string | null>(null)
    const [passwordCriteria, setPasswordCriteria] = useState<TPasswordCriteria>({
		minLength: false,
		upperCase: false,
		lowerCase: false,
		number: false,
	});

    function handleFocus() {
        setIsPasswordFocused(true)
    }

    useEffect(() => {
		setPasswordCriteria(checkPasswordCriteria(password))
        
        if (isPasswordFocused) {
            const parsedPassword = PasswordSchema.safeParse(password)
            if (!parsedPassword.success) {
                const { errors } = treeifyError(parsedPassword.error)
                setFieldError(errors[0])
            } else {
                setFieldError(null)
            }
        }
	}, [password, isPasswordFocused])

    return (
        <div className="mb-4">
            <div className="relative">
                <AuthInput 
                    label='Password'
                    type='password'
                    value={password}
                    onChange={onPasswordChange}
                    onFocus={handleFocus}
                    required
                    errorMessage={fieldError || undefined}
                    placeholder='Enter your password'
                />
            </div>

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
    )
}
