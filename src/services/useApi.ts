import axios from "axios";
import { TaskResponseDTO } from "../features/task/dto/response-task-dto";
import { CreateTaskDto } from "../features/task/dto/create-task-dto";

const HOST = import.meta.env.VITE_HOST;
const PORT = import.meta.env.VITE_PORT;

const api = axios.create({
    baseURL: `http://${HOST}:${PORT}`,
});

export const useApi = () => {
    return {
        task: {
            getAllTasks: async () => {

                try {
                    const { status, data } = await api.get<TaskResponseDTO[]>("/v1/tasks")
                    return { status, data };
                } catch (error: any) {
                    throw new Error(`Não foi possivel buscar tarefas:${error.message}`);
                }
            },
            createTask: async (data: CreateTaskDto) => {
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
                    // const { status } = await api.delete(id);
                    return { status };
                } catch (error: any) {
                    throw new Error(`Não foi possivel localizar máquina:${error.message}`);
                }
            },
        },
    };
};