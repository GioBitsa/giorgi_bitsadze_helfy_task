type taskModel = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
  priority: "low" | "medium" | "high";
};

export default taskModel;
