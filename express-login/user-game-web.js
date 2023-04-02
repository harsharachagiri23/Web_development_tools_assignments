const displayUserGameData = {
  displayDataPage: function(gameData, username) {
    
    return `
      <!doctype html>
      <html>
        <head>
          <title>WordGame</title>
          <link rel="stylesheet" href="loginform.css">
        </head>
        <body>
       
          <div id="form-app">
            <h1 class="form-heading"><b>Enter your word Message</b></h1>

            ${displayUserGameData.getOutputForm(gameData, username)}
          </div>
        </body>
      </html>
  `;
  },
  getOutputForm: function(gameData, username) {
    let wordStacked = '';
    if(gameData.wordInput[username] !== undefined){
      wordStacked = gameData.wordInput[username];
    }
     
    return `
      <h4 class=content>message updated: ${wordStacked}</h4>
      <form class="form-box" action="/storeData" method="POST">
        <input class="to-send" name="word" placeholder="Enter Word"/> 
        <br> 
        <button type="submit" class="btn-submit">Update Word</button>
      </form>
      <br>
      <form action="/logout" method="POST">
        <button type="submit" class="btn-logout">Logout</button>
      </form>
    `;
  }
};
module.exports = displayUserGameData;
