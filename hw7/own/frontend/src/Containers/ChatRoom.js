import "../App.css";
import ChatModal from "../Components/ChatModal";
import useChatBox from "../hooks/useChatBox";
import useChat from "../hooks/useChat";
import { useState } from "react"; 
import { Tabs, Input } from "antd";

import {CREATE_CHATBOX_MUTATION} from "../graphql/mutations"
import {CREATE_MESSAGE_MUTATION} from "../graphql/mutations"
import {GET_MESSAGES_QUERY} from "../graphql/query"
import { useQuery, useMutation } from '@apollo/react-hooks';

const { TabPane } = Tabs;
const ChatRoom = ({ me, displayStatus }) => {
    
    const [messageInput, setMessageInput] = useState("");
    const [activeKey, setActiveKey] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [all_M, set_all_M] = useState([]);
    const [all_S, set_all_S] = useState([]);
    const [TO, set_TO] = useState([]);

    const {sendMessage} = useChat();
    const {chatBoxes, createChatBox, removeChatBox} = useChatBox() ;

    const [addbox] = useMutation(CREATE_CHATBOX_MUTATION);
    const [addmessage] = useMutation(CREATE_MESSAGE_MUTATION);


    const addChatBox = () => { setModalVisible(true); };

    let put = []
    for(let i = 0 ; i < all_M.length ; i++)
    {
        put.push(<h3 key = {"M_"+i}>{all_S[i]}:{all_M[i]}</h3>)
    }
    

    return (
    <> 
        <div className="App-title">
            <h1>{me}'s Chat Room</h1> 
        </div>
        <div className="App-messages"> 
            <Tabs 
                type="editable-card" 
                activeKey={activeKey}
                onChange={async (key) => { 
                    await setActiveKey(key); 
                    await set_TO(key.split('_')[1]) ;

                    const T1 = await addbox({
                        variables: {
                          name1: me,
                          name2: TO,
                        },
                      });
                    // console.log(T.data.createChatBox.senders);
                    await set_all_M(T1.data.createChatBox.messages) ;
                    await set_all_S(T1.data.createChatBox.senders) ;
                }}
                onEdit={(targetKey, action) => {
                    if (action === "add") addChatBox();
                    else if (action === "remove") setActiveKey(removeChatBox(targetKey, activeKey));
                }}
            >
                {chatBoxes.map(({ friend, key, chatLog }) => {
                return (
                    <TabPane tab={friend} key={key} closable={true}>
                        <p></p>
                    </TabPane>
                    );
                })}
            </Tabs>
            <ChatModal
                visible={modalVisible}
                onCreate= {async ({ name }) => {
                    await setActiveKey(createChatBox(name, me));
                    set_TO(name) ;
                    
                    setModalVisible(false);
                    
                    try{
                        const T = await addbox({
                            variables: {
                              name1: me,
                              name2: name,
                            },
                          });
                        // console.log(T.data.createChatBox.senders);
                        await set_all_M(T.data.createChatBox.messages) ;
                        await set_all_S(T.data.createChatBox.senders) ;
                    }
                    catch(e){
                        console.log(e) ;
                    }
                    
                }}
                onCancel={() => {
                    setModalVisible(false);
                }}

            />
            {put}
            </div>
            <Input.Search
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                enterButton="Send"
                placeholder="Enter message here..."
                onSearch={async (msg) =>{ 
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
                    sendMessage({ key: activeKey, body: msg });

                    try{
                        await addmessage({
                            variables: {
                              name1: me,
                              name2: TO,
                              body_input:msg
                            },
                          });

                          const T3 = await addbox({
                            variables: {
                              name1: me,
                              name2: TO,
                            },
                          });
                        // console.log(T.data.createChatBox.senders);
                        await set_all_M(T3.data.createChatBox.messages) ;
                        await set_all_S(T3.data.createChatBox.senders) ;
                    }
                    catch(e){
                        console.log(e) ;
                    }


                    
                    setMessageInput(""); }}
                    
            ></Input.Search>
    </>);
};
export default ChatRoom;
 