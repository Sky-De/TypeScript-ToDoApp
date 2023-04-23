import "./style.css";

interface Props {
    task: string;
    setTask: any;
    handleSubmit: (e:React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ task, setTask, handleSubmit }) => {
    
  return (
    <form className="form" onSubmit={handleSubmit}>
        <input 
         value={task} 
         onChange={(e)=> setTask(e.target.value)} 
         type="text" 
         className="form__input" 
         placeholder="what's your task to do ?" />
        <div className="cover"></div>
        <button className="form__btn" type="submit">Add</button>
    </form>
  );
};
export default InputField;