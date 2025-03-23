import React from "react";
import { Outlet } from "react-router-dom";

export const AppLayout: React.FC = () => {
    return (
        <div>
            <h3>Hello</h3>

            <main>
                <Outlet />
            </main>
        </div>
    )
}