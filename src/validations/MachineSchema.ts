import { z } from "zod";
export const machineSchema = z.object({
    code: z.string().min(1, { message: "O código é obrigatório." }),
    description: z.string().min(5, { message: "A descrição deve ter pelo menos 5 caracteres." }),
    version: z.string().min(1, { message: "A versãp deve ter pelo menos 1 caractere." }).optional(),
})

export type MachineSchema = z.infer<typeof machineSchema>;