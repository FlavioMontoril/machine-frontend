// import { z } from "zod";
// export const machineSchema = z.object({
//     code: z.string().min(1, { message: "O código é obrigatório." }),
//     description: z.string().min(5, { message: "A descrição deve ter pelo menos 5 caracteres." }),
//     version: z.string().min(1, { message: "A versãp deve ter pelo menos 1 caractere." }).optional(),
// })

// export type MachineSchema = z.infer<typeof machineSchema>;

// import { z } from "zod";
// import { TaskStatus, TypeProps } from "../model/MachineModel";

// export const taskSchema = z.object({
//     summary: z.string().min(1, { message: "O resumo é obrigatório." }),
//     description: z
//         .string()
//         .min(5, { message: "A descrição deve ter pelo menos 5 caracteres." }),
//     reporter: z.string().min(1, { message: "O repórter é obrigatório." }),
//     type: z.nativeEnum(TypeProps, {
//         errorMap: () => ({ message: "Tipo de tarefa inválido." }),
//     }),
//     status: z.nativeEnum(TaskStatus).default(TaskStatus.OPEN),
//     assignee: z
//         .string()
//         .min(1, { message: "O responsável deve ser ao menos 1 caractere." })
//         .optional(),
// });

// export type TaskSchema = z.infer<typeof taskSchema>;
