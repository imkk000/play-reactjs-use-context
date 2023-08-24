import { useEffect } from 'react';
import './ShowTaskList.css';
import ShowTask from './ShowTask';
import useTasksContext from '../hooks/use-tasks-context';

function ShowTaskList() {
  const { tasks, setTasks, getTasks } = useTasksContext();

  useEffect(() => {
    const fetchTasks = async () => {
      setTasks(await getTasks());
    };
    fetchTasks();
  }, []);

  const renderedTasks = tasks.map(task => {
    return <ShowTask key={task.id} task={task} />
  });

  return (
    <div id="tasks">{renderedTasks}</div>
  )
}

export default ShowTaskList;
