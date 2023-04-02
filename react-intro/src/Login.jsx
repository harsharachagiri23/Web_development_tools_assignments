
import { useState } from 'react';

function conditionUsername(username){
    const conditionRegex = /^[a-zA-Z0-9]+$/;
    const usernameCompare = username.match(conditionRegex);
    if(username === 'dog'){
        return  "dog";
    }

    if(!usernameCompare){
        return "valid";
    }

    return "";
}


function setState({username, setLogIn, setFailMessage}){
    const condition = conditionUsername(username)
    let loginMessage = '';

    if(condition === ''){
        setLogIn(true);
    }

    if(condition === 'dog'){
        loginMessage = "Dog is not a valid username";
    }else if(condition === 'valid'){
        loginMessage = 'Type a valid username';
    }

    setFailMessage(loginMessage);

}

function Login({username, setUsername, setLogIn}){
    const [failMessage, setFailMessage] = useState('');

    return(
        <form>  
            <label>
            <span className="username">Username: </span>
            <input className="username_input" value={username} onInput={(e) => setUsername(e.target.value)}/>
            </label>

            <button className="login" type="button" onClick={ () => setState({username, setLogIn, setFailMessage})}>Login</button>
            <p> {failMessage} </p>
        </form>
    );
}

export default Login;