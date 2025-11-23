export default function PostButton({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> ) {
    return (
        <button className={`
            bg-[#42ACDE]
            w-20 h-[35px] 
            desktop:w-[90px] desktop:h-10 desktop:text-[18px]             
            font-bold text-base text-white
            rounded-full border-none 
            outline-transparent cursor-pointer
        `} {...props}>Post</button>
    )
}
