import ChatBox from "./ChatBox";

const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Mutation = {
  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info) {
    if(!name1 || !name2){
      return false;
    }
    const checkUser = async (name) => {
      const existing = await db.UserModel.findOne({ name });
      return existing
    };
    const newUser = async (name) => {
      return new db.UserModel({ name }).save();
    };
    const validateChatBox = async (name) => {
      let box = await db.ChatBoxModel.findOne({ name });
      if (!box) box = await new db.ChatBoxModel({ name }).save();
      return box;
    };
    if (!name1 || !name2)
      throw new Error("Missing chatBox name for CreateChatBox");
    if (!(await checkUser(name1))) {
      console.log("User does not exist for CreateChatBox: " + name1);
      await newUser(name1);
    }
    if (!(await checkUser(name2))) {
      console.log("User does not exist for CreateChatBox: " + name2);
      await newUser(name2);
    }
    const chatBoxName = makeName(name1, name2);
    const chatBox = await validateChatBox(chatBoxName);
    pubsub.publish(chatBoxName, { 
      message: {
        data: chatBox 
      }
    });
    return chatBox;
  },
  async createMessage(parent, { name, to, body }, { db, pubsub }, info) {
    const checkUser = async (name) => {
      const existing = await db.UserModel.findOne({ name });
      return existing
    };
    const newUser = async (name) => {
      return new db.UserModel({ name }).save();
    };
    const validateChatBox = async (name) => {
      let box = await db.ChatBoxModel.findOne({ name });
      if (!box) box = await new db.ChatBoxModel({ name }).save();
      return box;
    };

    const chatBoxName = makeName(name, to);
    const sender = await checkUser(name);
    const receiver = await checkUser(to);
    const chatBox = await validateChatBox(chatBoxName);
    const newMessage = new db.MessageModel({ sender, body });
    await newMessage.save();
    chatBox.messages.push(newMessage);
    await chatBox.save();
    //console.log(newMessage);
    pubsub.publish(chatBoxName, { 
      message: {
        data: chatBox 
      }
    });
    return newMessage;
  }
};

export { Mutation as default };
