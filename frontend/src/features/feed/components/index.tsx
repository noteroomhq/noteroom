import { useEffect, useState } from "react";
import PostSection from "./post-section/PostSection";
import FeedSection from "./feed-section/FeedSection";
import { useFloatingElementContext } from "../../../contexts/FloatingElementsContext";
import { useNavigate } from "react-router-dom";
import { useGlobalWindowDataContext } from "../../../contexts/GlobalWindowData";

export default function Feed() {
    const navigate = useNavigate()
    const { windowSize: { width: windowWidth } } = useGlobalWindowDataContext()!

    const { 
		floatingOverlay: [, setOpenFloatingElement], 
		overlayElements: { 
			postContainer: [openPostContainer, setOpenPostContainer] 
		} 
	} = useFloatingElementContext()!

    function handleOpenPostContainer() {
        if (windowWidth > 1024) {
            setOpenPostContainer(true)
        } else {
            navigate("/post/create")
        }
    }

    useEffect(() => {
    	setOpenFloatingElement(openPostContainer)
    }, [openPostContainer, setOpenFloatingElement])

    return (
        <>
            <PostSection onClick={handleOpenPostContainer} />
            <FeedSection />
        </>
    )
}
