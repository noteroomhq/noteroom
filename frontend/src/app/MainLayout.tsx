import { useRef } from "react"
import LeftPanel from "../components/LeftPanel"
import NavigationPanel from "../components/NavigationPanel"
import RightPanel from "../components/RightPanel"
import FloatingElements from "../components/FloatingElements"
import { Outlet } from "react-router-dom"
import PostContainer from "../features/feed/components/post-section/PostContainer"
import { useFloatingElementContext } from "../contexts/FloatingElementsContext"
import NavigationPanelProvider from "../contexts/NavigationPanelContext"
import { useGlobalLayoutContext } from "@contexts/GlobalLayoutContext"
import Backdrop from "@components/Backdrop"


function MainContainer({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    return (
        <div className="main-container
            relative
            bg-(--leftpanel-maincontainer-clr)
            h-screen overflow-hidden w-full
            grid grid-cols-1
            xl:grid-cols-[1.2fr_6fr]
            desktop:grid-cols-[0.9fr_5fr]
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
			xl:h-[98.5%] xl:w-[99.5%] xl:self-end xl:grid-cols-[4fr_1fr] xl:rounded-[50px_0_0_0]
		">
			{children}
		</div>
	)
}
function HolderMiddleSection({ children }: { children: React.ReactNode | React.ReactNode[] }) {
	return (
		<div className="holder-middle-section
			flex flex-col items-center justify-self-center w-full
			xl:w-[60%]
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
			sm:w-[60%]
			md:w-[60%]
			lg:w-[50%]
			xl:w-full
		">
			{children}
		</div>
	)
}

export default function MainLayout() {
	const { sideBar: [openSidebar, setOpenSidebar] } = useGlobalLayoutContext()!

	const FloatingElementsData = useFloatingElementContext()!
	const {
		floatingOverlay: [openFloatingElement],
		overlayElements: {
			postContainer: [openPostContainer, setOpenPostContainer]
		}
	} = FloatingElementsData


	return (
		<UILayer>
			<MainContainer>
				<LeftPanel open={openSidebar} />

				{openSidebar && <Backdrop zIndex={30} onClick={() => setOpenSidebar(false)} /> }

				<PrimaryMiddleSection>
					<NavigationPanelProvider>
						<HolderMiddleSection>
							<NavigationPanel />

							<SecondaryMiddleSection>
								<Outlet />
							</SecondaryMiddleSection>
						</HolderMiddleSection>
					</NavigationPanelProvider>

					<RightPanel />
				</PrimaryMiddleSection>
			</MainContainer>

			{ openFloatingElement &&
				<FloatingElements>
					{ openPostContainer && <PostContainer setOpen={setOpenPostContainer} /> }
				</FloatingElements>
			}
		</UILayer>
	);
}
