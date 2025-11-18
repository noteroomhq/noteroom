import React from 'react'
import OTPInput from '../OTPInput'
import AuthButton from '../AuthBtn'
import type { StateController } from '@stypes/global'

export default function OTPStage({ otpValue: [otpValue, setOtpValue], error: [apiError, otpError], isLoading, handleOTPSubmit }: { handleOTPSubmit: (e: React.FormEvent) => void, otpValue: StateController<string[]>, isLoading: boolean, error: [string | null, string | null ]}) {
    return (
        <form
            onSubmit={handleOTPSubmit}
            className={`flex flex-col gap-4 transition-all duration-400 ease-out`}
        >
            <h1 className="text-3xl font-bold mb-1 text-center">OTP Verification</h1>
            <p className="text-sm text-gray-500 text-center mb-4">
                Check your email to see the verification code
            </p>

            <div className="flex justify-center mb-2">
                <OTPInput
                    length={6}
                    otpValue={[otpValue, setOtpValue]}
                    inputClassName="border-[#D3E0FE] text-[#2E3139] focus:border-[#42ACDE] focus:ring-[#42ACDE]"
                    containerClassName="justify-center"
                />
            </div>

            {otpError && <p className="text-red-500 text-sm text-center">{otpError}</p>}
            {apiError && <p className="text-red-500 text-sm text-center">{apiError}</p>}

            <AuthButton label={isLoading ? "Verifying..." : "Verify"} onClick={() => { }} disabled={isLoading || otpValue.join("").length !== 6} />
        </form>
    )
}
