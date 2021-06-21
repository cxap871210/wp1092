const Message = {
    sender(parent, args, { db }, info) {
        const user = parent.sender;
        return db.UserModel.findOne({"_id": user});
    },
};
export { Message as default };