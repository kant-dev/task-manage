"use client"

import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useRouter } from 'next/navigation'
import { useTaskStore } from '@/store/task-store'
import { Task } from '@/types/task'
import { nanoid } from 'nanoid'
import Link from 'next/link'

const formSchema = z.object({
  title: z.string().min(3, "O título deve ter pelo menos 3 caracteres").max(50),
  description: z.string().min(10, "A descrição deve ter pelo menos 10 caracteres").max(500),
  dueDate: z.string().optional(),
  priority: z.enum(['Low', 'Medium', 'High']).optional(),
  completed: z.enum(["To Do", "In Progress", "Completed"]).optional(),
})

export default function TaskForm() {
  const addTask = useTaskStore(state => state.addTask)

  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      priority: 'Low',
      completed: 'To Do',
    }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newTask: Task = {
      id: nanoid(), // Gera um ID único
      title: values.title,
      description: values.description,
      dueDate: values.dueDate ? new Date(values.dueDate) : new Date(), // Converter para Date
      priority: values.priority ?? "Low", // Evita undefined
      completed: values.completed ?? "To Do", // Evita undefined
    };
  
    addTask(newTask);
    form.reset();
  };
  

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl mx-auto p-6 bg-white rounded-lg space-y-6">
        <h2 className="text-3xl font-bold text-center">Task Manager</h2>

        {/* Task Name (Linha completa) */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description (Linha completa) */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Description Task</FormLabel>
              <FormControl>
                <Input {...field} className="w-full" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Grid de 3 colunas */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Due Date */}
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Due Date Task</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Priority */}
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Priority Level</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Completed */}
          <FormField
            control={form.control}
            name="completed"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Is Completed</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="To Do">To Do</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>

                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Botão */}
        <div className='flex flex-col gap-4'>
          <Button type="submit" className="w-full">Adicionar Task</Button>
          <Link href={'/manage-task'} >
            <Button className='w-full'>Manage Task</Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
