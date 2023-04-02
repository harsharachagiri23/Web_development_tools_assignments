const uuid = require('uuid').v4;

const messageData = [];
let chatters = [];

function makeMessageDataList() {

  const chatList = {};

  chatList.getchatters = function getchatters() {
    return chatters;
  };

  chatList.addChat = function addChat({username, message}) {
    messageData.push({username, message, id : uuid()});
  };

  chatList.addChatter = function addChatter(username) {
    chatters.push(username);
  };

  chatList.getChatData = function getChatData(){
    return messageData;
  }

  chatList.removeChatter = function removeChatter(username){

    const arr = chatters.filter( (value) => value !== username)
    chatters = arr
  }
  
  return chatList;
};

module.exports = {
  makeMessageDataList,
};