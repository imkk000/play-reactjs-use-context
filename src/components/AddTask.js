import './AddTask.css';
import { useState } from 'react';
import useTasksContext from '../hooks/use-tasks-context';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { addTask } = useTasksContext();
  const handleFormSubmit = (e) => {
    e.preventDefault();

    addTask({ title, description });

    setTitle('');
    setDescription('');
  }

  return (
    <form id="add-task" onSubmit={handleFormSubmit}>
      <label>Title</label>
      <input value={title} onChange={e => { setTitle(e.target.value); }} />
      <label>Description</label>
      <input value={description} onChange={e => { setDescription(e.target.value); }} />
      <button>Add</button>
    </form>
  )
}

export default AddTask;
