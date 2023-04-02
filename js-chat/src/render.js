

function render({ state, appEl }) {
  const html = `
   <main class="main">
     ${ generateLoginHtml( state ) }
     ${ generateContentHtml( state ) }
   </main>
  `;
  appEl.innerHTML = html;
}

function generateLoginHtml( state ) {
  if(state.isLoginPending) {
    return `
      <div class="login__Loading">Loading user...</div>
    `
  }
  if(state.isLoggedIn) {
    return ``;
  }

  return `
      <div class="login_class">
        <form class="Form" action="#/login">
          <label>
            <span class="label">Username:</span>
            <input class="Username" placeholder=" Type a name" value="">
          </label>
          <button class="Button" type="submit">Login</button>
        </form>
      </div>
      <div class="Status">${state.error}</div>
     
  `;
}

function showActiveUsers( state ){

  const messagesHtml =
  ` <h3 class="Active_user">Users to chat with:</h3>` +
    Object.values(state.chat.activeUsers)
      .map(username => {
        return `
        <ul class="Act_users">
          <li>
              <div class= "Act_user">
                <span class="username"> ${username} </span>
              </div>
          </li>
        </ul>
    `;
      })
      .join("") || `<p class="Start_conversation">Start the conversation!</p>`;
  return messagesHtml;
}

function generateContentHtml( state ) {
  if(!state.isLoggedIn) {
    return ``;
  }
  if(state.isTodoPending) {
    return `
      <div class="Text">
        ${generateControlsHtml( state )}
        <div class="todos__waiting">Loading Todos...</div>
      </div>
    `;
  }
  return `
      <div class="Text">
        ${showActiveUsers( state )}
        ${generateControlsHtml( state )}
        <ul class="Chat">${createMessage( state )}</ul>
        ${createMessageInputHtml( state )}
      </div>
  `;
}

function generateControlsHtml( state ) {
  return `
        <div class="remote">
          <button class="refresh_class">Refresh</button>
          <button class="logout">Logout</button>
        </div>
  `;
}

function createMessage( state ) {
    const messagesHtml =
    Object.values(state.chat.userChat)
      .map(chat => {
        return `
      <ul class="chats">
        <li>
          <div class= "chat">
            <div class="chat_info">      
              <span class="chat_username">${chat.username}</span>
            </div>
            <p class="chat_text"> --> ${chat.message}</p>
          </div>
        </li>
      </ul>
      `;
      })
      .join("") || `<p class="no_chat"> Start the conversation!</p>`;
  return messagesHtml;
}

function createMessageInputHtml( state ) {
  return `
        <form class="add__form" action="#/add">
          <input class="add__message" name="message">
          <button type="submit" class="add__button">Send Message</button>
        </form>
  `;
}

export default render;
