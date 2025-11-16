import React from "react";

interface AuthLayoutProps {
	imageSrc: string;
	children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ imageSrc, children }) => {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			{/* Background image */}
			<div className="absolute inset-0 md:inset-y-0 md:left-0 md:w-[50%]">
				<img
					src={imageSrc}
					alt="Auth background"
					className="w-full h-full object-cover"
				/>
			</div>

			{/* Content block */}
			<div
				className="
					relative z-10
					bg-white
					w-full md:w-[55%]
					h-full md:h-full 
					mt-[15vh] md:mt-0
					rounded-t-[80px] md:rounded-l-[50px] rounded-tr-none
					shadow-lg
					flex flex-col justify-center items-center
					p-6 sm:p-8 md:p-12
					ml-0 md:ml-auto
				"
			>
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
