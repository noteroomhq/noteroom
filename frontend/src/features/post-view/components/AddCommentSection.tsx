export default function AddCommentSection() {
    return (
        <div className="reply-container p-3 bg-white border border-gray-300 rounded-[15px] flex items-center gap-4 w-full md:w-[95%]">
            <div className="user-profile-pic">
                <div className="justify-self-start w-10 h-10 overflow-hidden rounded-[50%]">
                    <img 
                        src="https://placehold.co/600x400?text=A" 
                        className='w-full h-full object-cover'
                        alt="user"
                    />
                </div>
            </div>
            <div className="text-container">
                <span className='text-md'>Write a comment</span>
            </div>
        </div>
    )
}
