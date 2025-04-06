// import { MachineProps } from "../model/MachineModel";

// export const initialItensMachine: MachineProps[] = [
//     {
//         id: 1,
//         code: "MACH-001",
//         description: "Máquina de Corte",
//         versions: [
//             {
//                 version: 1,
//                 manuals: [
//                     { id: "101", machineId: 1, description: "Manual de Operação", version: "1.0", language: "PT-BR", file: "manual_operacao_v1.pdf" },
//                     { id: "102", machineId: 1, description: "Guia de Manutenção", version: "1.0", language: "PT-BR", file: "guia_manutencao_v1.pdf" }
//                 ],
//                 catalogs: [
//                     { id: "201", machineId: 1, description: "Catálogo de Peças", version: "1.0", language: "PT-BR", file: "catalogo_pecas_v1.pdf" },
//                     { id: "202", machineId: 1, description: "Especificações Técnicas", version: "1.0", language: "PT-BR", file: "especificacoes_v1.pdf" }
//                 ]
//             },
//             {
//                 version: 2,
//                 manuals: [
//                     { id: "103", machineId: 1, description: "Manual de Operação", version: "2.0", language: "EN", file: "manual_operacao_v2.pdf" }
//                 ],
//                 catalogs: [
//                     { id: "203", machineId: 1, description: "Catálogo de Peças", version: "2.0", language: "EN", file: "catalogo_pecas_v2.pdf" }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 2,
//         code: "MACH-002",
//         description: "Máquina de Solda",
//         versions: [
//             {
//                 version: 1,
//                 manuals: [
//                     { id: "104", machineId: 2, description: "Manual de Segurança", version: "1.0", language: "PT-BR", file: "manual_seguranca_v1.pdf" }
//                 ],
//                 catalogs: [
//                     { id: "204", machineId: 2, description: "Catálogo de Componentes", version: "1.0", language: "PT-BR", file: "catalogo_componentes_v1.pdf" }
//                 ]
//             }
//         ]
//     },
//     {
//         id: 3,
//         code: "MACH-003",
//         description: "Máquina de Impressão 3D",
//         versions: [
//             {
//                 version: 1,
//                 manuals: [
//                     { id: "105", machineId: 3, description: "Guia de Instalação", version: "1.0", language: "EN", file: "guia_instalacao_v1.pdf" },
//                     { id: "106", machineId: 3, description: "Manual de Usuário", version: "1.0", language: "EN", file: "manual_usuario_v1.pdf" }
//                 ],
//                 catalogs: [
//                     { id: "205", machineId: 3, description: "Lista de Materiais", version: "1.0", language: "EN", file: "lista_materiais_v1.pdf" }
//                 ]
//             }
//         ]
//     }
// ];


import { v4 as uuidv4 } from "uuid";
import { MachineProps } from "../model/MachineModel";

const getRandomDate = (): string => {
    const start = new Date(2020, 0, 1);
    const end = new Date();
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
};

const generateMockData = (): MachineProps[] => {
    const machines: MachineProps[] = [];

    for (let i = 1; i <= 50; i++) {
        const versions = Array.from({ length: Math.floor(Math.random() * 3) + 2 }, (_, vIndex) => ({
            version: vIndex + 1,
            createdAt: getRandomDate(),
            id: uuidv4(),
            manuals: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, mIndex) => ({
                id: uuidv4(),
                machineId: i,
                description: `Manual de Operação V${vIndex + 1}.${mIndex + 1}`,
                version: `${vIndex + 1}.${mIndex + 1}`,
                language: "PT-BR",
                file: {  // Agora file é um objeto
                    name: `manual_operacao_v${vIndex + 1}_${mIndex + 1}.pdf`,
                    createdAt: getRandomDate(),
                },
                createdAt: getRandomDate(),
            })),
            catalogs: Array.from({ length: Math.floor(Math.random() * 3) + 1 }, (_, cIndex) => ({
                id: uuidv4(),
                machineId: i,
                description: `Catálogo de Peças V${vIndex + 1}.${cIndex + 1}`,
                version: `${vIndex + 1}.${cIndex + 1}`,
                language: "PT-BR",
                file: {  // Agora file é um objeto
                    name: `catalogo_pecas_v${vIndex + 1}_${cIndex + 1}.pdf`,
                    createdAt: getRandomDate(),
                },
                createdAt: getRandomDate(),
            })),
        }));

        machines.push({
            id: uuidv4(),
            code: `MACH-${String(i).padStart(3, '0')}`,
            description: `Máquina ${i}`,
            createdAt: getRandomDate(),
            versions,
        });
    }

    return machines;
};

export const initialItensMachine: MachineProps[] = generateMockData();

