import TaskItem from "./TaskItem";
import { useTasks } from "../../context/tasksContext";
import "./style.css";

const TaskList: React.FC = () => {
  const { tasks } = useTasks();
  
  return (
    <ul className="list">
        {
         tasks?.map( task =>  <TaskItem key={task.id} task={task} /> )
        }  
    </ul>
  );
};
export default TaskList;