import { Task } from "@/types/task"
import { create } from "zustand"
import { nanoid } from "nanoid" // Para gerar IDs únicos
import { persist } from "zustand/middleware"

interface TaskStore {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (taskId: string) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { ...task, id: nanoid() }],
        })),
      updateTask: (updatedTask) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          ),
        })),
      deleteTask: (taskId) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== taskId),
        })),
    }),
    {
      name: "task-storage", // Nome da chave no localStorage
    }
  )
)
