import type { StateController } from "@stypes/global";
import { createContext, useContext, useState } from "react";

type TFloatingElementContext = {
    floatingOverlay: StateController<boolean>,
    overlayElements: {
        postContainer: StateController<boolean>
    }
}

const FloatingElementContext = createContext<TFloatingElementContext | null>(null)

export default function FloatingElementsProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    const [showFloatingElement, setShowFloatingElement] = useState<boolean>(false)
	const [openPostContainer, setOpenPostContainer] = useState<boolean>(false)

    return (
        <FloatingElementContext value={{
            floatingOverlay: [showFloatingElement, setShowFloatingElement],
            overlayElements: {
                postContainer: [openPostContainer, setOpenPostContainer]
            }
        }}>
            { children }
        </FloatingElementContext>
    )
}

export function useFloatingElementContext() {
    return useContext(FloatingElementContext)
}
