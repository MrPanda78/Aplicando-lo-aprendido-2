export type TaskStatus = "P" | "E" | "T" | "C";
export type TaskDifficulty = 1 | 2 | 3;

export interface Task {
    title: string;
    description: string;
    status: TaskStatus;
    difficulty: TaskDifficulty;
    expiration: string;
    creation: string;
    lastEdition: string;
}

export interface TaskOptions {
    addTask(task: Omit<Task, "creation" | "lastEdition">): void;
    searchTask(title: string): Task[];
}