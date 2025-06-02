import { z } from "zod";
import { TaskTypeProps } from "../types/types";

export const createTaskSchema = z.object({
    summary: z.string().nonempty({ message: "Summary é obrigatório" }),
    description: z.string().min(5, { message: "Mínimo de 5 caracteres para description" }),
    reporter: z.string().nonempty({ message: "Summary é obrigatório" }),
    type: z.nativeEnum(TaskTypeProps),
    assignee: z.string().optional()
});

export type CreateTaskSchema = z.infer<typeof createTaskSchema>;