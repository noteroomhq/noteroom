import React, { useState } from 'react'
import ThreadSection from './ThreadSection'
import type { TComment } from '../../types'
import Divider from '@components/Divider'

export default function CommentSection({ comments }: { comments: TComment[] }) {
    return (
        <div className="comments-section flex flex-col gap-2">
            <div className="header w-full">
                <span className='text-xl'>Comments</span>
            </div>

            <Divider extendedClass='w-full' />

            <div className="comments flex flex-col w-full h-auto gap-10 mb-10 mt-5">
                { comments.map(comment => {
                    return <ThreadSection comment={comment} />
                }) }
            </div>
        </div>
    )
}
