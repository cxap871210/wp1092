import { validateChatBox } from '../utility';

const Query = {
    sayHello() {
        return 'hello world';
    },

    async messages(parent, { chatbox_name }, contex, info) {
        let chatBox = await validateChatBox(chatbox_name);
        return chatBox.messages;
    }
}

export { Query as default };
