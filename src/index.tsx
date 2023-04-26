import React from 'react';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TasksProvider } from './context/tasksContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TasksProvider>
      <App />
    </TasksProvider>
  </React.StrictMode>
);


serviceWorkerRegistration.register();