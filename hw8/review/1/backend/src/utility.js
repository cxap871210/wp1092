import UserModel from './models/User';
import ChatBoxModel from './models/ChatBox';

export const makeName = (name, to) => {
    return [name, to].sort().join('_');
};

export const validateUser = async (name) => {
    const existing = await UserModel.findOne({ name });
    if (existing) return existing;
    console.log(`Creating user ${name}`);
    return new UserModel({ name }).save();
};

export const validateChatBox = async (name) => {
    let box = await ChatBoxModel.findOne({ name });
    if (!box) box = await new ChatBoxModel({ name }).save();
    return box
        .populate({ path: 'messages', populate: 'sender' })
        .execPopulate();
};