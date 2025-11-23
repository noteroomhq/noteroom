import { useRef } from "react"
import MediaPost from "./MediaPost"
import PollPost from "./PollPost"
import PostSectionTools from "./PostSectionTools"
import type { StateController } from "@stypes/global"
import type { TMediaPost } from "../../types"
import PostSectionProvider, { usePostSectionContext } from "../contexts/PostSectionContext"

function PostContainer({ setOpen: setOpenPostContainer }: { setOpen?: StateController<boolean>[1] }) {
	const PostContainerData = usePostSectionContext()!

	const [showTools, openCloseTool] = PostContainerData.tools
	const [[, setMedia]] = PostContainerData.media

	function handleFileChange(e: React.ChangeEvent<any>) {
		const selectedImages = Array.from(e.target.files)
		const imageUrls: TMediaPost[] = selectedImages.map(image => {
			return {
				url: URL.createObjectURL(image as Blob),
				id: Math.ceil(Math.random() * 1000000)
			}
		})
		setMedia(images => {
			return [...images, ...imageUrls]
		})
		openCloseTool('media', 'open', undefined)
	}
	

	const mediaRef = useRef<HTMLInputElement | null>(null)
	function addMedia() {
		mediaRef.current?.click()
	}

	return (
		<>
			<input type="file" accept='image/*' multiple ref={mediaRef} className='hidden' onChange={handleFileChange} />

			<div className="post-container
				font-['Space_Grotesk'] 
				w-full 
				mt-5 mb-5
				flex flex-col gap-1
				xl:w-[80vh] xl:mt-0 xl:border xl:border-gray-300 xl:rounded-[20px] xl:bg-(--leftpanel-maincontainer-clr)
				min-[2000px]:w-[65vh]!
			">
				<div className="content
					w-full min-h-[300px]
					flex flex-row
				">
					<div className="hidden xl:block left-side w-auto p-[0_10px_0_10px] h-[300px]">
						<div className="author-profile-pic h-[25%] min-[2000px]:h-[27%] flex justify-center items-center">
							<div className="justify-self-start w-12 h-12 overflow-hidden rounded-[50%]">
								<img 
									src="https://placehold.co/600x400/yellow/black?text=A" 
									className='w-full h-full object-cover'
									alt="user"
								/>
							</div>
						</div>
					</div>

					<div className="metadata w-full flex flex-col min-h-[310px]">
						<div className="author-section h-[50px] flex items-center gap-2 xl:gap-0">
							<div className="author-profile-pic block xl:hidden justify-self-start w-10 h-10 overflow-hidden rounded-[50%]">
								<img 
									src="https://placehold.co/600x400/yellow/black?text=A" 
									className='w-full h-full object-cover'
									alt="user"
								/>
							</div>

							<div className="author-fullname">
								<span className='text-base min-[2000px]:text-[18px]'>Anirban Biswas</span>
							</div>
						</div>

						<div className="post-data min-h-[250px] w-[95%] flex flex-col self-center xl:w-full">
							<div className="post-title-input w-full h-[50px]">
								<input type="text" className='w-full h-full outline-none bg-transparent text-[rgba(0,0,0,0.7)] text-[18px] min-[2000px]:text-[20px]' placeholder='Title *' />
							</div>

							<div className="post-desc-input scrollbar
								min-h-[50px] w-full
								flex
								overflow-y-auto
							">
								<textarea
									className="w-full flex flex-col resize-none outline-none bg-transparent min-[2000px]:text-[18px]"
									placeholder='What are you working on?'
									onChange={({ target }: { target: HTMLTextAreaElement }) => {
										target.style.height = "auto";
										const maxHeight = 200;
										const newHeight = Math.min(target.scrollHeight, maxHeight);

										target.style.height = newHeight + "px";
									}}
								/>
							</div>
							
							<div className="interactive-content mt-2.5 flex justify-center items-center">
								{ showTools.media && <MediaPost extendedClass='min-h-[300px] min-[2000px]:min-h-[360px]' addMedia={() => addMedia()} />}
								{ showTools.poll && <PollPost extendedClass='min-h-[150px]' />}
							</div>
						</div>
					</div>

					<div className="hidden xl:block right-side p-[0_10px_0_10px] max-h-[300px]">
						<div className="close-button h-[20%] min-[2000px]:h-[22%] flex justify-center items-center" onClick={() => setOpenPostContainer && setOpenPostContainer(false)}>
							<svg width="25" height="25" className='rounded-[50%] hover:bg-gray-200 cursor-pointer' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M16.8104 8.10388C16.8705 8.04391 16.9181 7.9727 16.9507 7.89431C16.9832 7.81593 16.9999 7.7319 17 7.64704C17.0001 7.56217 16.9834 7.47813 16.951 7.3997C16.9185 7.32127 16.871 7.25 16.811 7.18996C16.751 7.12991 16.6798 7.08227 16.6014 7.04974C16.5231 7.01722 16.439 7.00045 16.3542 7.0004C16.2693 7.00035 16.1853 7.01701 16.1068 7.04944C16.0284 7.08187 15.9571 7.12942 15.8971 7.1894L11.9999 11.0866L8.10386 7.1894C7.9826 7.06813 7.81813 7 7.64663 7C7.47513 7 7.31066 7.06813 7.18939 7.1894C7.06813 7.31066 7 7.47514 7 7.64664C7 7.81814 7.06813 7.98261 7.18939 8.10388L11.0866 12L7.18939 15.8961C7.12935 15.9562 7.08172 16.0274 7.04922 16.1059C7.01673 16.1844 7 16.2684 7 16.3534C7 16.4383 7.01673 16.5224 7.04922 16.6008C7.08172 16.6793 7.12935 16.7506 7.18939 16.8106C7.31066 16.9319 7.47513 17 7.64663 17C7.73155 17 7.81563 16.9833 7.89408 16.9508C7.97254 16.9183 8.04382 16.8706 8.10386 16.8106L11.9999 12.9134L15.8971 16.8106C16.0184 16.9317 16.1828 16.9997 16.3542 16.9996C16.5256 16.9995 16.6899 16.9313 16.811 16.81C16.9321 16.6888 17.0001 16.5244 17 16.353C16.9999 16.1816 16.9317 16.0172 16.8104 15.8961L12.9133 12L16.8104 8.10388Z" fill="black" fill-opacity="0.4"/>
							</svg>
						</div>
					</div>
				</div>

				<PostSectionTools extendedClass='xl:p-5 w-full flex justify-between h-[60px]' inAction={true} actions={[() => addMedia(), () => openCloseTool("poll", undefined, true)] } />
			</div>
		</>
	)
}


export default function PostContainerUI({ setOpen }: { setOpen?: StateController<boolean>[1] }) {
	return (
		<PostSectionProvider>
			<PostContainer setOpen={setOpen} />
		</PostSectionProvider>
	)
}