import { ChangeEvent, FormEvent, useState } from "react";
import { ITask, Task } from "./Task";

import styles from './TaskList.module.css'

export function TaskList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [tasksCompleted, setTasksCompleted] = useState<number>(0);
  const [newTaskText, setNewTaskText] = useState<string>('');

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const newTask = {
      id: tasks.length + 1,
      description: newTaskText,
      status: false,
    }

    setTasks([...tasks, newTask]);
    setNewTaskText('');
  }

  function countTasksCompleted() {
    const tasksCompleted = tasks.filter(task => task.status === true);
    setTasksCompleted(tasksCompleted.length);
  }

  function handleNewTaskTextchange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskText(event.target.value);
  }

  function handleTaskStatusChange(id: number) {
    const newTasks = tasks.map(task => {
      if(task.id === id) {
        task.status = !task.status;
      }

      return task;
    });

    countTasksCompleted();
    setTasks(newTasks);
  }

  function deleteTask(id: number) {
    const taskToDelete = tasks.find(task => task.id === id);
    
    if(taskToDelete?.status === true) {
      setTasksCompleted(tasksCompleted - 1);
    }

    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
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
              key={task.id} 
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