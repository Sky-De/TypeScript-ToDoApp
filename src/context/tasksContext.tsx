import React, { createContext, useContext, useReducer } from "react";

interface Task {
  id: number;
  task: string;
  isDone: boolean;
}

interface State {
  tasks: Task[];
}

type Action =
  | { type: "ADD_TASK"; task: Task }
  | { type: "REVERSE_TASKS" }
  | { type: "EDIT_TASK"; id: number; newTask: string }
  | { type: "TOGGLE_IS_DONE_TASK"; id: number }
  | { type: "DELETE_TASK"; id: number }
  // You can add other actions here

interface AppContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

const initialState: State = {
  tasks: JSON.parse(localStorage.getItem('TASKS') || '[]'),
};

const appReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        tasks: [action.task, ...state.tasks],
      };
    case "REVERSE_TASKS":
      return {
        ...state,
        tasks: [...state.tasks].reverse(),
      };
    case "TOGGLE_IS_DONE_TASK":
      return {
        ...state,
        tasks: state.tasks.map(item => item.id === action.id ? {...item, isDone: !item.isDone } : item),
      };
    case "EDIT_TASK":
      return {
        ...state,
        tasks: state.tasks.map(item => item.id === action.id ? {...item, task: action.newTask === "" ? item.task : action.newTask} : item),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter(item => item.id !== action.id),
      };
    // You can add other cases here
    default:
      return state;
  }
};

export const TaskContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TasksProvider = ({ children }:Props) => {
  const [state, dispatch] = useReducer(appReducer, initialState);
  localStorage.setItem("TASKS",JSON.stringify(state.tasks));

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => {
  const { state, dispatch } = useContext(TaskContext);
  const tasks = state.tasks;

  return { tasks, dispatch }
}

