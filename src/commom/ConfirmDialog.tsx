import { Trash2, AlertTriangle, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { useTaskStore } from "../store/TaskStore";
import { useApi } from "../services/useApi";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";

interface TaskDialogProps {
    idDialog: string;
}

export const ConfirmDialog: React.FC<TaskDialogProps> = ({ idDialog }) => {

    const { task: taskApi } = useApi();
    const { deleteTask: deleteTaskStore, list } = useTaskStore();

    const taskToDelete = list.find((t) => t.getId() === idDialog);

    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    async function handleDeleteTask(taskId: string) {
        setIsDeleting(true);
        try {
            const { status } = await taskApi.deleteTask(taskId);
            if (status === 200 || status === 204) {
                deleteTaskStore(taskId);
                setIsOpen(false);
                toast.success("Tarefa excluída com sucesso!");
            }
        } catch (err: any) {
            toast.error(`Não foi possível deletar a task: ${err.message}`);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 w-full pr-16 rounded-sm"
                >
                    <Trash2 />
                    <span className="text-sm font-normal pr-2">Excluir</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-red-600 flex items-center">
                        <AlertTriangle className="mr-2 h-5 w-5" />
                        Confirmar exclusão
                    </DialogTitle>
                    <DialogDescription>
                        Tem certeza que deseja excluir a tarefa{" "}
                        <span className="font-semibold">
                            {taskToDelete?.getSummary() ?? idDialog}
                        </span>
                        ? Esta ação não pode ser desfeita.
                    </DialogDescription>
                </DialogHeader>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => setIsOpen(false)}
                        disabled={isDeleting}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => taskToDelete && handleDeleteTask(idDialog)}
                        disabled={!taskToDelete || isDeleting}
                        className="bg-red-600 hover:bg-red-700"
                    >
                        {isDeleting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Excluindo...
                            </>
                        ) : (
                            "Excluir"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
