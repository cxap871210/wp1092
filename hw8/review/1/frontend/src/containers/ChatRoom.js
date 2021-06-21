import "../App.css";

import { useEffect, useState } from "react"; 
import { useMutation } from '@apollo/react-hooks';
import { Tabs, Input } from "antd";

import ChatModal from './ChatModal';
import ChatBox from './ChatBox';

import {
    CREATE_CHATBOX_MUTATION,
    CREATE_MESSAGE_MUTATION,
} from '../graphql';

const { TabPane } = Tabs;

const ChatRoom = ({ me, displayStatus }) => {
    const [messageInput, setMessageInput] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [activeKey, setActiveKey] = useState("");
    const [chatBoxes, setChatBoxes] = useState([]);
    const [currentBox, setCurrentBox] = useState(null);

    const [addChatBox] = useMutation(CREATE_CHATBOX_MUTATION);
    const [addMessage] = useMutation(CREATE_MESSAGE_MUTATION);

    useEffect(() => {
        setCurrentBox(chatBoxes.find(box => box.key === activeKey));
    }, [activeKey, chatBoxes]);

    const createChatBox = async (friend) => {
        let newKey = me <= friend ? `${me}_${friend}` : `${friend}_${me}`;
        if (chatBoxes.some(({ key }) => key === newKey))
            throw new Error(friend + "'s chat box has already opened.");
        await addChatBox({
            variables: {
                name1: me,
                name2: friend,
            }
        });
        let chatLog = [];
        let newChatBoxes = [...chatBoxes]; 
        newChatBoxes.push({ friend, key: newKey, chatLog });
        setChatBoxes(newChatBoxes);
        setActiveKey(newKey);
    };

    const removeChatBox = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex;
        chatBoxes.forEach(({ key }, i) => {
            if (key === targetKey) { lastIndex = i - 1; }
        });
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

    return (
        <>
            <ChatModal
                visible={modalVisible}
                onCreate={({ name }) => {
                    createChatBox(name);
                    setModalVisible(false);
                }}
                onCancel={() => {
                    setModalVisible(false);
                }}
            />
            <div className="App-title">
                <h1>{me}'s Chat Room</h1>
            </div>
            <div className="App-messages">
                <Tabs
                    type="editable-card"
                    activeKey={activeKey}
                    onChange={(key) => { setActiveKey(key); }}
                    onEdit={(targetKey, action) => {
                        if (action === 'add') setModalVisible(true)
                        else if (action === "remove") removeChatBox(targetKey, activeKey);
                    }}
                >
                    {chatBoxes.map((
                        { friend, key }) => {
                        return (
                            <TabPane tab={friend} key={key} closable={true}>
                                <ChatBox me={me} chatbox_name={key} setChatBoxes={setChatBoxes}/>
                            </TabPane>
                        );
                    })}
                </Tabs>
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
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
                    // let friend = chatBoxes.find(box => box.key === activeKey).friend;
                    addMessage({
                        variables: {
                            sender: me,
                            receiver: currentBox.friend,
                            body: msg,
                        }
                    });
                    setMessageInput("");
                }}
            ></Input.Search>
        </>);
};

export default ChatRoom;
