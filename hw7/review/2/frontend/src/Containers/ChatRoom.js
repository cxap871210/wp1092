import "../App.css";
import { useState } from "react";
import { Tabs, Input, Tag} from "antd";
import useChatBox from "../hooks/useChatBox"
import ChatModal from "../Components/ChatModal"

const { TabPane } = Tabs;
const ChatRoom = ({ me }) => {
  
  const [messageInput, setMessageInput] =useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [activeKey, setActiveKey] = useState("")
  const {chatBoxes,createChatBox,removeChatBox,addMessage,checkChatBox}=useChatBox();
  const addChatBox = () => { setModalVisible(true); };
  /*
  const createChatBox = (friend) => {
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
    setActiveKey(newKey);
  };
  const removeChatBox = (targetKey) => {
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
    setActiveKey(newActiveKey);
  };
  */
  return (
    <> <div className="App-title">
      <h1>{me}'s Chat Room</h1> </div>
      <div className="App-messages">
        <Tabs type="editable-card" activeKey={activeKey}
          onChange={(key) => { setActiveKey(key);checkChatBox(me,key) }}
          onEdit={(targetKey, action) => {if (action === "add") addChatBox();
                                          else if (action === "remove") setActiveKey(removeChatBox(targetKey,activeKey)) ; }} >
          {chatBoxes.map((
            { friend, key, chatLog }) => {
            return (
              <TabPane tab={friend}
                key={key} closable={true}>
                <p>{friend}'s chatbox.</p>
                {chatLog.map( ({ name, body }, i) => {
                if(name==me){
                  console.log("same")
                  return(
                  <p className="App-message"  style={{textAlign:"right"}} key={i}>
                  <Tag color="blue" >{body}</Tag> {name}
                  </p>)
                }else{
                  return(<p className="App-message" key={i}>
                   {name}<Tag color="blue">{body}</Tag>
                  </p>)
                }}
          )
        }
              </TabPane>
            );
          })}
        </Tabs>
        <ChatModal
          visible={modalVisible}
          onCreate={({ name }) => {
            setActiveKey(createChatBox(name,me));
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
        placeholder=
        "Enter message here..."
        onSearch={(msg) => { setMessageInput("");console.log(msg);addMessage(me,activeKey,msg) }}
      ></Input.Search>
    </>);
};
export default ChatRoom;