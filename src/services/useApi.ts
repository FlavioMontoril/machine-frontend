import { initialItensMachine } from "../mocks/ArrayMachine";
import { MachineProps } from "../model/MachineModel";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulando um "banco de dados" em memória
let machinesDB: MachineProps[] = [...initialItensMachine];

// Função para gerar um novo ID baseado no maior ID existente
const generateId = (): number => {
    const existingIds = new Set(machinesDB.map(m => m.id));
    let newId = Math.max(0, ...existingIds) + 1;

    while (existingIds.has(newId)) {
        newId++; // Garante que o novo ID nunca esteja em uso
    }

    return newId;
};



export const mockApi = {
    machine: {
        getAll: async () => {
            await delay(1000);
            return { success: true, data: [...machinesDB] }; // Retorna uma cópia para evitar mutação externa
        },

        getById: async (id: number) => {
            await delay(500);
            const machine = machinesDB.find((m) => m.id === id);
            return machine ? { success: true, data: machine } : { success: false, error: "Máquina não encontrada" };
        },

        create: async (data: Omit<MachineProps, "id">) => {
            await delay(500);
            const newMachine: MachineProps = {
                id: generateId(), // Gera ID automático
                ...data,
            };
            machinesDB.push(newMachine);
            return { success: true, data: newMachine };
        },

        update: async (id: number, data: Partial<MachineProps>) => {
            await delay(500);
            const index = machinesDB.findIndex((m) => m.id === id);
            if (index === -1) return { success: false, error: "Máquina não encontrada" };

            machinesDB[index] = { ...machinesDB[index], ...data };
            return { success: true, data: machinesDB[index] };
        },

        delete: async (id: number) => {
            await delay(500);
            const index = machinesDB.findIndex((m) => m.id === id);
            if (index === -1) return { success: false, error: "Máquina não encontrada" };

            machinesDB = machinesDB.filter((m) => m.id !== id); // Remove sem mutar o array original
            return { success: true };
        },
    },
};
