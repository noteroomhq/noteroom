import React, { useState } from 'react'
import type { TComment } from '../../types'
import Comment from './Comment'

export default function ThreadSection({ comment }: { comment: TComment }) {
    const [showReply, setShowReply] = useState<boolean>(false)

    return (
        <div className='thread-section flex flex-col'>
            <div className="relative flex h-auto">
                <div className="left-side absolute flex left-0 w-[30px] h-full">
                    <div className={`chain w-0.5 h-full bg-gray-300 absolute left-[50%] -translate-x-1/2 z-10 ${comment.replies.length === 0 || !showReply ? 'hidden' : 'block'}`}></div>
                </div>

                <div className="right-side flex flex-col gap-5 ">
                    <Comment comment={comment} type='comment' showReply={() => setShowReply(!showReply)} />

                    { (comment.replies.length !== 0 && showReply) && 
                        <div className="replies flex flex-col gap-5">
                            { comment.replies.map((reply, index) => {
                                return (
                                    <Comment 
                                        type='reply' 
                                        comment={reply} 
                                        isLastReply={index === comment.replies.length - 1}
                                    />
                                )
                            }) }
                        </div>
                    }
                </div>
            </div>
            
            { (comment.replies.length !== 0 && showReply) && 
                <div className="show-more-replies w-[80%] bg-[#F4F4F2] p-1 rounded-lg mt-5 flex justify-center self-center">
                    <button>Show More Replies</button>
                </div> 
            }
        </div>
    )
}

