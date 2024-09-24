import React from 'react';
import './TaskDetailsView.css';

const TaskDetailsView = ({ task, onDeleteTask }) => {
    if (!task) {
        return <div className="task-details-view">Selecciona una tarea para ver los detalles</div>;
    }

    const isImage = task.attachment_url && (task.attachment_url.toLowerCase().endsWith('.jpg') || task.attachment_url.toLowerCase().endsWith('.png'));

    return (
        <div className="task-details-view">
            <div className="task-header">
                <h2>{task.title}</h2>
                <span className="task-date">Creada el: {task.created_at}</span>
            </div>
            <p className="task-description">{task.details || 'Sin descripción'}</p>
            {task.attachment_url && (
                <div className="task-attachment">
                    <a href={task.attachment_url} target="_blank" rel="noopener noreferrer">
                        Ver archivo adjunto
                    </a>
                    {isImage && (
                        <img src={task.attachment_url} alt="Vista previa" className="attachment-preview" />
                    )}
                </div>
            )}
            <button className="delete-task-button" onClick={() => onDeleteTask(task.id)}>
                Eliminar tarea
            </button>
        </div>
    );
};

export default TaskDetailsView;