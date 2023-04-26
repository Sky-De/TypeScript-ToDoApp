import { useEffect, useRef, useState } from "react";
import { Task } from "../../models";
import { useTasks } from "../../context/tasksContext";

type Props = {
    task: Task;  
}

const TaskItem: React.FC<Props> = ({ task }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTask, setEditedTask] = useState<string>(task.task);
    const { dispatch } = useTasks();

    // Deleting process-user after click on delete btn have 5sc to stop delete proccess
    // by tap on undo btn
    // or can wait 5sc to auto delelte 
    // or can click on counter to delete immidiately
    const INITIAL_SC_TO_DELETE = 5;
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteNow, setDeleteNow] = useState(false);
    const [counter, setCounter] = useState(INITIAL_SC_TO_DELETE);
    const deleteIntervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if(deleteNow) {
            deleteTask();
            setIsDeleting(false);
            clearInterval(deleteIntervalRef.current!);
        }
        if (isDeleting && counter > 0) {
        deleteIntervalRef.current = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);
        }else if(isDeleting && counter <= 0) {
            deleteTask();
            setIsDeleting(false);
            clearInterval(deleteIntervalRef.current!);
        }
        else clearInterval(deleteIntervalRef.current!);
        
        return () => {
        clearInterval(deleteIntervalRef.current!);
        };
    }, [isDeleting, counter, deleteNow]);
    
     const startDelete = () => {
        if (isDeleting) {
        setIsDeleting(false);
        setCounter(INITIAL_SC_TO_DELETE);
        } else setIsDeleting(true);
     }

     const immediateDelete = () => setDeleteNow(true);
     
    //  delete---------
    const deleteTask = () => dispatch({ type: "DELETE_TASK", id: task.id});
    //  check---------
     const handleDone = () => {
        dispatch({type: "TOGGLE_IS_DONE_TASK", id: task.id});
     }
    // edit--------------
     const handleEdit = () => {
        if(task.isDone) return
        // saves
        if(isEditing) {
            dispatch({ type: "EDIT_TASK", id: task.id, newTask: editedTask});
            editedTask === "" && setEditedTask(task.task);
        }
        setIsEditing(pre => !pre);
     }

     return(
        <li className="list__item">
            <div className="list__item--task">
                { task.isDone 
                ? <s>{task.task}</s> 
                : isEditing 
                ? <input
                    autoFocus 
                    className="list__item--task--input" 
                    type="text" 
                    value={editedTask} 
                    onChange={(e) => setEditedTask(e.target.value)} /> 
                : <p>{task.task}</p> }
            </div>
            {isDeleting && <div className="list__item__warning" onClick={immediateDelete}>
                <span className="list__item__warning--counter" >{counter} </span>
                <span className="list__item__warning--text">delete Now ? Click</span>
                </div>}
            <div className="list__item--action">
                <i title={`${isDeleting ? "Undo" : "Delete"}`} className={`bx ${isDeleting ? 'bx-undo' : 'bx-trash'}`} onClick={startDelete}></i>
                <i title={`${isEditing ? 'Save' : 'Edit'}`} className={`bx ${isEditing ? 'bx-memory-card' : 'bx bxs-edit'} ${task.isDone && 'disable'}`} onClick={handleEdit}></i>
                <i title={`${task.isDone ? 'Reset' : 'Done'}`} className={`bx ${task.isDone ? 'bx-refresh' : 'bx-check-double' }`} onClick={handleDone}></i>
            </div>
        </li>
     )
}
export default TaskItem; 