import { TaskProps, TaskStatusProps, TaskTypeProps } from "../types/types";

export class TaskModel {
    private id: string;
    private summary: string;
    private description: string;
    private reporter: string;
    private type: TaskTypeProps;
    private status: TaskStatusProps;
    private assignee?: string;
    private createdAt?: string | Date;

    constructor(data: TaskProps) {
        this.id = data.id;
        this.summary = data.id;
        this.description = data.description;
        this.reporter = data.reporter;
        this.type = data.type;
        this.status = data.status;
        this.assignee = data.assignee || "";
        this.createdAt = data.createdAt || "";
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
    getType(): TaskTypeProps {
        return this.type;
    }
    getStatus(): TaskStatusProps {
        return this.status;
    }
    getAssignee(): string | undefined {
        return this.assignee
    }
    getCreatedAt(): Date | string | undefined {
        return this.createdAt;
    }

}