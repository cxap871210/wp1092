import MessageModel from '../models/Message';

import { makeName, validateChatBox, validateUser } from '../utility';

const Mutation = {
    async createChatBox(parent, { name1, name2 }, context, info) {
        // console.log(`Create chatbox for ${name1}, ${name2}`);
        if (!name1 || !name2)
            throw new Error('Missing chatbox name for creating chatbox');

        await validateUser(name1);
        await validateUser(name2);

        let chatBoxName = makeName(name1, name2);
        let chatBox = await validateChatBox(chatBoxName);
        return chatBox;
    },

    async createMessage(parent, { sender, receiver, body }, { pubsub }, info) {
        // console.log(`Message '${body}' from '${sender}' to '${receiver}'`);
        if (!sender || !receiver)
            throw new Error('Missing sender/receiver for sending message');
        
        let senderObject = await validateUser(sender);
        await validateUser(receiver);

        let newMessage = new MessageModel({ sender: senderObject, body });
        await newMessage.save();

        let chatBoxName = makeName(sender, receiver);
        let chatBox = await validateChatBox(chatBoxName);
        chatBox.messages.push(newMessage);
        await chatBox.save();

        pubsub.publish(`chatbox_${chatBoxName}`, {
            message: newMessage
        });

        return newMessage;
    }
};

export { Mutation as default };
