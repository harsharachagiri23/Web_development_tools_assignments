import {
  LOGIN_STATUS,
  CLIENT,
  ACTIONS,
} from './constants';

export const initialState = {
  messageData: [],
  chatters: [],
  loginStatus: LOGIN_STATUS.PENDING,
  isTodoPending: false,
  username: '',
  error : '',
  lastAddedTodoId: '',
};


function reducer(state, action) {
  switch(action.type) {

    case ACTIONS.LOG_IN:   
      return {
        ...state,
        error: '', 
        loginStatus: LOGIN_STATUS.IS_LOGGED_IN,
        username: action.username,
        chatters:[...state.chatters, action.username]
      };

    case ACTIONS.PENDING:
      return {
        ...state,
        error: '', 
        loginStatus: LOGIN_STATUS.PENDING,
      };

    case ACTIONS.START_LOADING_TODOS:
      return {
        ...state,
        error: '',
        isTodoPending: true, // Perhaps make this a "status" value like login?
        chatters : state.chatters
      };

    case ACTIONS.REPLACE_CHAT:
      return {
        ...state,
        error: '',
        isTodoPending: false,
        lastAddedTodoId: '',
        messageData: action.messageData,
        chatters: action.chatters
      };

    case ACTIONS.LOG_OUT:
      return {
        ...state,
        error: '',
        isTodoPending: false,
        todos: {},
        loginStatus: LOGIN_STATUS.NOT_LOGGED_IN,
        lastAddedTodoId: '',
        username: '',
      };

    case ACTIONS.REPORT_ERROR:
      // We could move the "pick the message" logic from Status.jsx here. Better? It depends.
      return {
        ...state,
        error: action.error || 'ERROR', // ERROR is just to ensure a truthy value
      };

    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: {  // because todos is an object, we have to make an altered copy
          ...state.todos, // copy the existing todos...
          [action.todo.id]: action.todo // ...but override this one
        },
      };

    case ACTIONS.DELETE_TODO:
      const todosCopy = { ...state.todos }; // "shallow" copy, but we are only making a shallow change
      delete todosCopy[action.id];
      return {
        ...state,
        todos: todosCopy, // No need to copy the copy
      };

    case ACTIONS.ADD_CHAT:
      console.log("Inside ADD_CHAT : ", action.todo);
      const messageData = [...state.messageData, ...action.todo];
      console.log("User Chat messagesxz  : ", messageData);
      return {
        ...state,
        // messageData: [
        //   ...state.messageData,
        //   ...action.todo
        // ],
        messageData : action.todo
      };

    default:
      throw new Error({ error: CLIENT.UNKNOWN_ACTION, detail: action }); // reporting detail for debugging aid, not shown to user
  }
}

export default reducer;
