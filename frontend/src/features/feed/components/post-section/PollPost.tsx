import { usePostSectionContext } from "../contexts/PostSectionContext"

type PollPost = {
	id: number,
	value: string
}

function PollPostOption({ poll, loopIndex, isLast, isDeleteable }: { poll: PollPost, loopIndex: number, isLast: boolean, isDeleteable: boolean }) {
	const {setValue, addOption, removeOption} = usePostSectionContext()!.pollActions

	return (
		<div className="option flex flex-row w-full h-[60px] items-center justify-center" key={poll.id}>
			<div className="option-input w-[90%] h-[60px]">
				<input type="text" value={poll.value} onChange={(e) => setValue(poll.id, e.target.value)} className='w-full h-[80%] outline-none pl-5 border border-gray-300 rounded-[10px] bg-(--primary-secondary-rightpanel-clr)' placeholder={`Option ${loopIndex + 1}`} />
			</div>
			<div className="option-tools w-[10%] h-[60px]">
				<div className="add-option-tool h-[80%] w-full flex justify-center items-center">
					{ isLast 
						? <svg className='w-[25px] h-[25px] cursor-pointer' viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={addOption}>
							<path d="M14 7.875V20.125M7.875 14H20.125" stroke="#828282" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
						</svg> 
						: isDeleteable && <svg className='w-[25px] h-[25px] cursor-pointer' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={() => removeOption(poll.id)}>
							<path d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6H4V4H9V3H15V4H20V6H19V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM17 6H7V19H17V6ZM9 17H11V8H9V17ZM13 17H15V8H13V17Z" fill="#FF7474"/>
						</svg>
					}
				</div>
			</div>
		</div>
	)
} 

export default function PollPost({ extendedClass }: { extendedClass: string }) {
	const [polls] = usePostSectionContext()!.poll

	return (
		<div className={`poll-container scrollbar
			${extendedClass}
			flex flex-col p-3 border border-gray-300 rounded-[20px] gap-1 w-full
		`}>
			<div className="options-container flex flex-col min-h-[120px] max-h-[270px] min-[2000px]:max-h-[300px] gap-1 overflow-y-auto">
				{ polls.map((poll, i) => {
					return <PollPostOption poll={poll} loopIndex={i} isLast={i === polls.length - 1} isDeleteable={polls.length > 2} />
				}) }
			</div>
			
			<div className="end-date-container w-full h-[30px] flex gap-2 items-center text-[15px]">
				<div className="label"><span>Set an end date:</span></div>
				<div className="end-date"><input type="date" className='border border-gray-300 rounded-[5px] p-0.5' /></div>
			</div>
		</div>
	)
}
