import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/app-layout";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { CreateMachine } from "./pages/MachineCreate";
import { Documents } from "./pages/Documents";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/machine-create" element={<CreateMachine />} />
                <Route path="/documents" element={<Documents />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )

}