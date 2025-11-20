import type { StateController } from "@stypes/global";
import GlobalSearchBar from "./GlobalSearchBar";
import InteractionsTools from "./InteractionTools";
import NoteRoomLogo from "@images/noteroom_logo.png"


function MobileLeft({ hamBurgerMenuRef, sidebar: [openSidebar, setOpenSidebar] }: { sidebar: StateController<boolean>, hamBurgerMenuRef: React.RefObject<HTMLDivElement | null> }) {
	return (
		<div className="mobile-left
			w-[75%] h-[70%] 
			flex flex-row items-center gap-1
			md:hidden
		">
			<div className="hamburger-menu flex flex-row justify-center items-center" onClick={() => setOpenSidebar(!openSidebar)} ref={hamBurgerMenuRef}>
				<svg className="h-6 w-6" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M1 7H19M1 1H19M1 13H19" stroke="#1E1E1E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
				</svg>
			</div>
			<div className="app-logo w-12 h-12 overflow-hidden flex flex-row justify-start items-center">
				<img src={NoteRoomLogo} className="h-full w-full object-cover" />
			</div>
		</div>
	)
}

export default function NavigationPanel({ sidebar, hamBurgerMenuRef }: { sidebar: StateController<boolean>, hamBurgerMenuRef: React.RefObject<HTMLDivElement | null> }) {
	return (
		<div className="navigation-panel
			border-gray-300 border-b-2 p-2
			w-full h-[10vh]
			flex flex-row justify-between gap-3 justify-self-end items-center
			md:mt-2 md:p-0
		">
			<GlobalSearchBar />
			<MobileLeft hamBurgerMenuRef={hamBurgerMenuRef} sidebar={sidebar} />
			<InteractionsTools />
		</div>
	)
}