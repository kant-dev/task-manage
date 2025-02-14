
export type Task = {
  id: string; // Adicionando o ID
  title: string;
  description: string;
  dueDate: Date;
  priority: "Low" | "Medium" | "High";
  completed: "To Do" | "In Progress" | "Completed";
};
