import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/app-layout";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";

export function AppRoutes() {
    return (
        <Routes>
        <Route element={<AppLayout/>}>
        <Route path="/" element={<Dashboard/>}/>

        </Route>
        <Route path="*" element={<NotFound/>}/>
    </Routes>
    )

}