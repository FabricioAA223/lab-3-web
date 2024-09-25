import React from 'react';
import { FaPaperclip } from 'react-icons/fa';
import './TaskRow.css';

const TaskRow = ({ task, onSelect, onToggleComplete }) => {
  return (
    <div 
      className={`task-row ${task.completed ? 'completed' : ''}`}
      onClick={onSelect}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={(e) => {
          e.stopPropagation();
          onToggleComplete();
        }}
      />
      <span className="task-title">{task.title}</span>
      <span className="task-status">
        {task.completed ? 'Completado' : 'Pendiente'}
      </span>
      {task.attachment_url && (
        <FaPaperclip className="attachment-icon" />
      )}
    </div>
  );
};

export default TaskRow;