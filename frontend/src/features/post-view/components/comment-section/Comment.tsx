import React, { useState } from 'react'
import type { TComment, TReply } from '../../types'
import PostInteraction from '@components/PostInteraction'

export default function Comment({ comment, type, isLastReply=false, showReply }: { comment: TComment | TReply, isLastReply?: boolean, type: "comment" | "reply", showReply?: () => void }) {
    const [showFullText, setShowFullText] = useState<boolean>(false)

    return (
        <div className={`comment w-full flex gap-2 text-sm`}>
            <div className={`left-side w-auto bg-white relative ${isLastReply && 'z-20'}`}>
                <div className={`commenter-profile-pic relative justify-self-start w-[30px] h-[30px] overflow-hidden bg-green-700 rounded-[50%] z-20`}>
                    <img 
                        src="https://placehold.co/600x400?text=A" 
                        className='w-full h-full object-cover'
                        alt="user"
                    />
                </div>
            </div>

            <div className="right-side flex flex-col gap-2">
                <div className="comment-header">
                    <span className="commenter-name">{comment.author.name} • {comment.created_at}</span>
                </div>

                <div className="comment-content">
                    <span className='text-justify hyphens-auto'>
                        { comment.content.length > 500
                            ? showFullText 
                                ? <span>{comment.content} (<span className='text-blue-500 font-bold cursor-pointer hover:underline' onClick={() => setShowFullText(false)}>Hide</span>)</span> 
                                : <span>{comment.content.slice(0, 500)}...<span className='text-blue-500 font-bold cursor-pointer hover:underline' onClick={() => setShowFullText(true)}>Show More</span></span>
                            : comment.content
                        }
                    </span>
                </div>

                <div className="comment-interactions flex gap-4">
                    <PostInteraction name='reacts' value='6.8k'>
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.6409 3.47437C19.0626 3.47458 21.2941 5.7833 21.2942 8.47925C21.2942 11.4095 19.5363 14.7462 17.387 17.2888C16.3221 18.5485 15.1974 19.5686 14.2141 20.2146C13.7215 20.5382 13.2868 20.7536 12.9299 20.865C12.5631 20.9794 12.352 20.9618 12.2532 20.9275L12.134 20.8865H11.9768C11.7954 20.8788 11.5087 20.8109 11.1155 20.6355C10.718 20.4582 10.2556 20.1923 9.7522 19.8425C8.74571 19.1433 7.61637 18.1402 6.55884 16.9373C4.42233 14.5069 2.69653 11.4007 2.69653 8.47827C2.69658 5.78327 4.92994 3.47437 7.34985 3.47437C9.26771 3.47451 10.6123 4.80078 11.384 5.88843L11.9954 6.75073L12.6077 5.88843C13.3775 4.80266 14.7221 3.47437 16.6409 3.47437Z" stroke="#575757" stroke-width="1.5" />
                        </svg>
                    </PostInteraction>
                    <PostInteraction name={type} value='600' onClick={showReply}>
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
