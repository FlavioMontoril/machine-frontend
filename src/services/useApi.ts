import { v4 as uuidv4 } from "uuid";
import { initialItensMachine } from "../mocks/ArrayMachine";
import { MachineProps } from "../model/MachineModel";

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Salvar e carregar os dados no localStorage para persistência
const saveToStorage = () => {
    localStorage.setItem("machinesDB", JSON.stringify(machinesDB));
};

const loadFromStorage = (): MachineProps[] => {
    const storedData = localStorage.getItem("machinesDB");
    return storedData ? JSON.parse(storedData) : [...initialItensMachine];
};

// Carrega os dados do localStorage ao iniciar
let machinesDB: MachineProps[] = loadFromStorage();

export const mockApi = {

    machine: {
        // Função getAll modificada para usar limit e offset
        getAll: async (limit: number = 10, offset: number = 0) => {
            await delay(1000);

            // Retorna uma cópia dos itens para evitar mutação
            const paginatedData = machinesDB.slice(offset, offset + limit);

            return {
                success: true,
                data: paginatedData,
                limit, // Limite de itens
                offset, // Deslocamento
                total: machinesDB.length // Total de itens
            };
        },
        // machine: {
        //     getAll: async () => {
        //         await delay(1000);
        //         return { success: true, data: [...machinesDB] }; // Retorna uma cópia para evitar mutação externa
        //     },

        getById: async (id: string) => {
            await delay(500);
            const machine = machinesDB.find((m) => m.id === id);
            if (!machine) return { success: false, status: 404, error: "Máquina não encontrada" };

            return { success: true, data: machine };
        },

        create: async (data: Omit<MachineProps, "id">) => {
            await delay(500);
            const newMachine: MachineProps = {
                id: uuidv4(), // Agora usando UUID
                ...data,
            };
            machinesDB = [...machinesDB, newMachine]; // Cria uma nova referência para evitar mutação
            saveToStorage(); // Atualiza o localStorage
            return { success: true, data: newMachine };
        },

        update: async (id: string, data: Partial<MachineProps>) => {
            await delay(500);
            const index = machinesDB.findIndex((m) => m.id === id);
            if (index === -1) return { success: false, status: 404, error: "Máquina não encontrada" };

            machinesDB = machinesDB.map((m) => (m.id === id ? { ...m, ...data } : m));
            saveToStorage();
            return { success: true, data: machinesDB[index] };
        },

        delete: async (id: string) => {
            await delay(500);
            const index = machinesDB.findIndex((m) => m.id === id);
            if (index === -1) return { success: false, status: 404, error: "Máquina não encontrada" };

            machinesDB = machinesDB.filter((m) => m.id !== id);
            saveToStorage();
            return { success: true };
        },
    },
};
