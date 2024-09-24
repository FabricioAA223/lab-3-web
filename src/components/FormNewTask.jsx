import { useState } from "react";
import '../index.css';

const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Día con dos dígitos
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes con dos dígitos (los meses comienzan desde 0)
    const year = today.getFullYear(); // Año con cuatro dígitos

    return `${day}/${month}/${year}`;
};

export const FormNewTask = ({handleNewForm, handleCloseForm}) => {
    const [title, setTitle] = useState("")
    const [details, setDetails] = useState("")
    const [file, setFile] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log("Title: ", title, "Details: ", details, "File: ", file)
        const hasDetails = details==""?null:details
        handleNewForm({
            title, 
            createdAt:getCurrentDate(), 
            completed:false, 
            details:hasDetails, 
            attachment_url:null
        });
        handleCloseForm();
        setTitle("")
        setDetails("")
        setFile(null)
    }
    const handleChangeTitle = (value) => {
        setTitle(value.target.value)
    }
    const handleChangeDetails = (value) => {
        setDetails(value.target.value)
    }
    const handleChangeFile = (e) => {
        const selectedFile = e.target.files[0];
        
        if (selectedFile) {
            // Validar el tamaño del archivo (5 MB)
            if (selectedFile.size > 5 * 1024 * 1024) {
                alert("El tamaño máximo del archivo es de 5MB");
                setFile(null);
            } else {
                setFile(selectedFile);
            }
        }
        setFile(e.target.files[0])
    }
    const handleCancel = (e) => {
        e.preventDefault(); // Evita que el botón "Cancel" envíe el formulario
        setTitle("")
        setDetails("")
        setFile(null)
        handleCloseForm();
    }
    return (
        <div className="form-background">
            <div className="form-container">                
                <h1>Add task to To-Do list</h1>
                <form action="" onSubmit={handleSubmit}>
                    <input 
                        placeholder="task title" 
                        type="text" 
                        value={title}
                        onChange={handleChangeTitle} 
                        required>
                    </input>
                    <input 
                        placeholder="task detail" 
                        type="text" 
                        value={details}
                        onChange={handleChangeDetails}>
                    </input>
                    <input 
                        type="file" 
                        onChange={handleChangeFile}
                    ></input>
                    <div className="btn-container">
                        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
                        <button className="add-btn" type="submit">Add</button>
                    </div>
                </form>


            </div>
        </div>
    );
}