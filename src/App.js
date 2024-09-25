import React, { useState, useEffect } from 'react';
import './App.css';
import NavigationBar from './components/NavigationBar';
import FilterableTasksList from './components/FilterableTasksList';
import TaskDetailsView from './components/TaskDetailsView';
import { AddTaskForm } from './components/AddTaskForm';
import { AddTaskBackground } from './components/AddTaskBackground';

function App() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openForm, setOpenForm] = useState(false)

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

  // const saveTasks = async (updatedTasks) => {
  //   try {
  //     await fetch('/api/saveTasks', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(updatedTasks),
  //     });
  //   } catch (error) {
  //     console.error('Error saving tasks:', error);
  //   }
  // };

  //Se muestra el formulario de insercion
  const handleAddTask = (e) => {
    setOpenForm(true)
  };

  //Funcion que se envia al formulario de insercion donde se recolecta la informacion de la tarea nueva
  const addTask = (e) => {
    //Obtiene el id del ultimo elemento y lo aumenta en 1 para insertar el nuevo elemento
    const nextId = tasks.length>=1 ? tasks[tasks.length-1].id + 1 : 0 //Por si elimino todos los elementos y la lista esta vacia
    setTasks((prev) => 
      [
        ...prev, //Todos los elementos que ya tenia el state
        {id:nextId, ...e} //Mas uno nuevo con la informacion recibida
      ] 
    )

  }

  const handleSelectTask = (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    setSelectedTask(task);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = tasks.filter(t => t.id !== taskId);
    setTasks(updatedTasks);
    setSelectedTask(null);
    // saveTasks(updatedTasks);
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    // saveTasks(updatedTasks);
  };

  //Funcion que se envia al formulario de insercion en caso de clickear el boton de "cancelar"
  const handleCloseForm = () => {
    setOpenForm(false)
  }

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
      {openForm && 
        <AddTaskBackground>
          <AddTaskForm handleNewForm={addTask} handleCloseForm={handleCloseForm}/>
        </AddTaskBackground>
      }
    </div>
  );
}

export default App;