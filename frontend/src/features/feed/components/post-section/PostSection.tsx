import Divider from "@components/Divider"
import PostSectionTools from "./PostSectionTools"

function PostSectionIntro() {
	return (
		<div className="intro
			w-full h-full
			flex flex-row justify-end gap-3
			xl:h-[70%] xl:gap-1
		">
			<div className="profile-pic h-full xl:w-[10%]">
				<div className='flex w-full h-full items-center justify-center'>
					<div className="profile-pic h-10 w-10 overflow-hidden rounded-[50%]">
						<img
							src="https://placehold.co/600x400/yellow/black?text=A"
							className='w-full h-full object-cover'
							alt="user"
						/>
					</div>
				</div>
			</div>

			<div className="intro-text flex items-center justify-start h-full w-full xl:w-[90%]">
				<span className="font-['Space_Grotesk'] text-[16px] xl:text-[15px] min-[2000px]:text-[20px] text-[rgba(0,0,0,0.7)]">What are you working on?</span>
			</div>

			<div className="tools-section flex justify-center items-center xl:hidden ">
				<svg width="30" height="30" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M11.38 7.04688V15.7135M7.04663 11.3802H15.7133M22.2133 11.3802C22.2133 17.3633 17.3631 22.2135 11.38 22.2135C5.39688 22.2135 0.546631 17.3633 0.546631 11.3802C0.546631 5.39712 5.39688 0.546875 11.38 0.546875C17.3631 0.546875 22.2133 5.39712 22.2133 11.3802Z" stroke="#1E1E1E" stroke-opacity="0.55" stroke-width="1.09336" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>
		</div>
	)
}

export default function PostSection({ onClick }: { onClick: React.MouseEventHandler<HTMLDivElement> }) {
	return (
		<div className='flex flex-col w-full items-center'>
			<div className="post-section
				mt-5 rounded-[13px] border border-gray-300
				w-full gap-2 p-2
				flex flex-col
				xl:p-0
				min-[2000px]:gap-3
			" onClick={onClick}>

				<PostSectionIntro />

				<PostSectionTools extendedClass="
					p-2
					w-full h-[30%]
					hidden
					xl:flex justify-between
				"/>
			</div>
			<Divider extendedClass='my-7' />
		</div>
	)
}
