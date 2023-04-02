import Content from './Content';
import Login from './Login';
import { useState } from 'react';
import './App.css';

function App() {
    const [isLogIn, setIsLogIn] = useState(false);
    const [username, setUsername] = useState('');

    return (
        <div className="app">
        { isLogIn
        ? <Content 
            username={username}
            setLogIn={setIsLogIn}
            />
        : <Login
            username={username}
            setUsername={setUsername}
            setLogIn={setIsLogIn}
            />
        }
        </div>
        );
}

export default App;