import { useContext } from 'react';
import TasksContext from '../contexts/tasks';

function useTasksContext() {
  return useContext(TasksContext);
}

export default useTasksContext;
