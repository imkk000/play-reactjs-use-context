import './ShowTask.css';
import { useState } from 'react';
import EditTask from './EditTask';
import DeleteTask from './DeleteTask';

function ShowTask({ task }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleButtonClick = () => {
    setIsEditing(!isEditing);
  };

  const renderEditTask = (
    <EditTask task={task} setIsEditing={setIsEditing} />
  )
  const renderShowTask = (
    <div>
      <p>Title: {task.title}</p>
      <p>Description: {task.description}</p>
    </div >
  );

  return (
    <div className="task">
      <div className="task-actions">
        <button onClick={handleButtonClick}>e</button>
        <DeleteTask task={task} />
      </div>
      <div className="task-details">
        {isEditing ? renderEditTask : renderShowTask}
      </div>
    </div>
  )
}

export default ShowTask;
