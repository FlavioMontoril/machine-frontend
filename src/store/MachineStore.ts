import { MachineProps } from "../model/MachineModel";
import { mockApi } from "../services/useApi";
import { create } from "zustand";



interface MachineStoreProps {
    list: MachineProps[];
    add: (data: Omit<MachineProps, "id">) => Promise<void>;
    delete: (id: number) => void;
    findOne: (id: number) => MachineProps | null;
    update: (id: number, data: Partial<MachineProps>) => void;
    setAll: (total: number, machines: MachineProps[] | null) => void;
    total: number;
}

export const useMachineStore = create<MachineStoreProps>((set, get) => {

    const handleAdd = async (data: Omit<MachineProps, "id">) => {
        const response = await mockApi.machine.create(data);

        if (response.success) {
            set((state) => {
                if (state.list.some(machine => machine.id === response.data.id)) {
                    console.error("⚠️ ERRO: Tentativa de adicionar ID duplicado:", response.data.id);
                    return state; // Retorna o estado atual sem modificar nada
                }
                return { list: [...state.list, response.data] };
            });
        }
    };




    const handleDelete = (id: number) => {
        mockApi.machine.delete(id).then((response) => {
            if (response.success) {
                set((state) => ({
                    list: state.list.filter((machine) => machine.id !== id),
                }));
            }
        });
    };

    const handleFindOne = (id: number) => {
        return get().list.find(machine => machine.id === id) || null;
    };

    const handleUpdate = (id: number, data: Partial<MachineProps>) => {
        mockApi.machine.update(id, data).then((response) => {
            if (response.success) {
                set((state) => ({
                    list: state.list.map((machine) =>
                        machine.id === id ? { ...machine, ...response.data } : machine
                    ),
                }));
            }
        });
    };

    const handleSetAll = (total: number, machines: MachineProps[] | null) => {
        set(() => ({
            list: machines ? machines.filter((m, index, self) =>
                index === self.findIndex(t => t.id === m.id)
            ) : [],
            total,
        }));
    };


    return {
        list: [],
        add: handleAdd,
        delete: handleDelete,
        findOne: handleFindOne,
        update: handleUpdate,
        setAll: handleSetAll,
        total: 0,
    };
});
