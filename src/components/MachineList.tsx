import { useEffect } from "react";
import { useMachineStore } from "../store/MachineStore";
import { ScrollArea } from "./ui/scroll-area";
import { mockApi } from "../services/useApi";

export const MachineList1: React.FC = () => {
    const { list, setAll } = useMachineStore(); // Acessa Zustand

    useEffect(() => {
        async function fetchMachines() {
            const response = await mockApi.machine.getAll();
            if (response.success) {
                setAll(response.data.length, response.data);
            }
        }
        fetchMachines();
    }, []);


    console.log("Máquinas renderizadas:", list);
    return (
        <ScrollArea className="w-full pr-4 h-[590px] rounded-md">
            <h2>Lista de Máquinas</h2>
            {list.length === 0 ? (
                <p>Carregando...</p>
            ) : (
                <ul>
                    {list.map((machine, index) => (
                        <li key={machine.id || `machine-${index}`}>
                            <strong>{machine.code}</strong> - {machine.description}
                            <ul>
                                {machine.versions?.map((version) => (
                                    <li key={version.version}>
                                        <strong>Versão {version.version}</strong>
                                        <ul>
                                            <li>
                                                <strong>Manuais:</strong>
                                                <ul>
                                                    {version.manuals.map((manual) => (
                                                        <li key={manual.id}>
                                                            📖 {manual.description} ({manual.language}) - {manual.file}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                            <li>
                                                <strong>Catálogos:</strong>
                                                <ul>
                                                    {version.catalogs.map((catalog) => (
                                                        <li key={catalog.id}>
                                                            📂 {catalog.description} ({catalog.language}) - {catalog.file}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </li>
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </ScrollArea>
    );
};
