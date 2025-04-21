import { create } from "zustand";
import { TaskModel, TaskProps } from "../model/MachineModel";

interface TaskStoreProps {
    list: TaskModel[];
    setAllTasks: (data: TaskProps[] | null) => void;
    addTask: (data: TaskProps) => void;
    updateTask: (id: string, data: TaskProps) => void;
    deleteTask: (id: string) => void;
    findOneTask: (id: string) => TaskModel | null;
}

export const useTaskStore = create<TaskStoreProps>((set, get) => {

    function handleSetAllTasks(tasks: TaskProps[] | null) {
        const taskAll = tasks ? tasks.map((task) => TaskModel.build(task)) : [];
        set(() => ({ list: taskAll }));
    }
    function handleAddTask(data: TaskProps) {
        const newTask = TaskModel.build(data);
        // set((state) => ({ list: [...state.list, newTask] }));
        set((state) => {
            const exists = state.list.some((t) => t.getId() === newTask.getId());
            return { list: exists ? state.list : [...state.list, newTask], };
        });
    }
    function handleUpdateTask(id: string, data: TaskProps) {
        const updateTask = TaskModel.build(data);
        set((state) => ({
            list: state.list.map((task) => task.getId() === id ? updateTask : task),
        }));
    }
    function handleDeleteTask(id: string) {
        set((state) => ({ list: state.list.filter((task) => task.getId() !== id) }));
    }
    function handleFindOneTask(id: string) {
        return get().list.find((task) => task.getId() === id) || null;
    }

    return {
        list: [],
        setAllTasks: handleSetAllTasks,
        addTask: handleAddTask,
        updateTask: handleUpdateTask,
        deleteTask: handleDeleteTask,
        findOneTask: handleFindOneTask,
    };
});