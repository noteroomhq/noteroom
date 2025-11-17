import Divider from "@components/Divider"
import FeedMediaPost from "./FeedMediaPost"

export default function FeedSection() {
	return (
		<div className="feed-section
			flex flex-col w-full items-center
			font-['Space_Grotesk']
		">
			{[1, 2, 3].map(i => {
				return (
					<>
						<FeedMediaPost withMedia={i % 2 == 0} isLast={i === 3} />
						{i !== 3 && <Divider extendedClass='my-5' />}
					</>
				)
			})}
		</div>
	)
}
