import { useState } from 'react';
import useTasksContext from '../hooks/use-tasks-context';

function EditTask({ task, setIsEditing }) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const { editTask } = useTasksContext();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    editTask({ id: task.id, title, description });
    setIsEditing(false);
  };

  return (
    <form id="edit-task" onSubmit={handleFormSubmit}>
      <label>Title</label>
      <input value={title} onChange={e => { setTitle(e.target.value); }} />
      <label>Description</label>
      <input value={description} onChange={e => { setDescription(e.target.value); }} />
      <button>Save</button>
    </form>
  );
}

export default EditTask;
