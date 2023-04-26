import { useState } from 'react';
import InputField from './components/InputField';
import TaskList from './components/taskList/TaskList';
import { useTasks } from './context/tasksContext';
import './App.css';

const App: React.FC = () =>  {
  const [darkTheme, setDarkTheme] = useState(true);
  const changeThemeMode = () => setDarkTheme(pre => !pre);

  const { dispatch } = useTasks();
  
  const [task, setTask] = useState<string>("");
  
  const handleSubmit = (e:React.FormEvent) => {
        e.preventDefault();
        const newTask = {
          id:Date.now(), 
          task, 
          isDone: false
        }
        if(task) dispatch({type: "ADD_TASK", task: newTask});
        setTask("");
  }
  
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

      <TaskList/>

    </div>
  );
}

export default App;
