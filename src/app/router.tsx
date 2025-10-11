import IndexPage from "../features/index-page/components";
import Feed from "../features/feed/components";
import { Route, Routes } from "react-router-dom";

export default function AppRouters() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <IndexPage /> } ></Route>
                <Route path="/feed" element={ <Feed /> }></Route>
            </Routes>
        </>
    )
}