import { Task } from "../../models";
import TaskItem from "./TaskItem";
import "./style.css";
// fix it


interface Props {
    tasks: Task[];
    setTasks: any;
}
const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {
  return (
    <ul className="list">
        {
            tasks.map(task => (
                 <TaskItem
                  key={task.id} 
                  task={task} 
                  tasks={tasks} 
                  setTasks={setTasks} />))
        }
    </ul>
  );
};
export default TaskList;