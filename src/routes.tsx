import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./layout/app-layout";
import { Dashboard } from "./pages/Dashboard";
import { NotFound } from "./pages/NotFound";
import { Documents } from "./pages/Documents";
import { CreateTask } from "./pages/MachineCreate";
import { EditTask } from "./pages/EditTask";

export function AppRoutes() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/task-create" element={<CreateTask />} />
                <Route path="/task-update/:id" element={<EditTask />} />
                <Route path="/documents" element={<Documents />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    )

}