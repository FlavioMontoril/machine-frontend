export interface ManualProps {
    id: string;
    machineId: number;
    description: string;
    version: string;
    language: string;
    file: string;
}

export interface CatalogProps {
    id: string;
    machineId: number;
    description: string;
    version: string;
    language: string;
    file: string;
}

export interface VersionProps {
    version: number;
    manuals: ManualProps[];
    catalogs: CatalogProps[];
}

export interface MachineProps {
    id: number;
    code: string;
    description: string;
    versions?: VersionProps[]; // Agora é opcional
}
