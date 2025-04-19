import { create } from "zustand";
import { TaskModel, TaskProps } from "../model/MachineModel";

interface MachineStoreProps {
    list: TaskModel[];
    add: (data: TaskProps) => Promise<void>;
    setAll: (data: TaskProps[] | null) => void
    deleteTask: (id: string) => Promise<void>;
    findOne: (id: string) => TaskModel | null;

}

export const useMachineStore = create<MachineStoreProps>((set, get) => {

    const handleAdd = async (data: TaskProps) => {
        const newMachine = TaskModel.build(data);
        set((state) => ({
            list: [...state.list, newMachine],
        }));
    };
    const handleSetAll = (tasks: TaskProps[] | null) => {
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
