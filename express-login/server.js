const express = require('express');
const cookieParser = require('cookie-parser');
const { v4: uuidv4, validate } = require('uuid');


const app = express(); 
const PORT = 3000;

const gameUser = require('./user-game-info'); 
const gameWebLogin = require('./user-game-login'); 
const displayUserGameData = require('./user-game-web'); 
const invalidUser = require('./error-form-page'); 

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.get('/', (req, res) => {  
  const sid = req.cookies.sid;
  if(!sid || !gameUser.sessionID[sid] ||  !validate(sid)) {
    res.send(gameWebLogin.loginForm(gameUser)); 
    return; 
  }
  const { username } = gameUser.sessionID[sid];
  res.send(displayUserGameData.displayDataPage(gameUser, username));
  return;
});


app.post('/login', (req,res) => {
  const username = req.body.username.trim();
  const conditionRegex = /^[a-zA-Z0-9]+$/;
  const usernameCompare = username.match(conditionRegex);

  if(username === 'dog' || !username || !usernameCompare){
  
    res.status(401).send(invalidUser.displayPage()).end();
    return;
  }
  const sid = uuidv4();
  gameUser.sessionID[sid] = { username }; 


  res.cookie('sid', sid);
  res.redirect('/');
});

app.get('/invalid-username', (req,res) => {
    res.send(gameWebLogin.loginForm(gameUser)); 
    return;
  });


app.post('/storeData' , (req, res) =>{
  const sid = req.cookies.sid;
  const wordToStore = req.body.word.trim();
  const { username } = gameUser.sessionID[sid];
  gameUser.addInput(username, wordToStore);
  res.redirect("/") ;
});


app.post('/logout' , (req, res) => {
  const sid = req.cookies.sid;
  if (sid && validate(sid)) {
    delete gameUser.sessionID[sid];
  }
  res.clearCookie('sid');
  res.redirect("/") ;
});


app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
