import useTasksContext from '../hooks/use-tasks-context';

function DeleteTask({ task }) {
  const { deleteTask } = useTasksContext();
  const handleDeleteTask = () => {
    deleteTask(task.id);
  }
  return <button onClick={handleDeleteTask}>x</button>
}

export default DeleteTask;
