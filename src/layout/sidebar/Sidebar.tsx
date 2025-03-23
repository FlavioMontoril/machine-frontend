import { ElementType } from "react"
import { LuFileText, LuHouse, LuSettings } from "react-icons/lu";
import { SideLink } from "./SideLink";

interface SidebarOptions { id: string, to: string, icon: ElementType, text: string }

export const Sidebar: React.FC = () => {

    const sideOptions: SidebarOptions[] = [
        { id: "dashboard", to: "/", icon: LuHouse, text: "Dashboard" },
        { id: "documents", to: "/documents", icon: LuFileText, text: "Documents" },
        { id: "createMachine", to: "/machine-create", icon: LuSettings, text: "MachineCreate" },
    ]

    return (

        <div className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">

            <nav>
                {sideOptions.map((option) =>
                    <SideLink
                        key={option.id}
                        to={option.to}
                        icon={option.icon}
                        text={option.text}
                    />
                )}
            </nav>
        </div>

    )
}