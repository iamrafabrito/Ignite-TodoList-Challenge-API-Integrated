import { Header } from './components/Header';
import { TaskList } from './components/TaskList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './global.css';

import styles from './App.module.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <div className={styles.wrapper}>
        <TaskList />
      </div>
    </QueryClientProvider>
  )
}

export default App
