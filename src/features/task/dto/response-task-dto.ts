import { TaskStatusProps, TaskTypeProps } from "../types/types";

export interface TaskResponseDTO {
    id: string;
    summary: string;
    description: string;
    reporter: string;
    type: TaskTypeProps;
    status: TaskStatusProps;
    assignee?: string;
    createdAt?: string | Date;
}