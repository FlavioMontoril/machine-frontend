// // export interface FileProps {
// //     name: string;
// //     createdAt: Date;
// // }

// // export interface ManualProps {
// //     id: string;
// //     machineId: number;
// //     description: string;
// //     version: string;
// //     language: string;
// //     file: FileProps;
// //     createdAt: Date; // Adicionado createdAt
// // }

// // export interface CatalogProps {
// //     id: string;
// //     machineId: number;
// //     description: string;
// //     version: string;
// //     language: string;
// //     file: FileProps;
// //     createdAt: Date; // Adicionado createdAt
// // }

// // export interface VersionProps {
// //     version: number;
// //     manuals: ManualProps[];
// //     catalogs: CatalogProps[];
// //     createdAt: Date; // Adicionado createdAt
// //     id: string;
// // }

// // export interface MachineProps {
// //     id: string;
// //     code: string;
// //     description: string;
// //     createdAt?: Date; // Adicionado createdAt
// //     versions?: VersionProps[];
// // }
// export interface GeoProps {
//     lat: string,
//     lng: string,
// }


// export interface AddressProps {
//     street: string,
//     suite: string,
//     city: string,
//     zipcode: string,
//     geo: GeoProps,
// }
// export interface CompanyProps {
//     name: string,
//     catchPhrase: string,
//     bs: string,
// }

// export interface UserProps {
//     readonly id: number,
//     name: string,
//     username: string,
//     email: string,
//     address?: AddressProps;
//     phone: string,
//     website?: string,
//     company?: CompanyProps,
// }

// export class UserModel {
//     private id: number;
//     private name: string;
//     private username: string;
//     private email: string;
//     private address: AddressProps | undefined;
//     private phone: string;
//     private website: string | undefined;
//     private company: CompanyProps | undefined;

//     constructor(data: UserProps) {
//         this.id = data.id;
//         this.name = data.name;
//         this.username = data.username;
//         this.email = data.email;
//         this.address = data.address || undefined;
//         this.phone = data.phone;
//         this.website = data.website || undefined;
//         this.company = data.company || undefined;
//     }

//     static formData(data: UserProps): UserModel {
//         return new UserModel(data)
//     }

//     getId(): number {
//         return this.id;
//     }
//     getName(): string {
//         return this.name;
//     }
//     getUsername(): string {
//         return this.username;
//     }
//     getEmail(): string {
//         return this.email;
//     }
//     getAddress(): AddressProps | undefined {
//         return this.address;
//     }
//     getPhone(): string {
//         return this.phone;
//     }
//     getWebsite(): string | undefined {
//         return this.website;
//     }
//     getCompany(): CompanyProps | undefined {
//         return this.company;
//     }
// }

export enum TypeProps {
    TASK = "TASK",
    BUG = "BUG",
    EPIC = "EPIC",
    SUB_TASK = "SUB_TASK",
}
export enum TaskStatus {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    UNDER_REVIEW = "UNDER_REVIEW",
    DONE = "DONE",
}

export interface TaskProps {
    readonly id: string;
    summary: string;
    description: string;
    reporter: string;
    type: TypeProps;
    status: TaskStatus;
    assignee?: string;
    createdAt?: Date;
}

export class TaskModel {
    private id: string;
    private summary: string;
    private description: string;
    private reporter: string;
    private type: TypeProps;
    private status: TaskStatus;
    private assignee?: string;
    private createdAt: Date;

    constructor(data: TaskProps) {
        this.id = data.id;
        this.summary = data.summary;
        this.description = data.description;
        this.reporter = data.reporter;
        this.type = data.type;
        this.status = data.status;
        this.assignee = data.assignee || "";
        this.createdAt = data.createdAt
            ? new Date(data.createdAt)  // converter string → Date
            : new Date();
    }

    static build(data: TaskProps): TaskModel {
        return new TaskModel(data);
    }

    getId(): string {
        return this.id;
    }
    getSummary(): string {
        return this.summary;
    }
    getDescription(): string {
        return this.description;
    }
    getReporter(): string {
        return this.reporter;
    }
    getType(): TypeProps {
        return this.type;
    }
    getStatus(): TaskStatus {
        return this.status;
    }
    getAssignee(): string | undefined {
        return this.assignee;
    }
    getCreatedAt(): Date {
        return this.createdAt;
    }


}