import { useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { CHATBOX_QUERY, MESSAGE_SUBSCRIPTION } from "../graphql";
import Message from '../Components/Message';

const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

const ChatBox = ({ me, friend }) => {
    const messageRef = useRef();
    const scrollToBottom = () => {
        messageRef.current.scrollIntoView({ behavior: "smooth" })
    }
    const { loading, error, data, subscribeToMore } = useQuery(CHATBOX_QUERY, { variables: { "name1": me, "name2": friend } });
    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { "name": makeName(me, friend) },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message.data;
                    return {
                        ...prev,
                        messages: newMessage,
                    };
                },
            });
        } catch (e) { }
        if (messageRef.current) {
            scrollToBottom();
        }
    }, [subscribeToMore, data]);
    return (
        <div style={{ overflow: "auto", height: "180px" }}>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error :(</p>
            ) : (data.getChatBox.messages.length === 0 ? (
                <p style={{ color: '#ccc' }}> No messages... </p>) :
                (data.getChatBox.messages.map(({ sender, body }, i) => (
                    <Message key={i} name={sender.name} me={me} body={body} />
                )))
            )}
        <div ref={messageRef}></div>
        </div>
    )
}

export default ChatBox