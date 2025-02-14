'use client'

import { Button } from '@/components/ui/button'
import { useTaskStore } from '@/store/task-store'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function TasksPanel() {
  const router = useRouter()
  const handleBack = () => router.back()

  const myTasks = useTaskStore((state) => state.tasks)
  const deleteTask = useTaskStore((state) => state.deleteTask)
  const updateTask = useTaskStore((state) => state.updateTask)

  const handleToggleStatus = (task: typeof myTasks[number]) => {
    let newStatus: "To Do" | "In Progress" | "Completed";
  
    if (task.completed === "To Do") {
      newStatus = "In Progress";
    } else if (task.completed === "In Progress") {
      newStatus = "Completed";
    } else {
      newStatus = "To Do";
    }
  
    updateTask({ ...task, completed: newStatus });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Painel Tasks</h2>
        <Button onClick={handleBack}>Voltar</Button>
      </div>

      {myTasks.length === 0 ? (
        <p className="text-gray-500">Nenhuma task encontrada.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myTasks.map((task) => (
            <div
              key={task.id}
              className="p-4 border rounded shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <span className="text-sm text-gray-600">{task.priority}</span>
              </div>
              <p className="mt-2 text-gray-700">{task.description}</p>
              <p className="mt-1 text-sm text-gray-600">
                Due Date: {new Date(task.dueDate).toLocaleDateString('pt-BR')}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <span
                  className={`px-2 py-1 text-xs font-medium rounded ${
                    task.completed === "Completed"
                      ? "bg-green-200 text-green-800"
                      : task.completed === "In Progress"
                      ? "bg-yellow-200 text-yellow-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {task.completed}
                </span>
                <p className="text-xs text-gray-500">ID: {task.id}</p>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="outline" onClick={() => handleToggleStatus(task)} disabled={task.completed === 'Completed'}>
                  Atualizar Status
                </Button>
                <Button variant="destructive" onClick={() => deleteTask(task.id)}>
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
