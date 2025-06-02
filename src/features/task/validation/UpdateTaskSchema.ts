import { z } from "zod";
import { TaskStatusProps, TaskTypeProps } from "../types/types";

export const updateTaskSchema = z.object({
    summary: z.string().nonempty({ message: "Summary é obrigatório" }),
    description: z.string().min(5, { message: "Mínimo de 5 caracteres para description" }),
    reporter: z.string().nonempty({ message: "Summary é obrigatório" }),
    type: z.nativeEnum(TaskTypeProps),
    status: z.nativeEnum(TaskStatusProps),
    assignee: z.string().optional()
});

export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>;