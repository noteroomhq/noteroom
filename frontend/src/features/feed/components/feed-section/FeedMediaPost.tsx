import PostInteraction from "@components/PostInteraction";
import { useNavigate } from "react-router-dom";

export default function FeedMediaPost({ withMedia = true, isLast }: { withMedia: boolean, isLast: boolean }) {
	const navigate = useNavigate()

	return (
		<div className={`media-post
			${isLast && 'mb-10'}
			w-full
			flex
			cursor-pointer
		`} onClick={() => navigate("/post")}>
			<div className="left-side hidden md:block w-auto mr-[5px]">
				<div className={`author-profile-pic justify-self-start w-10 h-10 overflow-hidden rounded-[50%]`}>
                    <img 
                        src="https://placehold.co/600x400/yellow/black?text=A" 
                        className='w-full h-full object-cover'
                        alt="user"
                    />
                </div>
			</div>

			<div className="right-side flex flex-col">
				<div className={`metadata
					flex flex-col items-center
				`}>
					<div className="post-topbar w-full flex justify-between">
						<div className="author-info flex items-center text-[14px] gap-2">
							<div className={`author-profile-pic block md:hidden justify-self-start w-10 h-10 overflow-hidden rounded-[50%]`}>
								<img 
									src="https://placehold.co/600x400/yellow/black?text=A" 
									className='w-full h-full object-cover'
									alt="user"
								/>
							</div>
							<div className="author-details">
								<span>Anirban Biswas</span> • <span>8d</span>
							</div>
						</div>

						<div className="tools flex items-center gap-3 text-[14px]">
							<div className="add-friend">
								<button className='text-blue-700 hover:underline cursor-pointer font-bold'>Add Friend</button>
							</div>
							<div className="three-dots">
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
									<path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#464646" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
									<path d="M18 13C18.5523 13 19 12.5523 19 12C19 11.4477 18.5523 11 18 11C17.4477 11 17 11.4477 17 12C17 12.5523 17.4477 13 18 13Z" stroke="#464646" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
									<path d="M6 13C6.55228 13 7 12.5523 7 12C7 11.4477 6.55228 11 6 11C5.44772 11 5 11.4477 5 12C5 12.5523 5.44772 13 6 13Z" stroke="#464646" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" />
								</svg>
							</div>
						</div>
					</div>

					<div className="post-info mt-2">
						<div className="post-title font-bold text-[15px]">
							<span>Classical and Operant Conditioning of Memory Forming</span>
						</div>
						<div className={`post-description text-[13px]`}>
							<span>Scientists have discovered a fundamental conflict in how the brain learns and forms memories, challenging long-held assumptions about classical and operant conditioning. These two learning systems cannot operate simultaneously, as they compete for dominance in the brain...<span className='text-blue-600 hover:underline cursor-pointer'>Read More</span></span>
						</div>
					</div>
				</div>

				{withMedia && <div className="post-media
					mt-2 
					overflow-hidden rounded-[15px]
				">
					<img src="https://placehold.co/600x400/orange/white?text=Post Image" alt="Post Image" className='w-full h-full object-cover' />
				</div>}

				<div className="post-interaction
					w-[90%] mt-2
					flex gap-5 
					text-[12px]
				">
					<PostInteraction name='reacts' value='6.8k'>
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M16.6409 3.47437C19.0626 3.47458 21.2941 5.7833 21.2942 8.47925C21.2942 11.4095 19.5363 14.7462 17.387 17.2888C16.3221 18.5485 15.1974 19.5686 14.2141 20.2146C13.7215 20.5382 13.2868 20.7536 12.9299 20.865C12.5631 20.9794 12.352 20.9618 12.2532 20.9275L12.134 20.8865H11.9768C11.7954 20.8788 11.5087 20.8109 11.1155 20.6355C10.718 20.4582 10.2556 20.1923 9.7522 19.8425C8.74571 19.1433 7.61637 18.1402 6.55884 16.9373C4.42233 14.5069 2.69653 11.4007 2.69653 8.47827C2.69658 5.78327 4.92994 3.47437 7.34985 3.47437C9.26771 3.47451 10.6123 4.80078 11.384 5.88843L11.9954 6.75073L12.6077 5.88843C13.3775 4.80266 14.7221 3.47437 16.6409 3.47437Z" stroke="#575757" stroke-width="1.5" />
						</svg>
					</PostInteraction>
					<PostInteraction name='comments' value='600'>
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M14.0459 2.24193L9.89795 2.23193H9.89595C5.52195 2.23193 2.09595 5.65893 2.09595 10.0339C2.09595 14.1319 5.28195 17.2399 9.56095 17.4039V21.2319C9.56095 21.3399 9.60495 21.5179 9.68095 21.6349C9.82295 21.8599 10.0649 21.9819 10.3129 21.9819C10.4509 21.9819 10.5899 21.9439 10.7149 21.8639C10.9789 21.6959 17.1879 17.7239 18.8029 16.3579C20.7049 14.7479 21.8429 12.3879 21.8459 10.0459V10.0289C21.8399 5.66193 18.4159 2.24193 14.0459 2.24093V2.24193ZM17.8329 15.2139C16.6989 16.1739 12.9709 18.6189 11.0609 19.8569V16.6699C11.0609 16.2559 10.7259 15.9199 10.3109 15.9199H9.91495C6.25495 15.9199 3.59695 13.4439 3.59695 10.0339C3.59695 6.49993 6.36495 3.73193 9.89695 3.73193L14.0439 3.74193H14.0459C17.5779 3.74193 20.3459 6.50793 20.3479 10.0379C20.3449 11.9479 19.4049 13.8819 17.8329 15.2139Z" fill="#575757" />
						</svg>
					</PostInteraction>
					<PostInteraction name='shares' value='98'>
						<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M3.6001 15.2197V18.9256C3.6001 19.4873 3.82135 20.0259 4.21517 20.423C4.609 20.8202 5.14314 21.0433 5.7001 21.0433H18.3001C18.8571 21.0433 19.3912 20.8202 19.785 20.423C20.1788 20.0259 20.4001 19.4872 20.4001 18.9256V15.2197M12.0435 14.9565L12.0435 2.95654M12.0435 2.95654L7.24346 7.54169M12.0435 2.95654L16.8434 7.54169" stroke="#575757" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</PostInteraction>
				</div>
			</div>
		</div>
	)
}
