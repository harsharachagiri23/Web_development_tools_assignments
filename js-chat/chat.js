const userSessions = require('./sessions');

const messageData = {
  userChat : [],
  activeUsers : []
};

function prepareMessageList() {

  const messagesData = {};

  messagesData.getActiveUsers = function getActiveUsers() {
    return messageData.activeUsers;
  };

  messagesData.addChat = function addChat({username, message}) {
    messageData.userChat.push({username, message});
  };

  messagesData.addActiveUser = function addActiveUser(username) {
    messageData.activeUsers.push(username);
  };

  messagesData.getmessageData = function getmessageData(){
    return messageData;
  }

  messagesData.removeInactiveUser = function removeInactiveUser(username){
    const arr = messageData.activeUsers.filter( (value) => value !== username);
    messageData.activeUsers = arr
  }
  
  return messagesData;
};

module.exports = {
  prepareMessageList,
};
