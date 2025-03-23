import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar/Sidebar";
import { Header } from "./header";

export const AppLayout: React.FC = () => {
    return (
        <div className="flex h-screen bg-gray-100 overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 overflow-hidden">
                    <div className="mx-auto pl-64 py-16">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    )
}