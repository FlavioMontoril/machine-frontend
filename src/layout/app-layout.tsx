import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header";
import { Toaster } from "sonner";

export const AppLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-hidden">
                    <div className="mx-auto py-10">
                        <Outlet />
                    </div>
                </main>
                <div>
                    <Toaster richColors position="top-center" />
                </div>
            </div>
        </div>
    )
}