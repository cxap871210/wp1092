const Message = {
    sender(parent, args, { db }, info) {
        return parent.sender.name;
    },
};

export { Message as default };