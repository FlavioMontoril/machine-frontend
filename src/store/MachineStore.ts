import { create } from "zustand";
import { TaskResponseDTO } from "../features/task/dto/response-task-dto";
import { TaskModel } from "../features/task/models/task.models";

interface TaskStoreProps {
    list: TaskModel[];
    add: (data: TaskResponseDTO) => void;
    setAll: (data: TaskResponseDTO[] | null) => void;
    deleteTask: (id: string) => void;
    findOne: (id: string) => TaskModel | null;

}

export const useTaskStore = create<TaskStoreProps>((set, get) => {

    const handleAdd = (data: TaskResponseDTO) => {
        const newMachine = TaskModel.build(data);
        set((state) => ({
            list: [...state.list, newMachine],
        }));
    };
    const handleSetAll = (tasks: TaskResponseDTO[] | null) => {
        const tasksAll = tasks ? tasks.map((task) => TaskModel.build(task)) : [];

        set((state) => {
            const newState = { ...state, list: tasksAll }
            return newState;
        })
    };
    const handleDeleteTask = async (id: string) => {
        set((state) => ({
            list: state.list.filter((task) => task.getId() !== id)
        }));
    };

    const handleFindOne = (id: string) => {
        return get().list.find((task) => task.getId() === id) || null
    };

    return {
        list: [],
        add: handleAdd,
        setAll: handleSetAll,
        deleteTask: handleDeleteTask,
        findOne: handleFindOne,
    };
});
