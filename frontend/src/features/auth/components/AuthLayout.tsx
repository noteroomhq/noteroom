import React from "react";

interface AuthLayoutProps {
	imageSrc: string;
	children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ imageSrc, children }) => {
	return (
		<div className="relative w-full h-screen overflow-hidden">
			{/* Background image */}
			<div className="absolute inset-0 xl:inset-y-0 xl:left-0 xl:w-[50%]">
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
					w-full xl:w-[55%]
					h-full xl:h-full 
					mt-[15vh] xl:mt-0
					rounded-t-[80px] xl:rounded-l-[50px] rounded-tr-none
					shadow-lg
					flex flex-col justify-center items-center
					p-6 sm:p-8 xl:p-12
					ml-0 xl:ml-auto
				"
			>
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
