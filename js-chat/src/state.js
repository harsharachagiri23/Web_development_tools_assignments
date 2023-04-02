import { MESSAGES } from './constants';

const state = {
  chat: {},
  activeUsers: {},
  isLoggedIn: false,
  isLoginPending: true, 
  username: '',
  lastAddedTodoId: '',
  error: '',
};

export function waitOnLogin() {
  state.isLoggedIn = false;
  state.isLoginPending = true;
  state.username = '';
  state.error = '';
}

export function login(username) {
  state.isLoggedIn = true;
  state.isLoginPending = false;
  state.username = username;
  state.error = '';
}

export function logout() {
  state.isLoggedIn = false;
  state.isLoginPending = false;
  state.username = '';
  state.error = '';
}

export function waitOnchat() {
  state.error = '';
}

export function setchat(chat) {
  state.chat = chat;
  state.isTodoPending = false;
  state.error = '';
}

export function updateTodo({ id, todo }) {
  state.chat[id] = todo;
  state.error = '';
}

export function addChat(message) {
  state.chat.userChat.push({ 'username' : state.username, 'message' : message});
  state.error = '';
}

export function addActiveUser({ username }) {
  state.activeUsers = username;
}


export function setError(error) {
  console.log(error);
  if(!error) {
    state.error = '';
    return;
  }
  state.error = MESSAGES[error] || MESSAGES.default;
}

export default state;

