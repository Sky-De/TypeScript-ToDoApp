import { useState } from 'react';
import './App.css';
import InputField from './components/InputField';
import { Task } from './models';
import TaskList from './components/taskList/TaskList';

const App: React.FC = () =>  {
  const [darkTheme, setDarkTheme] = useState(true);
  const changeThemeMode = () => setDarkTheme(pre => !pre);

  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  
  const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        if(task) setTasks([...tasks, { id:Date.now(), task:task, isDone: false}])
        setTask("");
  }
    console.log(tasks);
  
  return (
    <div className={`App ${darkTheme && "dark" }`}>

      <div className="header__con">
       <header className='header'>
         <h1 className='header__title'>Online Todo</h1>
         <div className="header__toggleMode" onClick={changeThemeMode}>
           {darkTheme ? <i className='bx bx-sun'></i> : <i className='bx bx-moon'></i>}
         </div>
         <i className='bx bx-task header__icon'></i>
       </header>
      </div>
      
      <div className="form__con">
        <InputField task={task} setTask={setTask} handleSubmit={handleSubmit} />
      </div>

      <TaskList tasks={tasks} setTasks={setTasks} />

    </div>
  );
}

export default App;
