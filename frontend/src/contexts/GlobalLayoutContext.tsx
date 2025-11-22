import type { StateController } from "@stypes/global";
import { createContext, useContext, useState } from "react";

type TGlobalLayoutContext = {
    sideBar: StateController<boolean>
}


const GlobalLayoutContext = createContext<TGlobalLayoutContext | null>(null)

export default function GlobalLayoutProvider({ children }: { children: React.ReactNode | React.ReactNode[] }) {
    const [openSideBar, setOpenSideBar] = useState<boolean>(false)

    return (
        <GlobalLayoutContext value={{ sideBar: [openSideBar, setOpenSideBar] }}>
            { children }
        </GlobalLayoutContext>
    )
}

export function useGlobalLayoutContext() {
    return useContext(GlobalLayoutContext)
}
