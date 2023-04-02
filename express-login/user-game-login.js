const gameLogin = {
  loginForm: function(chat) {
   
    return `
      <!doctype html>
      <html>
        <head>
          <title>Application Login Form</title>
          <link rel="stylesheet" href="loginform.css">
        </head>
        <body>
       
          <div id="login-form">
          <h1 class="form-heading"><b> Login Here</b></h1>
          <br>
            ${gameLogin.getOutputForm(chat)}
          </div>
         
        </body>
      </html>
    `;
  },

  getOutputForm: function() {
   
    return `
      <form action="/login" method="POST">
        <input class="to-send" name="username" placeholder="Enter Username"/>
        <br>
        <button type="submit" class="btn-submit">Login</button>
      </form>
    `;
  }
};
module.exports = gameLogin;
