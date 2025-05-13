import { useCallback, useEffect, useState } from "react"
import { EditTaskForm } from "../commom/EditTaskForm"
import { useParams } from "react-router-dom"
import { useApi } from "../services/useApi"
import { useTaskStore } from "../store/TaskStore"
import { toast } from "sonner"

export const EditTask: React.FC = () => {

    const [dataTask, setDataTask] = useState<any | null>(null)
    const { task } = useApi();
    const { list } = useTaskStore();
    const { id } = useParams();
    const loading = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 1000));

    const fetchOneTask = useCallback(async (id: string) => {

        try {
            const { data } = await task.findOne(id);
            setDataTask(data)
        } catch (error: any) {
            toast.error("Não foi possivel buscar dados");

        }
    }, [id]);

    useEffect(() => {
        if (id) {
            const hasTask = list.find((task) => task.getId() === id);
            if (hasTask) {
                setDataTask(hasTask);
            } else {
                fetchOneTask(id);
            }
        }
    }, [id]);

    if (!id || !dataTask) return

    toast.promise(loading, { loading: 'Loading...', });

    return <EditTaskForm data={dataTask} />;
}