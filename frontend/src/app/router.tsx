import Feed from "../features/feed/components";
import {Signup, Login, ForgotPassword} from "../features/auth/components/index";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import FloatingElementsProvider from "../contexts/FloatingElementsContext";
import PostView from "../features/post-view/components";
import MobilePostSection from "../features/feed/components/post-section/MobilePostSection";
import GlobalLayoutProvider from "@contexts/GlobalLayoutContext";

export default function AppRouters() {
    return (
        <>
            <Routes>
                <Route element={
                    <FloatingElementsProvider>
                        <GlobalLayoutProvider>
                            <MainLayout />
                        </GlobalLayoutProvider>
                    </FloatingElementsProvider>
                }>
                    <Route path="/" element={<Feed />} />
                    <Route path="/post" element={<PostView />} />
                    <Route path="/post/create" element={<MobilePostSection />} />
                </Route>

                <Route path="/signup" element={ <Signup /> }></Route>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/forgot-password" element={ <ForgotPassword /> }></Route>
            </Routes>
        </>
    )
}