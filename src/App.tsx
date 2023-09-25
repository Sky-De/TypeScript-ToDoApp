import { useState } from 'react';
import InputField from './components/InputField';
import TaskList from './components/taskList/TaskList';
import { useTasks } from './context/tasksContext';
import './App.css';

const App: React.FC = () =>  {
  // dark/light mode handle
  const isDark: boolean = localStorage.getItem("isLight") === null ? true : false;
  const [darkTheme, setDarkTheme] = useState<boolean>(isDark);
  const changeThemeMode = () => {
    isDark ? localStorage.setItem("isLight","") : localStorage.removeItem("isLight");
    setDarkTheme(pre => !pre);
  }

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

  const handleReverse = () => dispatch({ type:'REVERSE_TASKS' });
  const handleRefreshAll = () => dispatch({ type:'REFRESH_ALL_TASKS' });
  
  return (
    <div role='application' className={`App ${darkTheme && "dark" }`}>

      <div className="header__con">
       <header className='header'>
         <h1 className='header__title'>Todo App</h1>
         <div className="header__toggleMode" onClick={changeThemeMode}>
           {darkTheme ? <i className='bx bx-sun'></i> : <i className='bx bx-moon'></i>}
         </div>
         <i className='bx bx-refresh header__icon' onClick={handleRefreshAll}></i>
         <i className='bx bx-sort-alt-2 header__icon' onClick={handleReverse}></i>
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
