import React from 'react'

export default function HamburgerMenuButton({ onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="hamburger-menu flex flex-row justify-center items-center" onClick={onClick} {...props}>
            <svg className="h-6 w-6" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 7H19M1 1H19M1 13H19" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    )
}
