import { CheckCircle, Trash } from "phosphor-react";

import styles from './Task.module.css';

export interface ITask {
  id: number;
  description: string;
  status: boolean;
}

interface ITaskProps {
  task: ITask;
  onDeleteTask: (id: number) => void;
  onTaskStatusChange: (id: number) => void;
}

export function Task({ task, onDeleteTask, onTaskStatusChange }: ITaskProps) {
  function handleTaskCompletion() {
    onTaskStatusChange(task.id);

    console.log(task);
  }

  function handleDeleteComment() {
    onDeleteTask(task.id);
  }

  return(
    <div className={`${styles.taskContainer} ${task.status ? styles.taskContainerIsChecked : ''}`}>
      <div>
        <input 
          type="checkbox" 
          id={`${task.id}-${task.description}}`} 
          name={`${task.id}-${task.description}}`} 
          className={styles.checkbox} 
          checked={task.status} 
          onChange={handleTaskCompletion} 
        />
        <label key={task.id} htmlFor={`${task.id}-${task.description}}`} />
        
        <p>{task.description}</p>
      </div>
      <button onClick={handleDeleteComment}>
        <Trash size={24} />
      </button>
    </div>
  );
}

   