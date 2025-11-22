import { useEffect } from 'react'
import PostContainer from './PostContainer'
import { useNavigate } from 'react-router-dom'
import PostButton from './PostButton'
import BackButton from '@components/BackButton'
import { useNavigationPanelContext } from '@contexts/NavigationPanelContext'

export default function MobilePostSection() {
    const { navElements: [, setNavElements] } = useNavigationPanelContext()!
    const navigate = useNavigate()

    useEffect(() => {
        setNavElements({
            mobileLeft: (
                <div className='flex gap-2 md:hidden'>
                    <BackButton onClick={() => navigate(-1)} />
                    <div className="action-title h-12 overflow-hidden flex flex-row justify-start items-center">
                        <span className="text-lg font-['Space_Grotesk']">Create Post</span>
                    </div>
                </div>
            ),
            right: (
                <div className="tool flex items-center justify-center md:hidden">
                    <PostButton onClick={() => console.log(`upload-post`)} />
                </div>
            )
        })

        return () => setNavElements({})
    }, [])

    return (
        <PostContainer />
    )
}
