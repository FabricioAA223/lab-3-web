import React, { useState } from 'react';
import TaskRow from './TaskRow';
import './FilterableTasksList.css';

const FilterableTasksList = ({ tasks, onSelectTask, onToggleComplete }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="filterable-tasks-list">
      <h2>To-Do List ({tasks.length})</h2>
      <input
        type="text"
        placeholder="Buscar tareas..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <div className="tasks-list">
        {filteredTasks.map(task => (
          <TaskRow 
            key={task.id} 
            task={task} 
            onSelect={() => onSelectTask(task.id)}
            onToggleComplete={() => onToggleComplete(task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterableTasksList;