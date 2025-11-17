import { useEffect, useState } from "react";
import PostSection from "./post-section/PostSection";
import FeedSection from "./feed-section/FeedSection";
import { useFloatingElementContext } from "../../../contexts/FloatingElementsContext";

export default function Feed() {
    const { 
		floatingOverlay: [, setOpenFloatingElement], 
		overlayElements: { 
			postContainer: [openPostContainer, setOpenPostContainer] 
		} 
	} = useFloatingElementContext()!


    useEffect(() => {
    	setOpenFloatingElement(openPostContainer)
    }, [openPostContainer, setOpenFloatingElement])

    return (
        <>
            <PostSection onClick={() => setOpenPostContainer(true)} />
            <FeedSection />
        </>
    )
}
