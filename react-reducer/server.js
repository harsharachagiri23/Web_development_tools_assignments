const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 3000;

const chat = require('./chat');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());

// Sessions
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username : username,  messageData: chat.makeMessageDataList().getChatData(),
    chatters: chat.makeMessageDataList().getchatters()});
});

app.post('/api/v1/session', (req, res) => {
  const { username } = req.body;

  if(!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if(username === 'dog') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if(!existingUserData) {
    users.addUserData(username, chat.makeMessageDataList().getChatData());
    chat.makeMessageDataList().addChatter(username);
  }
  
  if (!chat.makeMessageDataList().getchatters().includes(username)){

    chat.makeMessageDataList().addChatter(username);

  }
  
  res.cookie('sid', sid);
  res.json({messageData: chat.makeMessageDataList().getChatData(),
    chatters: chat.makeMessageDataList().getchatters()});
});

app.delete('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(sid) {
    res.clearCookie('sid');
  }

  if(username) {
    sessions.deleteSession(sid);
  }

  chat.makeMessageDataList().removeChatter(username);

  res.json({ username });
});

// Chat related API's
app.get('/api/v1/chat', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({messageData: chat.makeMessageDataList().getChatData(),
    chatters: chat.makeMessageDataList().getchatters()});
});

app.post('/api/v1/chat', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { message } = req.body;
  console.log("Entered message : ", message);
  if(!message) {
    res.status(400).json({ error: 'required-message-input' });
    return;
  }

  chat.makeMessageDataList().addChat({ message, username });
  console.log("Final chat Data : ", chat.makeMessageDataList().getChatData());
  res.json(chat.makeMessageDataList().getChatData());
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
