import { useEffect, useRef, useState } from "react";
import { Task } from "../../models";

type Props = {
    tasks: Task[];
    task: Task;
    setTasks: any;
}

const TaskItem: React.FC<Props> = ({ task, setTasks, tasks }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editedTask, setEditedTask] = useState<string>(task.task);

    // deleting-----------------------------------------
    const INITIAL_SC_TO_DELETE = 5;
    const [isDeleting, setIsDeleting] = useState(false);
    const [deleteNow, setDeleteNow] = useState(false);
    const [counter, setCounter] = useState(INITIAL_SC_TO_DELETE);
    const deleteIntervalRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        if(deleteNow) {
            const filteredDeletedTasks = tasks.filter(item => item.id !== task.id);
            setTasks(filteredDeletedTasks);
            setIsDeleting(false);
            clearInterval(deleteIntervalRef.current!);
        }
        if (isDeleting && counter > 0) {
        deleteIntervalRef.current = setInterval(() => {
            setCounter((prevCounter) => prevCounter - 1);
        }, 1000);
        }else if(isDeleting && counter <= 0) {
            const filteredDeletedTasks = tasks.filter(item => item.id !== task.id);
            setTasks(filteredDeletedTasks);
            setIsDeleting(false);
            clearInterval(deleteIntervalRef.current!);
        }
        else clearInterval(deleteIntervalRef.current!);
        
        return () => {
        clearInterval(deleteIntervalRef.current!);
        };
    }, [isDeleting, counter,deleteNow]);
    
     const startDelete = () => {
        if (isDeleting) {
        setIsDeleting(false);
        setCounter(INITIAL_SC_TO_DELETE);
        } else setIsDeleting(true);
     }

     const immediateDelete = () => setDeleteNow(true);
     
    //  check---------
     const handleDone = () => {
        const checkedForDoneTasks = tasks.map(item => item.id === task.id ? {...task, isDone: !task.isDone } : item);
        setTasks(checkedForDoneTasks);
     }
    // edit--------------
     const handleEdit = () => {
        if(task.isDone) return
        // saves
        if(isEditing) {
            console.log("save");  
            const editedTasks = tasks.map(item => item.id === task.id ? {...task, task: editedTask === "" ? task.task : editedTask} : item);
            setTasks(editedTasks);
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
            {isDeleting && <span onClick={immediateDelete}>{counter} delete Now ? Click</span>}
            <div className="list__item--action">
                <i title={`${isDeleting ? "Undo" : "Delete"}`} className={`bx ${isDeleting ? 'bx-undo' : 'bx-trash'}`} onClick={startDelete}></i>
                <i title={`${isEditing ? 'Save' : 'Edit'}`} className={`bx ${isEditing ? 'bx-memory-card' : 'bx bxs-edit'} ${task.isDone && 'disable'}`} onClick={handleEdit}></i>
                <i title={`${task.isDone ? 'Reset' : 'Done'}`} className={`bx ${task.isDone ? 'bx-refresh' : 'bx-check-double' }`} onClick={handleDone}></i>
            </div>
        </li>
     )
}
export default TaskItem; 