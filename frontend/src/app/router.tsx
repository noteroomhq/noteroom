import IndexPage from "../features/index-page/components";
import Feed from "../features/feed/components";
import {Signup, Login, ForgotPassword} from "../features/auth/components/index";
import { Route, Routes } from "react-router-dom";

export default function AppRouters() {
    return (
        <>
            <Routes>
                <Route path="/" element={ <IndexPage /> } ></Route>
                <Route path="/feed" element={ <Feed /> }></Route>
                <Route path="/signup" element={ <Signup /> }></Route>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/forgot-password" element={ <ForgotPassword /> }></Route>
            </Routes>
        </>
    )
}