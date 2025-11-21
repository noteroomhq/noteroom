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
				w-[80vh] min-[2000px]:w-[65vh]
				flex flex-col gap-1
				font-['Space_Grotesk'] bg-(--leftpanel-maincontainer-clr) border border-gray-300 rounded-[20px]
			">
				<div className="content
					w-full min-h-[300px]
					flex flex-row
				">
					<div className="left-side w-[15%] h-[300px]">
						<div className="author-profile-pic h-[25%] min-[2000px]:h-[27%] flex justify-center items-center">
							<svg className='h-[60px] w-[60px] min-[2000px]:h-[70px] min-[2000px]:w-[70px]' xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill='currentColor'>
								<path d="M234-276q51-39 114-61.5T480-360q69 0 132 22.5T726-276q35-41 54.5-93T800-480q0-133-93.5-226.5T480-800q-133 0-226.5 93.5T160-480q0 59 19.5 111t54.5 93Zm246-164q-59 0-99.5-40.5T340-580q0-59 40.5-99.5T480-720q59 0 99.5 40.5T620-580q0 59-40.5 99.5T480-440Zm0 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q53 0 100-15.5t86-44.5q-39-29-86-44.5T480-280q-53 0-100 15.5T294-220q39 29 86 44.5T480-160Zm0-360q26 0 43-17t17-43q0-26-17-43t-43-17q-26 0-43 17t-17 43q0 26 17 43t43 17Zm0-60Zm0 360Z" />
							</svg>
						</div>
					</div>

					<div className="metadata w-[75%] flex flex-col min-h-[310px]">
						<div className="author-section h-[50px] flex items-center">
							<div className="author-fullname">
								<span className='text-base min-[2000px]:text-[18px]'>Anirban Biswas</span>
							</div>
						</div>

						<div className="post-data min-h-[250px] flex flex-col">
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

					<div className="right-side w-[10%] max-h-[300px]">
						<div className="close-button h-[20%] min-[2000px]:h-[22%] flex justify-center items-center" onClick={() => setOpenPostContainer && setOpenPostContainer(false)}>
							<svg width="25" height="25" className='rounded-[50%] hover:bg-gray-200 cursor-pointer' viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M16.8104 8.10388C16.8705 8.04391 16.9181 7.9727 16.9507 7.89431C16.9832 7.81593 16.9999 7.7319 17 7.64704C17.0001 7.56217 16.9834 7.47813 16.951 7.3997C16.9185 7.32127 16.871 7.25 16.811 7.18996C16.751 7.12991 16.6798 7.08227 16.6014 7.04974C16.5231 7.01722 16.439 7.00045 16.3542 7.0004C16.2693 7.00035 16.1853 7.01701 16.1068 7.04944C16.0284 7.08187 15.9571 7.12942 15.8971 7.1894L11.9999 11.0866L8.10386 7.1894C7.9826 7.06813 7.81813 7 7.64663 7C7.47513 7 7.31066 7.06813 7.18939 7.1894C7.06813 7.31066 7 7.47514 7 7.64664C7 7.81814 7.06813 7.98261 7.18939 8.10388L11.0866 12L7.18939 15.8961C7.12935 15.9562 7.08172 16.0274 7.04922 16.1059C7.01673 16.1844 7 16.2684 7 16.3534C7 16.4383 7.01673 16.5224 7.04922 16.6008C7.08172 16.6793 7.12935 16.7506 7.18939 16.8106C7.31066 16.9319 7.47513 17 7.64663 17C7.73155 17 7.81563 16.9833 7.89408 16.9508C7.97254 16.9183 8.04382 16.8706 8.10386 16.8106L11.9999 12.9134L15.8971 16.8106C16.0184 16.9317 16.1828 16.9997 16.3542 16.9996C16.5256 16.9995 16.6899 16.9313 16.811 16.81C16.9321 16.6888 17.0001 16.5244 17 16.353C16.9999 16.1816 16.9317 16.0172 16.8104 15.8961L12.9133 12L16.8104 8.10388Z" fill="black" fill-opacity="0.4"/>
							</svg>
						</div>
					</div>
				</div>

				<PostSectionTools extendedClass='p-5 w-full flex justify-between h-[60px]' inAction={true} actions={[() => addMedia(), () => openCloseTool("poll", undefined, true)] } />
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