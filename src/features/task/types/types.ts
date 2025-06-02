export enum TaskStatusProps {
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    UNDER_REVIEW = "UNDER_REVIEW",
    DONE = "DONE"
}

export enum TaskTypeProps {
    TASK = "TASK",
    BUG = "BUG",
    EPIC = "EPIC",
    SUB_TASK = "SUB_TASK"
}

export interface TaskProps {
    readonly id: string;
    summary: string;
    description: string;
    reporter: string;
    type: TaskTypeProps;
    status: TaskStatusProps;
    assignee?: string;
    createdAt?: string | Date;
}