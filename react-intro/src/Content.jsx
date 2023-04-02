import {compWord} from './compare';
import {useState} from 'react';

const secret_Word = "RECAT";

function compInput({guess_Word, setMessage}){
    const compareOutput =  compWord(secret_Word, guess_Word);
    if(compareOutput === true){
        setMessage(`${guess_Word} is the secret Word`);    
    }else if(compareOutput === false){
        setMessage(`${guess_Word} was not a valid word`);    
    }else{
        setMessage(`${guess_Word} had ${compareOutput} letters in common`);    
    }
}


function Content({ username, setLogIn}) {
    const [guess_Word, setguess_Word] = useState('');

    const [message, setMessage] = useState('');

    return ( 
        <div className="content">
            <p className="span">Hola {username} !!</p>
            <label>
            <span className="span">Enter 5-alphabet Word: </span>
            <input className="input" value={guess_Word} onInput={(e) => setguess_Word(e.target.value)}/>
            </label>
            <button className="guess" onClick={() => compInput({guess_Word, setMessage})}>guess the word</button>
            <button className="logout" onClick={() =>
                setLogIn(false)}>logout</button>
             <p> {message} </p>

        </div>
            
        );
}

export default Content;