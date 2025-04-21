import { useCallback, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { MoreVertical, SquarePen } from "lucide-react";
import { ConfirmDialog } from "./ConfirmDialog";

interface TaskActionsProps {
    actionId: string;
}

export const TaskAction: React.FC<TaskActionsProps> = ({ actionId }) => {

    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


    const handleEditMachine = useCallback(() => {
        if (actionId) {
            navigate(`/task-update/${actionId}`)
            setIsMenuOpen(false)
        }
    }, [actionId])

    return (
        <div className="cursor-pointer">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>

                <DropdownMenuTrigger asChild>
                    <div>
                        <span className="sr-only">Abrir menu</span>
                        <MoreVertical color="gray" size={14} aria-label="Abrir menu de opções" />
                    </div>
                </DropdownMenuTrigger>

                <DropdownMenuContent className="w-[160px] mt-2 ml-40">
                    <DropdownMenuItem onClick={() => handleEditMachine()} aria-label="Editar máquina">
                        <SquarePen className="mr-2 h-4 w-4" />
                        <span>Editar</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />

                    <ConfirmDialog idDialog={actionId} />

                </DropdownMenuContent>

            </DropdownMenu>
        </div>
    )
};
