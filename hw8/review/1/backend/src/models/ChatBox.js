const mongoose = require('mongoose');
const { Schema } = mongoose;

const chatBoxSchema = new Schema({
    name: { type: String, required: true },
    // users: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
    messages: [{ type: mongoose.Types.ObjectId, ref: 'Message' }],
});

export default mongoose.model('ChatBox', chatBoxSchema);
