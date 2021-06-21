import "../App.css";

import { useEffect } from "react";
import { useQuery } from '@apollo/react-hooks';

import {
    MESSAGE_QUERY,
    MESSAGE_SUBSCRIPTION,
} from '../graphql';

const ChatBox = ({ me, chatbox_name }) => {

    const { loading, error, data, subscribeToMore } = useQuery(
        MESSAGE_QUERY,
        { variables: { chatbox_name: chatbox_name } }
    );

    useEffect(() => {
        try {
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: { chatbox_name: chatbox_name },
                updateQuery: (prev, { subscriptionData }) => {
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;

                    return {
                        ...prev,
                        messages: [...prev.messages, newMessage],
                    };
                },
            });
        } catch (e) {
            console.log('Subscription error', e.message);
        }
    }, [subscribeToMore, chatbox_name]);

    if (loading)
        return 'Loading...';

    if (error)
        return 'Something went wrong';

    return (
        <div>
            {data.messages.map((message, i) => (
                message.sender === me ?
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }} key={`${chatbox_name}${i}`}>
                        <p className="App-message">{message.body}</p>
                        <p>{message.sender}</p>
                    </div> :
                    <div style={{ display: 'flex', alignItems: 'flex-start' }} key={`${chatbox_name}${i}`}>
                        <p>{message.sender}</p>
                        <p className="App-message">{message.body}</p>
                    </div>
            ))}
        </div>
    );
};

export default ChatBox;