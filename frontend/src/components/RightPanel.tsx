import type { StateController } from "@stypes/global"
import { useState } from "react"
import { Link } from "react-router-dom"

type TRecentSection = 'posts' | 'groups' | 'people'


function RecentSectionItem({ name, label, isActive, ...props }: React.HTMLAttributes<HTMLButtonElement> & { name: string, label: string, isActive:boolean }) {
	return (
		<button className={`${name} 
			w-25 
			flex justify-center 
			border border-gray-300 shadow-sm rounded-[15px] 
			p-2 cursor-pointer ${isActive && 'bg-gray-200'} hover:bg-gray-100`} 
			{...props}
		>
			<span className="text-[14px]">{ label }</span>
		</button>
	)
}

function RecentSection({ activeRecentSection: [activeRecentSection, setActiveRecentSection] }: { activeRecentSection: StateController<TRecentSection | null> }) {
	return (
		<div className="recent-sections flex justify-between gap-2 p-[10px_0]">
			<RecentSectionItem 
				name={"recent-posts"} 
				label="Posts" 
				isActive={activeRecentSection === 'posts'}
				onClick={() => setActiveRecentSection('posts')} 
			/>
			<RecentSectionItem 
				name={"recent-groups"} 
				label="Groups" 
				onClick={() => setActiveRecentSection('groups')} 
				isActive={activeRecentSection === 'groups'} 
			/>
			<RecentSectionItem 
				name={"recent-people"}
				label="People" 
				onClick={() => setActiveRecentSection('people')} 
				isActive={activeRecentSection === 'people'} 
			/>
		</div>
	)
}

function RecentPost() {
	const text = "Lorem ipsum dolor sit amet consectetur adipisicing elit Lorem ipsum dolor sit amet consectetur adipisicing elitLorem ipsum dolor sit amet consectetur adipisicing elit"

	return (
		<Link to={"/post"} className="recent-post 
			flex gap-2 
			border border-gray-300 shadow-sm rounded-[10px]
			p-2 cursor-pointer
		">
			<div className="left-side">
				<div className="user-profile-pic justify-self-start w-10 h-10 overflow-hidden rounded-[50%]">
                    <img 
                        src="https://placehold.co/600x400/cyan/black?text=R" 
                        className='w-full h-full object-cover'
                        alt="user"
                    />
                </div>
			</div>
			<div className="right-side flex flex-col gap-2">
				<div className="post-header w-full flex gap-2 items-center">
					<span className="hover:underline">Rafi Rahman</span> • <span>8d</span>
				</div>
				<div className="post-content w-full">
					<span className="text-justify hyphens-auto hover:underline">{ text.length > 100 ? `${text.slice(0, 100)}...` : text}</span>
				</div>
				<div className="post-footer w-full flex justify-between">
					<span>190 Likes</span>
					<span>500 Comments</span>
				</div>
			</div>
		</Link>
	)
}

function RecentPosts() {
	return (
		<div className="recent-posts flex flex-col gap-3 text-[12px] mb-10">
			<RecentPost />
			<RecentPost />
			<RecentPost />
			<RecentPost />
			<RecentPost />
			<RecentPost />
			<RecentPost />
		</div>
	)
}

export default function RightPanel() {

	const [activeRecentSection, setActiveRecentSection] = useState<TRecentSection | null>('posts')

    return (
        <div className="right-panel bg-(--primary-secondary-rightpanel-clr) hidden xl:flex">
			<div className="container w-[90%] h-full">
				<div className="header h-[10vh] flex items-center w-full">
					<span className="font-medium font-sans text-[18px]">Recently seen</span>
				</div>

				<div className="right-panel-container flex flex-col h-[90vh] w-full">
					<RecentSection activeRecentSection={[activeRecentSection, setActiveRecentSection]} />

					<div className="overflow-y-auto left-panel">
						{ activeRecentSection === "posts" && <RecentPosts /> }
					</div>
				</div>
			</div>
        </div>
    )
}
