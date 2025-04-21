import axios from "axios";
import { TaskProps } from "../model/MachineModel";

const HOST = import.meta.env.VITE_HOST;
const PORT = import.meta.env.VITE_PORT;

const api = axios.create({
    baseURL: `http://${HOST}:${PORT}`,
});

interface PaginationTaskProps {
    limit?: number;
    offset?: number;
}

type createTaskProps = Omit<TaskProps, "id" | "createdAt">;
type updateTaskProps = Omit<TaskProps, "id" | "createdAt">;

export const useApi = () => {
    return {
        task: {
            getAllTasks: async ({ limit, offset }: PaginationTaskProps = {}) => {

                try {
                    const { status, data } = await api.get("/v1/tasks", {
                        params: limit !== undefined ? { limit, offset } : {}
                    });
                    return { status, data };
                } catch (error: any) {
                    throw new Error(`Não foi possivel buscar tarefas:${error.message}`);
                }
            },
            createTask: async (data: createTaskProps) => {
                try {
                    const { status, data: createdData } = await api.post("/v1/tasks", data);
                    return { status, data: createdData };
                } catch (error: any) {
                    throw new Error(`Não foi possivel criar máquinas:${error.message}`);
                }
            },
            deleteTask: async (id: string) => {
                try {
                    const { status } = await api.delete(`/v1/tasks/${id}`);
                    return { status };
                } catch (error: any) {
                    throw new Error(`Não foi possivel localizar máquina:${error.message}`);
                }
            },

            findOne: async (id: string) => {
                try {
                    const { status, data } = await api.get(`/v1/tasks/${id}`);
                    return { status, data };
                } catch (error: any) {
                    throw new Error(`Não foi possivel localizar máquina:${id}-${error.message}`);
                }
            },

            updateTask: async (id: string, data: updateTaskProps) => {
                try {
                    const { status, data: updateTask } = await api.put(`/v1/tasks/${id}`, data);
                    return { status, data: updateTask };
                } catch (error: any) {
                    throw new Error(`Não foi possivel editar task:${id}-${error.meta}`);
                }
            },
        },
    };
};