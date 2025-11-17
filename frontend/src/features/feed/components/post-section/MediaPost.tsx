import { Direction, type TMediaPost } from "../../types"
import { usePostSectionContext } from "../contexts/PostSectionContext"

function MediaPostImage({ image, isActive, children }: { image: TMediaPost, isActive: boolean, children: React.ReactNode[] }) {
	return (
		<div className={`img 
			w-full min-h-[260px] min-[2000px]:min-h-[300px] 
			relative 
			overflow-hidden ${!isActive && 'hidden'}
		`} key={image.id}>
			{ children }
			<img
				src={image.url}
				className="absolute inset-0 w-full h-full rounded-md object-cover z-10"
			/>
		</div>
	)
}

export default function MediaPost({ extendedClass, addMedia }: { extendedClass: string, addMedia: () => void }) {
	const PostContainerData = usePostSectionContext()!
	const [[media], activeIndex] = PostContainerData.media
	const {moveMedia: move, removeMedia} = PostContainerData.mediaActions

	return (
		<div className={`post-image 
			w-full ${extendedClass}
			flex flex-col 
		`}>
			<div className="image-container 
				w-full min-h-[260px] min-[2000px]:min-h-[300px]
			">
				{ media.map((m, index) => {
					return (
						<MediaPostImage image={m} isActive={index === activeIndex}>
							<div className="cross-button absolute right-1 top-1 z-20" onClick={() => removeMedia(m.id, index === media.length - 1)}>
								<svg width="26" height="26" viewBox="0 0 24 24" className='fill-[#D9D9D9] hover:fill-gray-400 cursor-pointer' xmlns="http://www.w3.org/2000/svg">
									<rect width="24" height="24" rx="12" />
									<path clip-rule="evenodd" d="M16.8104 8.10388C16.8705 8.04391 16.9181 7.9727 16.9507 7.89431C16.9832 7.81593 16.9999 7.7319 17 7.64704C17.0001 7.56217 16.9834 7.47813 16.951 7.3997C16.9185 7.32127 16.871 7.25 16.811 7.18996C16.751 7.12991 16.6798 7.08227 16.6014 7.04974C16.5231 7.01722 16.439 7.00045 16.3542 7.0004C16.2693 7.00035 16.1853 7.01701 16.1068 7.04944C16.0284 7.08187 15.9571 7.12942 15.8971 7.1894L11.9999 11.0866L8.10386 7.1894C7.9826 7.06813 7.81813 7 7.64663 7C7.47513 7 7.31066 7.06813 7.18939 7.1894C7.06813 7.31066 7 7.47514 7 7.64664C7 7.81814 7.06813 7.98261 7.18939 8.10388L11.0866 12L7.18939 15.8961C7.12935 15.9562 7.08172 16.0274 7.04922 16.1059C7.01673 16.1844 7 16.2684 7 16.3534C7 16.4383 7.01673 16.5224 7.04922 16.6008C7.08172 16.6793 7.12935 16.7506 7.18939 16.8106C7.31066 16.9319 7.47513 17 7.64663 17C7.73155 17 7.81563 16.9833 7.89408 16.9508C7.97254 16.9183 8.04382 16.8706 8.10386 16.8106L11.9999 12.9134L15.8971 16.8106C16.0184 16.9317 16.1828 16.9997 16.3542 16.9996C16.5256 16.9995 16.6899 16.9313 16.811 16.81C16.9321 16.6888 17.0001 16.5244 17 16.353C16.9999 16.1816 16.9317 16.0172 16.8104 15.8961L12.9133 12L16.8104 8.10388Z" fill="black" fill-opacity="0.4" />
								</svg>
							</div>

							<div className="media-count absolute bottom-1 left-1/2 -translate-x-1/2 flex justify-center items-center h-[25px] p-2 bg-white rounded-full z-20">
								<span className="text-[13px] pr-3 pl-3">{ activeIndex + 1 } / { media.length }</span>
							</div>

							<div className="add-media absolute flex justify-center gap-2 items-center right-1 bottom-1 bg-white hover:bg-gray-300 p-2 h-[30px] rounded-md cursor-pointer z-20" onClick={addMedia}>
								<span className="text-[13px]">Add</span>
								<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M15.6554 1.58496H3.36938C2.38651 1.58496 1.58594 2.38553 1.58594 3.36841V15.6544C1.58594 16.6373 2.38651 17.4378 3.36938 17.4378H15.6554C16.6382 17.4378 17.4388 16.6373 17.4388 15.6544V3.36841C17.4388 2.38553 16.6382 1.58496 15.6554 1.58496ZM3.36938 2.77393H15.6554C15.9827 2.77393 16.2498 3.04105 16.2498 3.36841V11.038L13.1918 7.98001C13.0808 7.86904 12.9302 7.80562 12.7717 7.80562H12.7693C12.6108 7.80562 12.4578 7.86904 12.3477 7.98318L8.92581 11.4581L7.48875 10.0266C7.37778 9.91564 7.22718 9.85223 7.06865 9.85223C6.91567 9.82845 6.75556 9.91564 6.64459 10.0322L2.7749 13.9835V3.36841C2.7749 3.04105 3.04202 2.77393 3.36938 2.77393ZM2.77966 15.6782L7.0742 11.2917L12.0536 16.2489H3.36938C3.05074 16.2489 2.79313 15.9936 2.77966 15.6782ZM15.6554 16.2489H13.7372L9.76839 12.2959L12.7741 9.24427L16.2498 12.7192V15.6544C16.2498 15.9817 15.9827 16.2489 15.6554 16.2489Z" fill="#4B5563"/>
									<path d="M7.03085 7.80779C7.70588 7.80779 8.25311 7.26057 8.25311 6.58554C8.25311 5.9105 7.70588 5.36328 7.03085 5.36328C6.35582 5.36328 5.80859 5.9105 5.80859 6.58554C5.80859 7.26057 6.35582 7.80779 7.03085 7.80779Z" fill="#4B5563"/>
								</svg>
							</div>
						</MediaPostImage>
					)}
				)}
			</div>
			
			<div className="navigator 
				w-full min-h-[60px]
				flex justify-center
			">
				<div className="controller w-[40%] flex justify-between">
					<div className="left-controller flex justify-center items-center" onClick={() => move(Direction.Previous)}>
						<svg className='w-10 h-10 fill-none hover:fill-[rgba(0,0,0,0.2)]' viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.200397" y="0.200397" width="25.25" height="25.25" rx="12.625" stroke="#BCBCBC" stroke-width="0.400794"/>
							<path d="M11.3104 13.1139C11.254 13.0576 11.2223 12.9812 11.2222 12.9015V12.7492C11.2232 12.6696 11.2547 12.5935 11.3104 12.5367L13.3705 10.4807C13.4081 10.4427 13.4593 10.4214 13.5128 10.4214C13.5662 10.4214 13.6174 10.4427 13.655 10.4807L13.9396 10.7652C13.9773 10.8022 13.9986 10.8527 13.9986 10.9055C13.9986 10.9583 13.9773 11.0088 13.9396 11.0458L12.1561 12.8253L13.9396 14.6048C13.9775 14.6425 13.9989 14.6937 13.9989 14.7471C13.9989 14.8005 13.9775 14.8518 13.9396 14.8894L13.655 15.1699C13.6174 15.2079 13.5662 15.2292 13.5128 15.2292C13.4593 15.2292 13.4081 15.2079 13.3705 15.1699L11.3104 13.1139Z" fill="#42ACDE"/>
						</svg>
					</div>
					<div className="number w-full flex justify-center items-center">
						<span className='count w-10 h-10 rounded-[50%] flex justify-center items-center bg-[#42ACDE]'>{ activeIndex + 1 }</span>
					</div>
					<div className="right-controller flex justify-center items-center" onClick={() => move(Direction.Next)}>
						<svg className='w-10 h-10 fill-none hover:fill-[rgba(0,0,0,0.2)]' viewBox="0 0 26 26" xmlns="http://www.w3.org/2000/svg">
							<rect x="0.200397" y="0.200397" width="25.25" height="25.25" rx="12.625" stroke="#BCBCBC" stroke-width="0.400794"/>
							<path d="M14.3404 13.1139C14.3968 13.0576 14.4285 12.9812 14.4286 12.9015V12.7492C14.4277 12.6696 14.3961 12.5935 14.3404 12.5367L12.2803 10.4807C12.2427 10.4427 12.1915 10.4214 12.1381 10.4214C12.0846 10.4214 12.0334 10.4427 11.9958 10.4807L11.7112 10.7652C11.6735 10.8022 11.6523 10.8527 11.6523 10.9055C11.6523 10.9583 11.6735 11.0088 11.7112 11.0458L13.4947 12.8253L11.7112 14.6048C11.6733 14.6425 11.6519 14.6937 11.6519 14.7471C11.6519 14.8005 11.6733 14.8518 11.7112 14.8894L11.9958 15.1699C12.0334 15.2079 12.0846 15.2292 12.1381 15.2292C12.1915 15.2292 12.2427 15.2079 12.2803 15.1699L14.3404 13.1139Z" fill="#42ACDE"/>
						</svg>
					</div>
				</div>
			</div>
		</div>
	)
}
