function Chat({
  messageData, chatters
}) {
  console.log("Chat inside chat component : ",messageData);
  console.log("Active users inside chat component : ",chatters);

  return (
    <div className="inside_login">
      { }
      { }

      <h2 className="text" > Active Users : </h2>  
      <ul className="active-users">
          { Object.values(chatters).map( user => (
            <li key={user}>
              <div className= "user-info">
                <p className="user"> {user}</p>
              </div>
            </li>
          ))}
        </ul>

      <h2 className="text" > Messages : </h2>  
        <ul className="chat">
          { Object.values(messageData).map( chat => (
            <li key={chat.id}>
              <div className= "message">
                <div className="sender-info">      
                    <span className="username" data-id={chat.id}>
                      {chat.username}
                      <p className="message-text"> {chat.message}</p>
                    </span>
                </div>
                
              </div>
            </li>
          ))}
        </ul>
      { }
    </div>
  );
}

export default Chat;
