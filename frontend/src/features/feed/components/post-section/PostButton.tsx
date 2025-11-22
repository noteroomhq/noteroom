export default function PostButton({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> ) {
    return (
        <button className={`
            bg-[#42ACDE]
            w-20 h-[35px] 
            min-[2000px]:w-[90px] min-[2000px]:h-10 min-[2000px]:text-[18px]             
            font-bold text-base text-white
            rounded-full border-none 
            outline-transparent cursor-pointer
        `} {...props}>Post</button>
    )
}
