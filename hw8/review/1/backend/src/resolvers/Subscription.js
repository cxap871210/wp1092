import ChatBoxModel from '../models/ChatBox';

const Subscription = {
    message: {
        async subscribe(parent, { chatbox_name }, { db, pubsub }, info) {
            let box = await ChatBoxModel.findOne({ name: chatbox_name });

            if (!box) {
                throw new Error('Chatbox not found!');
            }

            return pubsub.asyncIterator(`chatbox_${chatbox_name}`);
        }
    }
}

export { Subscription as default };
