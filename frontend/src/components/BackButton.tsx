export default function BackButton({ onClick, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button className="back-button flex flex-row justify-center items-center" onClick={onClick} {...props}>
            <svg className="h-10 w-10" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_10103_7629)">
                    <rect x="2" y="2" width="28" height="28" rx="4" fill="white"/>
                    <path d="M19.5 23L12.5 16L19.5 9" stroke="#5F5E5B" stroke-width="2.33333" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                    <filter id="filter0_d_10103_7629" x="0" y="0" width="32" height="32" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                        <feOffset/>
                        <feGaussianBlur stdDeviation="1"/>
                        <feComposite in2="hardAlpha" operator="out"/>
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10103_7629"/>
                        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10103_7629" result="shape"/>
                    </filter>
                </defs>
            </svg>
        </button>
    )
}
