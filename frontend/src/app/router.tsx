import Feed from "../features/feed/components";
import {Signup, Login, ForgotPassword} from "../features/auth/components/index";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import FloatingElementsProvider from "../contexts/FloatingElementsContext";

export default function AppRouters() {
    return (
        <>
            <Routes>
                <Route element={
                    <FloatingElementsProvider>
                        <MainLayout />
                    </FloatingElementsProvider>
                }>
                    <Route path="/" element={<Feed />} />
                </Route>

                <Route path="/signup" element={ <Signup /> }></Route>
                <Route path="/login" element={ <Login /> }></Route>
                <Route path="/forgot-password" element={ <ForgotPassword /> }></Route>
            </Routes>
        </>
    )
}