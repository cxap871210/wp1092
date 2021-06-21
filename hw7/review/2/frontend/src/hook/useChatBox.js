import { useState } from "react"; 
const useChatBox = (client) => {
    //const client = new WebSocket('ws://localhost:8080')
    const [chatBoxes, setChatBoxes] = useState([]);

    const sendMessage = async (payload) => {
      const data = {
        type: 'CHAT',
        data: payload
      }
      await client.send(
        JSON.stringify(data));
    }

    const createChatBox = (me, friend) => {
        const newKey = me <= friend ?
              `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey)) {
          throw new Error(friend + "'s chat box has already opened.");
        }
        const newChatBoxes = [...chatBoxes];
        const chatLog = [{name: "1", body: "2"}];
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        sendMessage({ name: me, to: friend });
        
        return newKey;
    };
    
    const removeChatBox = (targetKey, activeKey) => {
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

    return { chatBoxes, setChatBoxes, createChatBox, removeChatBox };
};
export default useChatBox;
