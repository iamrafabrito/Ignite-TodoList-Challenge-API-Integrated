import {  Trash } from "phosphor-react";

import styles from './Task.module.css';

export interface ITask {
  _id?: string;
  description: string;
  status: boolean;
}

interface ITaskProps {
  task: ITask;
  onDeleteTask: (id: string) => void;
  onTaskStatusChange: (task: ITask) => void;
}

export function Task({ task, onDeleteTask, onTaskStatusChange }: ITaskProps) {

  function handleTaskStatusChange() {
    onTaskStatusChange(task);

    console.log(task);
  }

  function handleDeleteComment() {
    onDeleteTask(task._id!);
  }

  return(
    <div className={`${styles.taskContainer} ${task.status ? styles.taskContainerIsChecked : ''}`}>
      <div>
        <input 
          type="checkbox" 
          id={task._id} 
          name={task._id} 
          className={styles.checkbox} 
          checked={task.status} 
          onChange={handleTaskStatusChange} 
        />
        <label key={task._id} htmlFor={task._id} />
        
        <p>{task.description}</p>
      </div>
      <button onClick={handleDeleteComment}>
        <Trash size={24} />
      </button>
    </div>
  );
}

   