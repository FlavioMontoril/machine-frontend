export interface FileProps {
    name: string;
    createdAt: string;
}

export interface ManualProps {
    id: string;
    machineId: number;
    description: string;
    version: string;
    language: string;
    file: FileProps;
    createdAt: string; // Adicionado createdAt
}

export interface CatalogProps {
    id: string;
    machineId: number;
    description: string;
    version: string;
    language: string;
    file: FileProps;
    createdAt: string; // Adicionado createdAt
}

export interface VersionProps {
    version: number;
    manuals: ManualProps[];
    catalogs: CatalogProps[];
    createdAt: string; // Adicionado createdAt
    id: string;
}

export interface MachineProps {
    id: string;
    code: string;
    description: string;
    createdAt?: string; // Adicionado createdAt
    versions?: VersionProps[];
}
