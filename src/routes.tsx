import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/app-layout";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Documents } from "./pages/Documents";
import { CreateTask } from "./pages/MachineCreate";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/machine-create" element={<CreateTask />} />
                <Route path="/documents" element={<Documents />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )

}