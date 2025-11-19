import CommentSection from './comment-section/CommentSection'
import PostSection from './PostSection'
import AddCommentSection from './AddCommentSection'
import { useState } from 'react'
import type { TComment } from '../types'

export default function PostView() {
    const [comments] = useState<TComment[]>([
        {
            content: `
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
            `,
            author: {
                name: "Anirban Biswas"
            },
            created_at: "27/11/25",
            replies: [
                {
                    content: `
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
                    `,
                    author: {
                        name: "Anirban Biswas"
                    },
                    created_at: "27/11/25"
                },
                {
                    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.",
                    author: {
                        name: "Anirban Biswas"
                    },
                    created_at: "27/11/25"
                }
            ]
        },
        {
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.",
            author: {
                name: "Anirban Biswas"
            },
            created_at: "27/11/25",
            replies: []
        },
        {
            content: `
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
            `,
            author: {
                name: "Anirban Biswas"
            },
            created_at: "27/11/25",
            replies: [
                {
                    content: `
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.
                    `,
                    author: {
                        name: "Anirban Biswas"
                    },
                    created_at: "27/11/25"
                },
                {
                    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum voluptatum architecto voluptatibus officia, ut qui et excepturi! Ducimus tempore ipsum voluptas sit atque repudiandae assumenda, culpa ut recusandae, odit corrupti.",
                    author: {
                        name: "Anirban Biswas"
                    },
                    created_at: "27/11/25"
                }
            ]
        }
    ])

    return (
        <div className='post-view flex flex-col gap-10 w-[95%] md:w-full'>
            <PostSection />
            <AddCommentSection />
            <CommentSection comments={comments} />
        </div>
    )
}
