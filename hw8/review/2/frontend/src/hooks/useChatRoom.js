import { useState, useEffect } from "react";

const useChatRoom = (me, activeKey) => {
    const [chatBoxes, setChatBoxes] = useState([]);

    const createChatBox = (friend, activeKey) => {
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
        //setActiveKey(newKey);
        console.log(newKey);
        return newKey;
    };

    const removeChatBox = (targetKey, activeKey) => {
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

        //setActiveKey(newActiveKey);
        if (targetKey !== '') {
            const sender = targetKey.split('_')[0] === me ? targetKey.split('_')[0] : targetKey.split('_')[1];
            const receiver = targetKey.split('_')[0] === me ? targetKey.split('_')[1] : targetKey.split('_')[0];
            let newactive = newActiveKey;
            if (newactive !== "") {
                newactive = newactive.split('_')[0] === me ? newactive.split('_')[1] : newactive.split('_')[0];
            }
            console.log(newactive);

            if (newactive === "") {
                //
            }
        }
        console.log(newActiveKey);
        return newActiveKey;
    };

    return { createChatBox, removeChatBox, chatBoxes };
};

export default useChatRoom
