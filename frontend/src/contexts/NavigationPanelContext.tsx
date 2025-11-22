import type { StateController } from "@stypes/global";
import { createContext, useContext, useState } from "react";


type TNavigationElements = {
    mobileLeft?: React.ReactNode,
    right?: React.ReactNode
}
type TNavigationPanelContext = {
    navElements: StateController<TNavigationElements>
}


const NavigationPanelContext = createContext<TNavigationPanelContext | null>(null)

export default function NavigationPanelProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    const [navElements, setNavElements] = useState<TNavigationElements>({})

    return (
        <NavigationPanelContext value={{ navElements: [navElements, setNavElements] }}>
            { children }
        </NavigationPanelContext>
    )
}

export function useNavigationPanelContext() {
    return useContext(NavigationPanelContext)
}
