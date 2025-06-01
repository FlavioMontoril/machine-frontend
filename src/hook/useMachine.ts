import { useEffect, useMemo, useState } from "react";
import { useApi } from "../services/useApi";
import { useTaskStore } from "../store/TaskStore";
import dayjs from "dayjs";

export function useMachines() {
    const [dateTask, setDateTask] = useState<Date[] | undefined>(undefined);
    const [searchTask, setSearchTask] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const { task } = useApi();
    const { setAllTasks, list } = useTaskStore();

    const limit = 10;
    const offset = (currentPage - 1) * limit;

    useEffect(() => {
        async function fetchMachine() {
            try {
                const { status, data } = await task.getAllTasks();
                if (status === 200) setAllTasks(data);
            } catch (error) {
                console.error("Não foi possível buscar usuários");
            }
        }
        fetchMachine();
    }, []);

    const filteredTasks = useMemo(() => {
        const formattedDates = dateTask?.map((d) => dayjs(d).format("DD-MM-YYYY")) ?? [];
        const searchTerm = searchTask.trim().toLowerCase();
        const sortedTasks = [...list].sort((a, b) =>
            new Date(b.getCreatedAt()).getTime() - new Date(a.getCreatedAt()).getTime()
        );

        if (searchTerm.length > 3) {
            return sortedTasks.filter((task) =>
                task.getSummary().toLowerCase().includes(searchTerm) ||
                task.getDescription().toLowerCase().includes(searchTerm)
            );
        }

        if (dateTask) {
            return sortedTasks.filter((task) =>
                formattedDates.includes(dayjs(task.getCreatedAt()).format("DD-MM-YYYY"))
            );
        }

        return sortedTasks;
    }, [list, searchTask, dateTask]);

    const pagesCount = Math.ceil(filteredTasks.length / limit);
    const currentTasksPage = filteredTasks.slice(offset, offset + limit);
    const firstMachineIndex = offset + 1;
    const lastMachineIndex = Math.min(currentPage * limit, filteredTasks.length);

    return {
        dateTask,
        setDateTask,
        searchTask,
        setSearchTask,
        currentPage,
        setCurrentPage,
        filteredTasks,
        currentTasksPage,
        pagesCount,
        firstMachineIndex,
        lastMachineIndex,
    };
}
