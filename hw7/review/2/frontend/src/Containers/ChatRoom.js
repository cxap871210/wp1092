import "../App.css";
import { useState, useEffect } from "react";
import { Tabs, Tag, Input } from "antd";
import ChatModal from "../components/ChatModal";
import useChatBox from "../hook/useChatBox";
import useChat from "../hook/useChat";

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
  const client = new WebSocket('ws://localhost:8080')
  const [messageInput, setMessageInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("");
  const {chatBoxes, setChatBoxes, createChatBox, removeChatBox} = useChatBox(client);
  const {sendMessage} = useChat(client);
  const [chatmessages, setchatmessages] = useState([]);
  const [chatmessage, setchatmessage] = useState();
  const [type, settype] = useState(0);

  const addChatBox = () => { setModalVisible(true); };

  useEffect(() => {
      let newChatBoxes = [...chatBoxes];
      let newchatbox = newChatBoxes.findIndex(x => (x.key === activeKey));
      console.log(chatBoxes, newchatbox, activeKey)
      if(newchatbox !== -1){
        if(newChatBoxes[newchatbox].chatLog !== chatmessages){
          newChatBoxes[newchatbox].chatLog = chatmessages;
          setChatBoxes(newChatBoxes);
        }
        if(chatmessage){
          newChatBoxes[newchatbox].chatLog.push(chatmessage);
          setChatBoxes(newChatBoxes);
          setchatmessage();
        }
      }
  }, [chatmessages, chatmessage])

  client.onmessage = (byteString) => {
    //console.log("m")
    const {type, data} = JSON.parse(byteString.data);   
    switch (type) {
      case 'CHAT': {
        setchatmessages(data.messages);
        break;
      }
      case 'MESSAGE': {
        console.log(data.message)
        setchatmessage(data.message);
        break;
      }
      default: break;
    }
  }

  return (
    <>
    <div className="App-title">
        <h1>{me}'s Chat Room</h1>
    </div>
    <div className="App-messages">
        <Tabs 
            type="editable-card"
            onEdit={(targetKey, action) => {
                if (action === "add") addChatBox();
                else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
            }}
            activeKey={activeKey}
            onChange={(key) => { setActiveKey(key); }}
        >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
                return (
                    <TabPane tab={friend} 
                      key={key} closable={true}>
                      <p>{friend}'s chatbox.</p>
                      { chatLog? 
                        (chatLog.map(({name, body},i) => {
                          return(
                          <p>
                          <Tag color="blue">{name}</Tag> {body}
                          </p>
                          )
                        })) : 
                        (<p>No chatlog...</p>)
                      }
                    </TabPane>
                );
            })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(me, name));
            setModalVisible(false);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />

    </div>
    <Input.Search
        value={messageInput}
        onChange={(e) => 
        setMessageInput(e.target.value)}
        enterButton="Send"
        placeholder="Enter message here..."
        onSearch={(msg) => {
            if (!msg) {
              displayStatus({
                type: "error",
                msg: "Please enter message.",
              });
              return;
            } else if (activeKey === "") {
              displayStatus({
                type: "error",
                msg: "Please add a chatbox first.",
              });
              setMessageInput("");
              return;
            }
            sendMessage({ from: me, key: activeKey, body: msg });
            setMessageInput("");
          }}
  
    ></Input.Search> 
    </>);
};

    export default ChatRoom;
      