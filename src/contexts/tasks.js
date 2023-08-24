import { useState, createContext } from 'react';
import axios from 'axios';

const endpoint = 'http://localhost:5555/tasks';

const TasksContext = createContext();

function Provider({ children }) {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const response = await axios.get(endpoint);
    return response.data;
  };

  const addTask = async ({ title, description }) => {
    const response = await axios.post(endpoint, {
      title,
      description,
    });
    setTasks([...tasks, response.data]);
  }

  const editTask = async ({ id, title, description }) => {
    await axios.put(`${endpoint}/${id}`, {
      title,
      description,
    });
    const rerenderedTasks = tasks.map(task => {
      if (task.id === id) {
        return { id, title, description };
      }
      return task;
    });
    setTasks(rerenderedTasks);
  }

  const deleteTask = async (id) => {
    await axios.delete(`${endpoint}/${id}`);
    const rerenderedTasks = tasks.filter(task => task.id !== id);
    setTasks(rerenderedTasks);
  };

  const contextValues = {
    tasks,
    setTasks,
    getTasks,
    addTask,
    editTask,
    deleteTask,
  };

  return (
    <TasksContext.Provider value={contextValues}>
      {children}
    </TasksContext.Provider>
  );
}

export { Provider };
export default TasksContext;
