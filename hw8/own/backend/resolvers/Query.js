const makeName = (name, to) => {
  return [name, to].sort().join('_');
};

const Query = {
  async users(parent, args, { db }, info) {
      return await db.UserModel.find();
  },

  async messages(parent, { name1, name2 }, { db }, info) {
    const box_name = makeName(name1, name2);
    const target_m = await db.ChatBoxModel.findOne({name: box_name}).select('messages');
    return target_m.messages ;
  },

  async senders(parent, { name1, name2 }, { db }, info) {
    const box_name = makeName(name1, name2);
    const target_s = await db.ChatBoxModel.findOne({name: box_name}).select('senders');
    return target_s.senders ;
  },
};


export { Query as default };
