import Divider from "@components/Divider"
import PostSectionTools from "./PostSectionTools"

function PostSectionIntro() {
	return (
		<div className="intro 
			w-full h-full 
			flex flex-row justify-end gap-1
			md:h-[70%]
		">
			<div className="profile-pic h-full w-[15%] md:w-[10%]">
				<div className='flex w-full h-full items-center justify-center'>
					<svg className='h-[54px] w-[54px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill='currentColor'>
						<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
					</svg>
				</div>
			</div>

			<div className="intro-text flex items-center justify-start h-full w-[70%] md:w-[90%]">
				<span className="font-['Space_Grotesk'] text-[16px] md:text-[15px] min-[2000px]:text-[20px] text-[rgba(0,0,0,0.7)]">What are you working on?</span>
			</div>

			<div className="tools-section flex justify-center items-center w-[12%] md:hidden ">
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
				w-[95%] gap-2 p-2
				flex flex-col 
				md:w-full md:p-0
				min-[2000px]:gap-3
			" onClick={onClick}>

				<PostSectionIntro />

				<PostSectionTools extendedClass="
					p-2
					w-full h-[30%]
					hidden 
					md:flex justify-between
				"/>
			</div>
			<Divider extendedClass='my-7' />
		</div>
	)
}
