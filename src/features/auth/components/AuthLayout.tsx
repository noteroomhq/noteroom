import React from "react";

interface AuthLayoutProps {
  imageSrc: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ imageSrc, children }) => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Left image block */}
      <div className="absolute top-0 left-0 w-[50%] md:w-[50%] h-full">
        <img
          src={imageSrc}
          alt="Auth"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Right content block */}
      <div className="
        relative z-10
        w-full md:w-[55%]
        h-screen md:h-full
        bg-white
        rounded-t-[30px] md:rounded-l-[50px]
        shadow-lg
        flex flex-col justify-center items-center
        p-8 md:p-12
        mt-[25vh] md:mt-0
        ml-0 md:ml-auto
      ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
