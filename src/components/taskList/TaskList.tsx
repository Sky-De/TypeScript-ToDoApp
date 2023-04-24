import { useContext } from "react";
import { Task } from "../../models";
import TaskItem from "./TaskItem";
import "./style.css";
import { useTasks } from "../../context/tasksContext";
// fix it



const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  
  return (
    <ul className="list">
        {
            tasks?.map(task => (
                 <TaskItem
                  key={task.id} 
                  task={task} />))
        }
    </ul>
  );
};
export default TaskList;