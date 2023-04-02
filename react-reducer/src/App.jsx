import { useEffect, useReducer } from 'react';

import './App.css';
import reducer, { initialState } from './reducer';
import {
  LOGIN_STATUS,
  CLIENT,
  SERVER,
  ACTIONS,
} from './constants';
import {
  fetchSession,
  fetchLogin,
  fetchLogout,
  fetchChat,
  fetchAddChat,
} from './services';

import LoginForm from './LoginForm';
import Loading from './Loading';
import Controls from './Controls';
import Status from './Status';
import AddTodoForm from './AddTodoForm';
import Chat from './Chat';

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  function onLogin( username ) {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchLogin(username)
    .then( fetchedTodos => {
      dispatch({ type: ACTIONS.PENDING});
      setTimeout(() => {

        dispatch({ type: ACTIONS.LOG_IN, username });
        dispatch({ type: ACTIONS.REPLACE_CHAT, messageData : fetchedTodos.messageData, chatters: fetchedTodos.chatters });
      }, 1500);
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onLogout() {
    dispatch({ type: ACTIONS.PENDING});
    setTimeout(() => {
      dispatch({ type: ACTIONS.LOG_OUT });
      fetchLogout() 
      .catch( err => {
        dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
      });
    }, 1500);
  }

  function onRefresh() {
    dispatch({ type: ACTIONS.START_LOADING_TODOS });
    fetchChat()
    .then( todos => {
     
      dispatch({ type: ACTIONS.REPLACE_CHAT, messageData : todos.messageData, chatters: todos.chatters });
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function onAddTodo(task) {
    fetchAddChat(task)
    .then( todo => {
      
      dispatch({ type: ACTIONS.ADD_CHAT, todo});
      
    })
    .catch( err => {
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  function checkForSession() {
    fetchSession()
    .then( session => { 
      dispatch({ type: ACTIONS.LOG_IN });
      return fetchChat();
    })
    .catch( err => {
      if( err?.error === SERVER.AUTH_MISSING ) {
        return Promise.reject({ error: CLIENT.NO_SESSION }) 
      }
      return Promise.reject(err); 
    })
    .then( todos => {
      dispatch({ type: ACTIONS.REPLACE_CHAT, messageData : todos.messageData, chatters: todos.chatters});
    })
    .catch( err => {
      if( err?.error === CLIENT.NO_SESSION ) { 
        dispatch({ type: ACTIONS.LOG_OUT });
       
        return;
      }
      
      dispatch({ type: ACTIONS.REPORT_ERROR, error: err?.error })
    });
  }

  useEffect(
    () => {
      checkForSession();
    },
    [] 
  );

  return (
    <div className="app">
      <main className="">
        { state.error && <Status error={state.error}/> }
        { state.loginStatus === LOGIN_STATUS.PENDING && <Loading className="gg-spinner-alt" ></Loading> }
        { state.loginStatus === LOGIN_STATUS.NOT_LOGGED_IN && <LoginForm onLogin={onLogin}/> }
        { state.loginStatus === LOGIN_STATUS.IS_LOGGED_IN && (
          <div className="inside_content">
            <p>Welcome, {state.username}</p>
            <Controls onLogout={onLogout} onRefresh={onRefresh}/>
            <Chat messageData={state.messageData}
                  chatters = {state.chatters}          
            />
            <AddTodoForm onAddTodo={onAddTodo}/>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;
