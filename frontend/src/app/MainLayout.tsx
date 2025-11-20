import { useEffect, useRef, useState } from "react"
import LeftPanel from "../components/LeftPanel"
import NavigationPanel from "../components/NavigationPanel"
import RightPanel from "../components/RightPanel"
import FloatingElements from "../components/FloatingElements"
import { Outlet } from "react-router-dom"
import PostContainer from "../features/feed/components/post-section/PostContainer"
import PostSectionProvider from "../features/feed/components/contexts/PostSectionContext"
import { useFloatingElementContext } from "../contexts/FloatingElementsContext"


function MainContainer({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <div className="main-container 
            relative
            bg-(--leftpanel-maincontainer-clr)
            h-screen overflow-hidden w-full
            grid grid-cols-1
            md:grid-cols-[1.2fr_6fr]
            min-[2000px]:grid-cols-[0.9fr_5fr]
        ">
            { children }
        </div>
    )
}

function UILayer({ children }: { children: React.ReactNode | React.ReactNode[] }) {
	return (
		<div className='root-ui'>
			{children}
		</div>
	)
}

function PrimaryMiddleSection({ children }: { children: React.ReactNode[] }) {
	return (
		<div className="primary-middle-section
			bg-(--primary-secondary-rightpanel-clr)
			h-full w-full 
			grid grid-cols-1
			md:h-[99.5%] md:w-[99.5%] md:self-end md:grid-cols-[4fr_1fr] md:rounded-[50px_0_0_0] 
		">
			{children}
		</div>
	)
}
function HolderMiddleSection({ children }: { children: React.ReactNode[] }) {
	return (
		<div className="holder-middle-section
			flex flex-col items-center justify-self-center w-full
			md:w-[60%]
		">
			{children}
		</div>
	)
}
function SecondaryMiddleSection({ children }: { children: React.ReactNode | React.ReactNode[] }) {
	return (
		<div className="secondary-middle-section left-panel
			w-[95%] h-[90vh] overflow-y-scroll
			flex flex-col items-center justify-self-end
			md:w-full
		">
			{children}
		</div>
	)
}

export default function MainLayout() {
	const [openSidebar, setOpenSidebar] = useState<boolean>(false)
	const sidebarRef = useRef<HTMLDivElement | null>(null)
	const hamBurgerMenuRef = useRef<HTMLDivElement | null>(null)

	const FloatingElementsData = useFloatingElementContext()!
	const { 
		floatingOverlay: [openFloatingElement], 
		overlayElements: { 
			postContainer: [openPostContainer, setOpenPostContainer] 
		} 
	} = FloatingElementsData

	useEffect(() => {
		const refs = [sidebarRef, hamBurgerMenuRef]
		function handleClick(e: MouseEvent) {
			if (!openSidebar) return;
			if (refs.some(ref => ref.current?.contains(e.target as Node))) return;
			setOpenSidebar(false)
		}

		document.addEventListener("click", handleClick);
		return () => document.removeEventListener("click", handleClick)
	}, [sidebarRef, hamBurgerMenuRef, openSidebar])


	return (
		<UILayer>
			<MainContainer>
				<LeftPanel open={openSidebar} ref={sidebarRef} />

				<PrimaryMiddleSection>
					<HolderMiddleSection>
						<NavigationPanel hamBurgerMenuRef={hamBurgerMenuRef} sidebar={[openSidebar, setOpenSidebar]} />

						<SecondaryMiddleSection>
							<Outlet />
						</SecondaryMiddleSection>
					</HolderMiddleSection>

					<RightPanel />
				</PrimaryMiddleSection>
			</MainContainer>

			{ openFloatingElement && 
				<FloatingElements>
					{ openPostContainer && 
						<PostSectionProvider>
							<PostContainer setOpen={setOpenPostContainer} />
						</PostSectionProvider> 
					}
				</FloatingElements> 
			}
		</UILayer>
	);
}
