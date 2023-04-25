import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { ITask, Task } from "./Task";

import styles from './TaskList.module.css'
import { api } from "../services/api";

export function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);
  const [newTaskText, setNewTaskText] = useState<string>('');

  async function fetchData() {
    const { data } = await api.get<ITask[]>('/todos');

    setTasks(data);
    setTasksCompleted(data.filter(task => task.status === true).length);
  }

  useEffect(() => {
    fetchData();
  }, []);
  

  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    await api.post<ITask>('/todos', {
      description: newTaskText,
      status: false,
    }); 

    const { data } = await api.get<ITask[]>('/todos');

    setTasks(data);

    setNewTaskText('');
  }

  function handleNewTaskTextchange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  async function handleTaskStatusChange(task: ITask) {
    await api.put(`/todos/${task._id}`, {
      status: !task.status,
    });

    const { data } = await api.get<ITask[]>('/todos');

    setTasksCompleted(data.filter(task => task.status === true).length);

    setTasks(data);
  }

  async function deleteTask(id: string) {
    await api.delete(`/todos/${id}`);
    
    const newTasks = tasks.filter(task => task._id !== id);
    setTasks(newTasks);
  
    const taskToDelete = tasks.find(task => task._id === id);
    if (taskToDelete?.status === true) {
      setTasksCompleted(tasksCompleted => tasksCompleted - 1);
    }
  }

  return(
    <>
      <form onSubmit={handleCreateNewTask} className={styles.taskForm}>
        <input type="text" placeholder="Adicione uma nova tarefa" value={newTaskText} onChange={handleNewTaskTextchange}/>
        <button type="submit">
          Criar
        </button>
      </form>
      <div className={styles.taskContainer}>
        <header className={styles.taskListHeader}>
          <p>Tarefas criadas 
            <strong>
              {tasks.length}
            </strong>
          </p>
          <p>Tasks Concluídas
            {tasksCompleted > 0 ? (
              <strong>
                {tasksCompleted} de {tasks.length}
              </strong>
            ) : (
              <strong>
                {tasksCompleted}
              </strong>
            )}
          </p>
        </header>
        <div className={styles.taskList}>
          {tasks.map(task => {
            return <Task 
              key={task._id} 
              task={task} 
              onDeleteTask={deleteTask}
              onTaskStatusChange={handleTaskStatusChange}
            />
          })}
        </div>
      </div>
    </>
  )
}