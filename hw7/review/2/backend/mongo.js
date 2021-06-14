const mongoose = require('mongoose');
const dotenv =require('dotenv-defaults');

// i use mongodb://localhost:27017/cardmongo for MONGO_URL
dotenv.config();

if (!process.env.MONGO_URL) {
  console.error('Missing MONGO_URL!!!')
  process.exit(1)
}
else{
  console.log(process.env.MONGO_URL)
}
function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Mongo database connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

module.exports = mongo;
