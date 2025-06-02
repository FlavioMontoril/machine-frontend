import { TaskTypeProps } from "../types/types";

export interface CreateTaskDto {
    summary: string;
    description: string;
    reporter: string;
    type: TaskTypeProps;
    assignee?: string | undefined;
}