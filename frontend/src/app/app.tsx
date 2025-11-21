import GlobalWindowDataProvider from "../contexts/GlobalWindowData";
import AppRouters from "./router";

export default function App() {
    return (
        <>
            <GlobalWindowDataProvider>
                <AppRouters />
            </GlobalWindowDataProvider>
        </>
    )
}