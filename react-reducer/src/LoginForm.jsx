import { useState } from 'react';
function LoginForm({ onLogin }) {
  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); 
    if(username) {  
      onLogin(username); 
    }
  }

  return (
      <div className="login">
        <form className="login" action="#/login" onSubmit={onSubmit}>
          <label>
            <span className="text" >Username:</span>
            <input className="username" value={username} onChange={onChange}/>
          </label>
          <button className="lbutton" type="submit">Login</button>
        </form>
      </div>
  );

}

export default LoginForm;
