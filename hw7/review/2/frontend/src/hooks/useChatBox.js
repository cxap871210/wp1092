import { useState } from "react"; 
const client = new WebSocket('ws://localhost:8080')
const useChatBox = () => {
    
    const [chatBoxes, setChatBoxes] = useState([
        
      ]);
    client.onmessage=(byteString)=>{
    console.log("re")
    
    const {type,data}=JSON.parse(byteString.data);
    console.log(type);
    console.log(data);
    switch(type){
        case("MESSAGE"):{
            const from =data.message.name;
            recMessage([...chatBoxes],from,data.message.body);
        }
        case("CHAT"):{
            
           const boxname =data.boxname;
            recChat([...chatBoxes],boxname,data.messages)
        }
    }


    }
    
    const sendChatBox=async (me,friend)=>{
        await client.send(JSON.stringify({
            type: 'CHAT',
            data: { name:me, to:friend }
        }))
    }
    const sendMessage=async(me,friend,msg)=>{
        await client.send(JSON.stringify({
            type: 'MESSAGE',
            data: { name:me, to:friend ,body:msg}
        }))
    }
    const createChatBox = (friend,me) => {
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          throw new Error(friend +
                          "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        sendChatBox(me,friend);

       return newKey;
      };
      const checkChatBox=(me,key)=>{
        const  box =chatBoxes.find(box=>(box.key==key));
        const friend=box.friend;
        sendChatBox(me,friend);
      }
      const removeChatBox = (targetKey,activeKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
          if (key === targetKey) { lastIndex = i - 1; }});
        const newChatBoxes = chatBoxes.filter(
          (chatBox) => chatBox.key !== targetKey);
        if (newChatBoxes.length) {
          if (newActiveKey === targetKey) {
            if (lastIndex >= 0) {
              newActiveKey = newChatBoxes[lastIndex].key;
            } else { newActiveKey = newChatBoxes[0].key; }
          }
        } else newActiveKey = ""; // No chatBox left
        setChatBoxes(newChatBoxes);
        return newActiveKey;
      };
      const addMessage=(me,key,msg)=>{
        console.log(chatBoxes)
        const  newChatBoxes=[...chatBoxes];
        const  box =newChatBoxes.find(box=>(box.key==key))
        console.log(box);
        box.chatLog.push({name:me,body:msg})
        const friend=box.friend
        setChatBoxes(newChatBoxes);
        sendMessage(me,friend,msg)
      }
      const recMessage=(newChatBoxes,friend,msg)=>{
       // const  newChatBoxes=[...chatBoxes];
        console.log(friend);
        console.log(chatBoxes);
        
        const  box =newChatBoxes.find(box=>(box.friend==friend))
        if(box){
            console.log(box);
       
            box.chatLog.push({name:friend,body:msg})
            setChatBoxes(newChatBoxes);
        }
      }
      const recChat=(newChatBoxes,boxname,msgs)=>{
        const  box =newChatBoxes.find(box=>(box.key==boxname))
        if(box){
            console.log(box);
            console.log(msgs);
       
            box.chatLog=msgs
            setChatBoxes(newChatBoxes);
        }
      }
    
  return {chatBoxes, createChatBox, removeChatBox ,addMessage,checkChatBox};
};
export default useChatBox;