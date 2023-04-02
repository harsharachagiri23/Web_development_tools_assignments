import { useState } from 'react';

function AddTodoForm({ onAddTodo }) {

  const [ task, setTask ] = useState('');

  function onSubmit(e) {
    e.preventDefault(); 
    setTask('');
    onAddTodo(task);
  }

  function onTyping(e) {
    setTask(e.target.value);
  }

  return (
    <form className="form" action="#/add" onSubmit={onSubmit}>
      <input className="message" name="message" value={task} onChange={onTyping}/>
      <button type="submit" className="button">Message here</button>
    </form>
  );
}

export default AddTodoForm;
