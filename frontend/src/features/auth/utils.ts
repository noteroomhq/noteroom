import z from "zod"

type TPasswordCriteria = { minLength: boolean, upperCase: boolean, lowerCase: boolean, number: boolean }

export function checkPasswordCriteria(password: string): TPasswordCriteria {
    return {
        minLength: password.length >= 6,
        upperCase: /[A-Z]/.test(password),
        lowerCase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
    }
}
export function isPasswordValid(password: string): boolean {
    return Object.values(checkPasswordCriteria(password)).every(v => v)
}

const PasswordSchema = z.string().min(6, "Your password must meet below requirements")
		.refine(val => isPasswordValid(val),
		{ error: "Password must contain uppercases, lowercases and numbers" })
export { PasswordSchema }