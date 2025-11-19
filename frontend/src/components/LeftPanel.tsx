import React, { useState } from "react"

function LeftPanelNavigationItem({ label, children, extendedClass, onClick }: { label: string, children: React.ReactElement<any>, extendedClass?: string, onClick?: any }) {
	const clonedIcon = React.cloneElement(children, {
		className: 'h-[24px] w-[24px]'
	})
	return (
		<div className={`item
			w-[90%] 
			flex gap-[15px] items-center 
			rounded-[10px] cursor-pointer p-[10px_10px]
			hover:bg-[#e9e9e9]
			${extendedClass}
		`} onClick={onClick}>
			{ clonedIcon }
			<span className="text-[14px] font-['Space_Grotesk'] text-[rgba(0,0,0,0.7)]">{ label }</span>
		</div>
	)
}
LeftPanelNavigationItem.dropdown = ({ label, children }: { label: string, children?: React.ReactElement<any> }) => {
	return (
		<div className="dropdown
			w-[90%] 
			flex gap-[15px] items-center
			p-[10px_10px] 
		">
			<span className='text-[13px] font-sans grow text-[rgba(0,0,0,0.5)]'>{ label }</span>
			{ children && React.cloneElement(children, {
				className: 'h-[24px] w-[24px]'
			}) }
		</div>
	)
}
LeftPanelNavigationItem.button = ({ label, children }: { label: string, children?: React.ReactElement<any> }) => {
	return (
		<div className="item
			w-[90%] 
			flex gap-[15px] items-center 
			rounded-[10px] cursor-pointer p-[10px_10px]
		">
			<button className='button
				bg-[#42acde] text-white 
				outline-transparent border-none rounded-[20px] p-[1vh] 
				w-full
				flex justify-center items-center gap-[5px]
			'>
				{ children && React.cloneElement(children, {
					className: 'h-[24px] w-[24px]'
				}) }
				<span className="text-[13px] font-['Space_Grotesk'] text-white font-normal">{ label }</span>
			</button>
		</div>
	)
}

export default function LeftPanel({ open = false, ref }: { open: boolean, ref: React.RefObject<HTMLDivElement | null> }) {
	type ToggleableItem = 'home' | 'popular' | 'friends' | 'groups';
	const [activeItem, __setActiveItem] = useState<ToggleableItem | null>(null);

	function setActiveItem(item: ToggleableItem) {
		__setActiveItem(item === activeItem ? null : item);
	}

	return (
		<div className={`left-panel 
			bg-(--leftpanel-maincontainer-clr) 
			overflow-visible border-gray-300 border-r-2
			absolute w-[65%] z-100 h-[90vh] bottom-0
			transition-transform duration-300
			transform ${open ? 'translate-x-0' : '-translate-x-full'}
			md:static md:flex md:flex-col md:items-start md:w-full md:translate-x-0 md:border-r-0 md:h-screen md:z-0
		`} ref={ref}>
			<div className="leftpanel-container overflow-y-auto w-[90%] h-full flex flex-col gap-5 items-center">
				<div className="logo-container hidden w-[95%] md:flex justify-start pl-[2vh]">
					<svg
						width="122"
						height="72"
						viewBox="0 0 122 72"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
					>
						<rect
							width="122"
							height="71.2"
							fill="url(#pattern0_9563_7688)"
						/>
						<defs>
							<pattern
								id="pattern0_9563_7688"
								patternContentUnits="objectBoundingBox"
								width="1"
								height="1"
							>
								<use
									xlinkHref="#image0_9563_7688"
									transform="translate(-0.155738) scale(0.00131148 0.00224719)"
								/>
							</pattern>
							<image
								id="image0_9563_7688"
								width="1000"
								height="445"
								preserveAspectRatio="none"
								xlinkHref="data:image/png;base64,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"
							/>
						</defs>
					</svg>
				</div>
				<div className="items-container mt-1 md:mt-0 w-[95%] flex flex-col items-center self-end gap-[1vh]">
					<LeftPanelNavigationItem label='Home' onClick={() => setActiveItem('home')}>
						<svg
							viewBox="0 0 32 32"
							fill={activeItem === 'home' ? 'black' : 'none'}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M3.33268 14.5845C3.33268 12.9523 4.08012 11.4099 5.36125 10.3985L12.6946 4.60903C14.6322 3.0793 17.3665 3.07931 19.3041 4.60903L26.6375 10.3985C27.9186 11.4099 28.666 12.9523 28.666 14.5845V23.3333C28.666 26.2788 26.2782 28.6667 23.3327 28.6667H21.3327C20.5963 28.6667 19.9994 28.0697 19.9994 27.3333V23.3333C19.9994 21.8606 18.8054 20.6667 17.3327 20.6667H14.666C13.1933 20.6667 11.9994 21.8606 11.9994 23.3333V27.3333C11.9994 28.0697 11.4024 28.6667 10.666 28.6667H8.66602C5.7205 28.6667 3.33268 26.2789 3.33268 23.3333L3.33268 14.5845Z"
								stroke="#626261"
							/>
						</svg>
					</LeftPanelNavigationItem>
					<LeftPanelNavigationItem label='Popular' onClick={() => setActiveItem('popular')}>
						<svg
							viewBox="0 0 32 32"
							fill={activeItem === 'popular' ? 'black' : 'none'}
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M18.4212 13.8954C18.2739 13.8954 18.1545 13.776 18.1545 13.6287V3.47235C18.1545 3.21556 17.8272 3.10715 17.6739 3.31316L7.45947 17.0411C7.13223 17.4809 7.44613 18.1057 7.99432 18.1057H13.5802C13.7274 18.1057 13.8468 18.2251 13.8468 18.3724V28.5288C13.8468 28.7856 14.1741 28.894 14.3274 28.688L24.5418 14.96C24.8691 14.5202 24.5552 13.8954 24.007 13.8954H18.4212Z"
								stroke="#626261"
							/>
						</svg>
					</LeftPanelNavigationItem>
					<LeftPanelNavigationItem label='Friends' onClick={() => setActiveItem('friends')}>
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill={activeItem === 'friends' ? 'black' : 'none'}
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="5.33333"
								cy="5.33333"
								r="5.33333"
								transform="matrix(-1 0 0 1 21.334 4)"
								stroke="#626261"
							/>
							<path
								d="M6.66732 22.5796C6.66732 21.4325 7.38846 20.4092 8.46878 20.0233C13.3394 18.2838 18.6619 18.2838 23.5325 20.0233C24.6128 20.4092 25.334 21.4325 25.334 22.5796V24.3336C25.334 25.9169 23.9317 27.133 22.3644 26.9091L21.0918 26.7274C17.7149 26.2449 14.2865 26.2449 10.9095 26.7274L9.63693 26.9091C8.06959 27.133 6.66732 25.9169 6.66732 24.3336V22.5796Z"
								stroke="#626261"
							/>
						</svg>
					</LeftPanelNavigationItem>
					<LeftPanelNavigationItem label='Schedule'>
						<svg
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<rect
								x="4"
								y="4.66724"
								width="24"
								height="24"
								rx="6.66667"
								stroke="#626261"
							/>
							<path
								d="M4 11.3339H28"
								stroke="#626261"
								stroke-linejoin="round"
							/>
							<path
								d="M22 2.66724L22 6.66724"
								stroke="#626261"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M10 2.66724L10 6.66724"
								stroke="#626261"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M8.66797 16.6673H10.0013"
								stroke="#626261"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15.3346 16.6673H16.668"
								stroke="#626261"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M22.0013 16.6673H23.3346"
								stroke="#626261"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M8.66797 22H10.0013"
								stroke="#626261"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M15.3346 22H16.668"
								stroke="#626261"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M22.0013 22H23.3346"
								stroke="#626261"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</LeftPanelNavigationItem>
					<LeftPanelNavigationItem label='Study Space'>
						<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
							<g opacity="0.52">
								<rect x="0.3125" y="0.3125" width="19.375" height="19.375" stroke="#191919" stroke-width="0.625"/>
								<path d="M1.25 0.625H19.0625L11.5625 5L1.25 0.625Z" fill="#1A1A1A"/>
								<path d="M1.25 2.8125L2.8125 1.25L11.5625 5L19.0625 0.625L12.5 7.5L1.25 2.8125Z" fill="#191919" fill-opacity="0.4"/>
								<path d="M2.5 5.3125L3.75 3.75L12.5 7.5L19.0625 0.625L13.75 10L2.5 5.3125Z" fill="#282828" fill-opacity="0.54"/>
								<path d="M3.75 7.8125L4.6875 6.25L13.75 10L19.0625 0.625L14.6875 12.1875L3.75 7.8125Z" fill="#2D2D2D" fill-opacity="0.39"/>
								<path d="M4.375 12.5L7.5 19.375H4.375V12.5Z" fill="#191919"/>
								<path d="M4.375 12.5L19.375 18.4783V19.375H7.5L4.375 12.5Z" fill="url(#paint0_linear_10210_5637)"/>
							</g>
							<defs>
								<linearGradient id="paint0_linear_10210_5637" x1="11.875" y1="12.5" x2="11.875" y2="19.375" gradientUnits="userSpaceOnUse">
									<stop stop-color="#2D2D2D"/>
									<stop offset="1" stop-color="#282828"/>
								</linearGradient>
							</defs>
						</svg>
					</LeftPanelNavigationItem>
					

					<LeftPanelNavigationItem.dropdown label='Groups'>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M4.29279 7.79259C4.48031 7.60512 4.73462 7.49981 4.99979 7.49981C5.26495 7.49981 5.51926 7.60512 5.70679 7.79259L11.9998 14.0856L18.2928 7.79259C18.385 7.69708 18.4954 7.6209 18.6174 7.56849C18.7394 7.51608 18.8706 7.4885 19.0034 7.48734C19.1362 7.48619 19.2678 7.51149 19.3907 7.56177C19.5136 7.61205 19.6253 7.68631 19.7192 7.7802C19.8131 7.87409 19.8873 7.98574 19.9376 8.10864C19.9879 8.23154 20.0132 8.36321 20.012 8.49599C20.0109 8.62877 19.9833 8.75999 19.9309 8.882C19.8785 9.004 19.8023 9.11435 19.7068 9.20659L13.4138 15.4996C13.0387 15.8745 12.5301 16.0852 11.9998 16.0852C11.4695 16.0852 10.9608 15.8745 10.5858 15.4996L4.29279 9.20659C4.10532 9.01907 4 8.76476 4 8.49959C4 8.23443 4.10532 7.98012 4.29279 7.79259Z"
								fill="black"
								fill-opacity="0.4"
							/>
						</svg>
					</LeftPanelNavigationItem.dropdown>
					<LeftPanelNavigationItem label='Explore Groups' onClick={() => setActiveItem('groups')}>
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill={activeItem === 'groups' ? 'black' : 'none'}
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="4.53901"
								cy="4.53901"
								r="4.53901"
								transform="matrix(-1 0 0 1 20.8203 6.66895)"
								stroke="black"
							/>
							<path
								d="M8.33984 22.4825C8.33984 21.5062 8.95358 20.6353 9.873 20.3069C14.0182 18.8265 18.548 18.8265 22.6932 20.3069C23.6126 20.6353 24.2264 21.5062 24.2264 22.4825V23.9752C24.2264 25.3227 23.0329 26.3577 21.699 26.1672L21.2543 26.1036C17.9569 25.6326 14.6093 25.6326 11.3119 26.1036L10.8672 26.1672C9.53327 26.3577 8.33984 25.3227 8.33984 23.9752V22.4825Z"
								stroke="black"
							/>
							<path
								d="M23.0899 15.872C25.0595 15.872 26.6562 14.2753 26.6562 12.3056C26.6562 10.336 25.0595 8.73926 23.0899 8.73926"
								stroke="black"
								stroke-linecap="round"
							/>
							<path
								d="M26.9948 24.0064L27.3443 24.0563C28.3923 24.2061 29.33 23.3928 29.33 22.3341V21.1612C29.33 20.3941 28.8478 19.7098 28.1254 19.4518C27.4048 19.1945 26.6694 18.9941 25.9258 18.8506"
								stroke="black"
								stroke-linecap="round"
							/>
							<path
								d="M8.91011 15.872C6.94047 15.872 5.34375 14.2753 5.34375 12.3056C5.34375 10.336 6.94047 8.73926 8.91011 8.73926"
								stroke="black"
								stroke-linecap="round"
							/>
							<path
								d="M5.00516 24.0064L4.65572 24.0563C3.60766 24.2061 2.66996 23.3928 2.66996 22.3341V21.1612C2.66996 20.3941 3.15218 19.7098 3.87458 19.4518C4.59518 19.1945 5.33058 18.9941 6.07422 18.8506"
								stroke="black"
								stroke-linecap="round"
							/>
						</svg>
					</LeftPanelNavigationItem>
					<LeftPanelNavigationItem.button label='Create A Group'>
						<svg
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M12 5V19M5 12H19"
								stroke="white"
								stroke-width="2"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</LeftPanelNavigationItem.button>


					<LeftPanelNavigationItem.dropdown label='Tools' />
					<LeftPanelNavigationItem label='Explore Tools'>
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M25.7311 9.87401V22.7946M22.7946 6.9375H9.87401M22.7946 25.7311H9.87401M6.9375 9.87401V22.7946"
								stroke="black"
							/>
							<circle
								cx="25.7295"
								cy="6.93651"
								r="2.93651"
								stroke="black"
							/>
							<circle
								cx="6.93651"
								cy="6.93651"
								r="2.93651"
								stroke="black"
							/>
							<circle
								cx="25.7295"
								cy="25.7305"
								r="2.93651"
								stroke="black"
							/>
							<circle
								cx="6.93651"
								cy="25.7305"
								r="2.93651"
								stroke="black"
							/>
						</svg>
					</LeftPanelNavigationItem>
					

					<LeftPanelNavigationItem.dropdown label='Others' />
					<LeftPanelNavigationItem label='Settings'>
						<svg
							width="33"
							height="33"
							viewBox="0 0 33 33"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M25.9572 7.46001L25.299 6.31787C24.8013 5.4541 24.5525 5.02222 24.129 4.84999C23.7056 4.67778 23.2266 4.81367 22.2689 5.08546L20.642 5.54373C20.0305 5.68474 19.3889 5.60474 18.8307 5.31787L18.3815 5.05871C17.9027 4.75206 17.5344 4.29993 17.3305 3.76847L16.8853 2.43863C16.5925 1.55861 16.4461 1.11859 16.0976 0.866914C15.7492 0.615234 15.2863 0.615234 14.3604 0.615234H12.874C11.9483 0.615234 11.4853 0.615234 11.1368 0.866914C10.7883 1.11859 10.6419 1.55861 10.3492 2.43863L9.90389 3.76847C9.70005 4.29993 9.33178 4.75206 8.85301 5.05871L8.40384 5.31787C7.8455 5.60474 7.20397 5.68474 6.59249 5.54373L4.96552 5.08546C4.00773 4.81367 3.52885 4.67778 3.10541 4.84999C2.68197 5.02222 2.43312 5.4541 1.93539 6.31787L1.27728 7.46001C0.810732 8.26967 0.577452 8.67451 0.622732 9.10547C0.667999 9.53643 0.980292 9.88373 1.60487 10.5783L2.97959 12.1152C3.31559 12.5406 3.55413 13.2819 3.55413 13.9484C3.55413 14.6152 3.31567 15.3563 2.97963 15.7818L1.60487 17.3187C0.980292 18.0134 0.668012 18.3606 0.622732 18.7916C0.577452 19.2226 0.810732 19.6274 1.27728 20.437L1.93537 21.5791C2.43309 22.4428 2.68197 22.8748 3.10541 23.047C3.52885 23.2192 4.00775 23.0834 4.96555 22.8115L6.59244 22.3532C7.20402 22.2122 7.84568 22.2923 8.40408 22.5792L8.85318 22.8384C9.33186 23.1451 9.70004 23.5971 9.90385 24.1286L10.3492 25.4586C10.6419 26.3386 10.7883 26.7786 11.1368 27.0303C11.4853 27.2819 11.9483 27.2819 12.874 27.2819H14.3604C15.2863 27.2819 15.7492 27.2819 16.0976 27.0303C16.4461 26.7786 16.5925 26.3386 16.8853 25.4586L17.3307 24.1286C17.5344 23.5971 17.9025 23.1451 18.3813 22.8384L18.8304 22.5792C19.3888 22.2923 20.0304 22.2122 20.642 22.3532L22.2689 22.8115C23.2266 23.0834 23.7056 23.2192 24.129 23.047C24.5525 22.8748 24.8013 22.4428 25.299 21.5791L25.9572 20.437C26.4237 19.6274 26.6569 19.2226 26.6117 18.7916C26.5664 18.3606 26.2541 18.0134 25.6296 17.3187L24.2548 15.7818C23.9188 15.3563 23.6802 14.6152 23.6802 13.9484C23.6802 13.2819 23.9189 12.5406 24.2548 12.1152L25.6296 10.5783C26.2541 9.88373 26.5664 9.53643 26.6117 9.10547C26.6569 8.67451 26.4237 8.26967 25.9572 7.46001Z"
								stroke="black"
								stroke-width="1.23077"
								stroke-linecap="round"
							/>
							<path
								d="M18.22 13.9382C18.22 16.5155 16.1307 18.6048 13.5533 18.6048C10.976 18.6048 8.88672 16.5155 8.88672 13.9382C8.88672 11.3608 10.976 9.27148 13.5533 9.27148C16.1307 9.27148 18.22 11.3608 18.22 13.9382Z"
								stroke="black"
								stroke-width="1.23077"
							/>
						</svg>
					</LeftPanelNavigationItem>
					<LeftPanelNavigationItem label='Blog' extendedClass='mb-2'>
						<svg
							width="24"
							height="24"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g clip-path="url(#clip0_9563_7682)">
								<path
									d="M12.809 11.8287C12.5547 11.9391 12.2805 11.9961 12.0033 11.9961C11.726 11.9961 11.4518 11.9391 11.1975 11.8287L1.42611 7.303C1.26744 7.22297 1.1341 7.10046 1.04093 6.94913C0.947767 6.79779 0.898437 6.62357 0.898438 6.44586C0.898437 6.26814 0.947767 6.09392 1.04093 5.94258C1.1341 5.79125 1.26744 5.66874 1.42611 5.58871L11.1975 1.02871C11.4518 0.918302 11.726 0.861328 12.0033 0.861328C12.2805 0.861328 12.5547 0.918302 12.809 1.02871L22.5804 5.55443C22.7391 5.63446 22.8724 5.75696 22.9656 5.9083C23.0587 6.05963 23.1081 6.23386 23.1081 6.41157C23.1081 6.58928 23.0587 6.76351 22.9656 6.91484C22.8724 7.06618 22.7391 7.18868 22.5804 7.26871L12.809 11.8287Z"
									stroke="black"
									stroke-width="1.00742"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M23.1451 12.6025L12.6879 17.4197C12.4646 17.5216 12.222 17.5743 11.9765 17.5743C11.731 17.5743 11.4884 17.5216 11.2651 17.4197L0.859375 12.6025"
									stroke="black"
									stroke-width="1.00742"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
								<path
									d="M23.1451 18.1719L12.6879 22.989C12.4646 23.0909 12.222 23.1436 11.9765 23.1436C11.731 23.1436 11.4884 23.0909 11.2651 22.989L0.859375 18.1719"
									stroke="black"
									stroke-width="1.00742"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</g>
							<defs>
								<clipPath id="clip0_9563_7682">
									<rect width="24" height="24" fill="white" />
								</clipPath>
							</defs>
						</svg>
					</LeftPanelNavigationItem>
				</div>
			</div>

			<div className="toggle-sidebar
				hidden items-center justify-center 
				absolute top-[15%] left-full 
				-translate-x-1/2 -translate-y-1/2 w-8 h-8 
				md:flex
				min-[2000px]:top-[10.5%]
				bg-white shadow-md rounded-md
			">
				<svg width="11" height="19" viewBox="0 0 11 19" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M9.33203 17.333L1.33203 9.33301L9.33203 1.33301" stroke="#5F5E5B" stroke-width="2.66667" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</div>
		</div>
	);
}
