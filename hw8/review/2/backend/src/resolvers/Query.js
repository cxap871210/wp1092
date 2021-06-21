const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Query = {
  async getChatBox(parent, {name1, name2}, { db }, info) {
    const validateChatBox = async (name) => {
      let box = await db.ChatBoxModel.findOne({ name });
      //if (!box) box = await new db.ChatBoxModel({ name }).save();
      return box;
    };
    if(!name1 || !name2) {
      return;
    }
    const chatBoxName = makeName(name1, name2);
    const chatBox = await validateChatBox(chatBoxName);
    return chatBox;
  },
  async findUser(parent, args, { db }, info) {
    const name = args.query;
    if(!name) {
      return;
    }
    return db.UserModel.findOne({name});
  }
}
export { Query as default };
