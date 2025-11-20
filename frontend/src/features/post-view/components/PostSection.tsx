import React from 'react'
import FeedMediaPost from '../../feed/components/feed-section/FeedMediaPost'

export default function PostSection() {
    return (
        <div className='mt-5'>
            <FeedMediaPost isLast={false} withMedia={true} />
        </div>
    )
}
