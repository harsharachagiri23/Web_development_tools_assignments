const invalidInputForm = {
  displayPage: function() {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Username not valid</title>
          <link rel="stylesheet" href="loginform.css">
        </head>
        <body>
       
          <div id="invalid-info">
            <h1 class="invalid-header"><b>401 error⚠️</b></h1>
            <br>
            <h4 class="content">(Please enter a valid username)</h4> 
            <br>
            ${invalidInputForm.displayForm()}
          </div>
        </body>
      </html>
  `;
  },

  displayForm: function() {
    return `
      <form action="/invalid-username" method="GET"> 
        <button type="submit" class="btn-submit">Go to login</button>
      </form>
    `;
  }
};
module.exports = invalidInputForm;
