import React from 'react';
import './NavigationBar.css';

const NavigationBar = ({ onAddTask }) => {
  return (
    <nav className="navigation-bar">
      <h1 className="site-title">Lista de Tareas</h1>
      <button className="add-task-button" onClick={onAddTask}>
        Agregar Tarea
      </button>
    </nav>
  );
};

export default NavigationBar;