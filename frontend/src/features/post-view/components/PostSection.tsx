import BackButton from '@components/BackButton'
import FeedMediaPost from '../../feed/components/feed-section/FeedMediaPost'
import { useNavigate } from 'react-router-dom'

export default function PostSection() {
	const navigate = useNavigate()

	return (
		<div className='mt-5 relative'>
			<BackButton className='hidden md:block xl:block fixed md:left-[7%] lg:left-[15%] xl:left-[25%]' onClick={() => navigate(-1)} />
			<FeedMediaPost isLast={false} withMedia={true} />
		</div>
	)
}
