import {
  fetchLogin,
  fetchLogout,
  fetchChat,
  fetchUpdateTodo,
  fetchAddChat,
  fetchDeleteTodo,
} from './services';
import {
  waitOnchat,
  setchat,
  setError,
  login,
  logout,
  updateTodo,
  addChat,
} from './state';
import render from './render';

export function addAbilityToLogin({ state,  appEl }) {
  // Using 'submit' so we can get both submit via button-click and by "enter"
  appEl.addEventListener('submit', (e) => {
    e.preventDefault();
    if(!e.target.classList.contains('Form')) {
      return;
    }

    const username = appEl.querySelector('.Username').value;
    waitOnchat();
    render({ state, appEl }); // show loading state
    fetchLogin( username )
    .then( todos => {
      login(username);
      setchat(todos);
      render({ state, appEl });
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });

  });
}

export function addAbilityToLogout({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('logout')) {
      return;
    }
    const username = state.username;
    logout();
    render({ state, appEl });
    fetchLogout() // We don't really care about results
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}

export function addAbilityToRefresh({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('refresh_class')) {
      return;
    }

    waitOnchat(); // Show loading state
    render({ state, appEl });
    fetchChat()
    .then( chat => {
      setchat(chat);
      render({ state, appEl });
    })
    .catch( err => {
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}

export function addAbilityToToggleComplete({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('todo__toggle')) {
      return;
    }
    const id = e.target.dataset.id;
    // Here I elect not show a waiting status...what impact could that have?
    fetchUpdateTodo(id, { done: !state.todos[id].done } )
    .then( todo => { // Service call returns the updated todo
      updateTodo({ id, todo });
      render({ state, appEl });
    })
    .catch( err => {
      console.log(err);
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}

export function addAbilityToAddMessage({ state, appEl }) {
  appEl.addEventListener('submit', (e) => {
    if(!e.target.classList.contains('add__form')) {
      return;
    }
    const textMessage = appEl.querySelector('.add__message').value;
    // Here I elect not show a waiting status...what impact could that have?
    fetchAddChat(textMessage)
    .then( todo => {
      // Notice we get the id of the new todo from the returned todo
      addChat(textMessage);
      render({ state, appEl });
    })
    .catch( err => {
      console.log(err);
      setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
      render({ state, appEl });
    });
  });
}

export function addAbilityToRemoveTodo({ state, appEl }) {
  appEl.addEventListener('click', (e) => {
    if(!e.target.classList.contains('todo__delete')) {
      return;
    }
    const id = e.target.dataset.id;
    waitOnchat(); // Show loading state
    render({ state, appEl });
    fetchDeleteTodo(id)
      .then( () => {
        return fetchChat(); // Return the promise so we can chain
      })
      .then( todos => {
        setchat(todos);
        render({ state, appEl });
      })
      .catch( err => {
        setError(err?.error || 'ERROR'); // Ensure that the error ends up truthy
        render({ state, appEl });
      });
  });
}

