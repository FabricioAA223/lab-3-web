import React, { useState, useEffect } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import FilterableTasksList from './components/FilterableTasksList';
import TaskDetailsView from './components/TaskDetailsView';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch('/data/data.json');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const saveTasks = async (updatedTasks) => {
    try {
      await fetch('/api/saveTasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTasks),
      });
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const handleAddTask = () => {
    console.log('Agregar tarea');
  };

  const handleSelectTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setSelectedTask(task);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    setSelectedTask(null);
    saveTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  return (
    <div className="App">
      <NavigationBar onAddTask={handleAddTask} />
      <div className="main-content">
        <FilterableTasksList 
          tasks={tasks} 
          onSelectTask={handleSelectTask}
          onToggleComplete={handleToggleComplete}
        />
        <TaskDetailsView 
          task={selectedTask} 
          onDeleteTask={handleDeleteTask} 
        />
      </div>
    </div>
  );
}

export default App;