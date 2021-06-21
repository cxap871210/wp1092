import { useState } from "react";  
const useChat = (client) => {
  //const client = new WebSocket('ws://localhost:8080')
  const [status, setStatus] = useState({}); // { type, msg }
  /*
  const sendMessage = (payload) => {
    console.log(payload);
  }; // { key, msg }
  */
  
  const sendMessage = (payload) => {
    const {from, key, body} = payload;
    const names = key.split("_");
    const to = (names[0] === from)? names[1] : names[0];
    const data = {
      name: from,
      to: to,
      body: body 
    }
    sendData({type: 'MESSAGE', data: data});
  };
  const sendData = async (data) => {
    await client.send(
        JSON.stringify(data));
  };
  return { status, sendMessage };
};
export default useChat;
