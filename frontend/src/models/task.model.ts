import type { PriorityEnum } from "./priority.enum";

export type TaskModel = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: PriorityEnum;
};
