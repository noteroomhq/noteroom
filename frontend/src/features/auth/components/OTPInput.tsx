import React, { useRef, useState } from "react";

interface OTPInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	otpValue: [string[], React.Dispatch<React.SetStateAction<string[]>>],
	length: number,
	containerClassName: string
	inputClassName: string

}
const OTPInput = ({ length = 6, inputClassName, containerClassName, otpValue: [otpValue, setOtpValue] }: OTPInputProps) => {
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	function setInputRef(index: number, element: HTMLInputElement) {
		inputRefs.current[index] = element
	}

	function handleOTPValueChange(index: number, value: string) {
		setOtpValue(prev => prev.map((v, i) => i === index ? value : v))
		inputRefs.current[index < length ? index + 1 : index]?.focus()
	}

	function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
		const pastedData = e.clipboardData.getData('text')
		const arrayedData = Array.from(pastedData)
		if (arrayedData.length === length) {
			setOtpValue(arrayedData)
		}
	}

	
	return (
		<div className={`flex gap-2 ${containerClassName}`}>
			{otpValue.map((_, i) => (
				<input
					key={i}
					ref={el => setInputRef(i, el!)}
					maxLength={1}
					value={otpValue[i]}
					onChange={(e) => handleOTPValueChange(i, e.target.value)}
					onPaste={handlePaste}
					className={`w-12 h-12 text-center rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-lg ${inputClassName}`}
					aria-label={`OTP digit ${i + 1}`}
				/>
			))}
		</div>
	);
};

export default OTPInput;
