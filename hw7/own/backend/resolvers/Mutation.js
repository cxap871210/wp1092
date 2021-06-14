const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Mutation = {
  
  async createUser(parent, args, { db }, info) {

    const newUser = new db.UserModel({name:args.name});
    await newUser.save();

    return newUser;
  },

  async createChatBox(parent, { name1, name2 }, { db, pubsub }, info){

    const existing1 = await db.UserModel.findOne({ name: name1});
    if(existing1 === null){
      const newUser = new db.UserModel({name:name1});
      await newUser.save();
    }

    const existing2 = await db.UserModel.findOne({ name: name2});
    if(existing2 === null){
      const newUser = new db.UserModel({name:name2});
      await newUser.save();
    }

    const box_name = makeName(name1, name2);
    const existing_box = await db.ChatBoxModel.findOne({name: box_name});
        
    if(existing_box === null){
      const newChatbox = new db.ChatBoxModel({name:box_name, messages:[], senders:[]});
      await newChatbox.save();
      
      return newChatbox ;
      // return newChatbox.populate('messages').execPopulate() ;
    }
    else
    {
      return await db.ChatBoxModel.findOne({name: box_name});
    }    

  },
  async createMessage(parent, { name1, name2, body_input }, { db, pubsub }, info){

    const newMessage = new db.MessageModel({sender:name1, body:body_input});
    await newMessage.save();

    const box_name = makeName(name1, name2);
    const target_m = await db.ChatBoxModel.findOne({name: box_name}).select('messages');
    const target_s = await db.ChatBoxModel.findOne({name: box_name}).select('senders');
    
    const newM = [...target_m.messages, body_input];
    const newS = [...target_s.senders, name1];
    // // console.log(target.messages) ;
    
    await db.ChatBoxModel.findOneAndUpdate({name: box_name}, {messages:newM, senders:newS});
    const temp_box = await db.ChatBoxModel.findOne({name: box_name}) ;
    // await temp.populate('messages').execPopulate() ;
    
    pubsub.publish(`chatbox ${box_name}`, {
      chatbox: { mutation: 'UPDATED', data: temp_box,},
    });

    
    
    return newMessage;

  },
  async deleteAllUser(parent, args, { db }, info) {
    await  db.UserModel.deleteMany({});
    return 'All user deleted'
  },
  async deleteAllChatBox(parent, args, { db }, info) {
    await  db.ChatBoxModel.deleteMany({});
    return 'All chatbox deleted'
  },
  async deleteAllMessage(parent, args, { db }, info) {
    await  db.MessageModel.deleteMany({});
    return 'All message deleted'
  },
  async deleteAll(parent, args, { db }, info) {
    await  db.UserModel.deleteMany({});
    await  db.ChatBoxModel.deleteMany({});
    await  db.MessageModel.deleteMany({});

    return 'All deleted'
  },
};

export { Mutation as default };