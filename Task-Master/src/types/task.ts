export type Task = {
    id: number;
    title: string;
    done: boolean;
    description?: string;
    createdAt: Date;
    priority?: string;
    dueDate: Date;
    tag?: string;
  };