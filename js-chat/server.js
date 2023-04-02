const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const chat = require('./chat');
const sessions = require('./sessions');
const users = require('./users');

app.use(cookieParser());
app.use(express.static('./public'));
app.use(express.json());

// Sessions
app.get('/api/v1/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
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
    users.addUserData(username, chat.prepareMessageList().getmessageData());

  }
  chat.prepareMessageList().addActiveUser(username);

  res.cookie('sid', sid);
  res.json(chat.prepareMessageList().getmessageData());
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

  chat.prepareMessageList().removeInactiveUser(username);
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
  res.json(chat.prepareMessageList().getmessageData());
});

app.post('/api/v1/chat', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if(!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { message } = req.body;
  if(!message) {
    res.status(400).json({ error: 'required-message-input' });
    return;
  }
  
  chat.prepareMessageList().addChat({ message, username });
  res.json(chat.prepareMessageList().getmessageData());
});

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));

