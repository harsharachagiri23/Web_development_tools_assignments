const wordInput = {};

const sessionID = {};

function addInput(username, text) { 
 
  wordInput[username] = text;
}

const gameUser = {
  wordInput,
  sessionID,
  addInput
};

module.exports = gameUser;

