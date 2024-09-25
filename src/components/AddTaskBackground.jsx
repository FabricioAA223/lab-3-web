import "./AddTaskBackground.css"

export const AddTaskBackground = ({children}) => {
    return (
        <div className="form-background">
            {children}
        </div>
    );
}