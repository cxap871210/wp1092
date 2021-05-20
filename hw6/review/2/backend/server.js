import express from 'express';
import mongo from './mongo.js';
import ScoreCard from './models/ScoreCard.js';
import cors from 'cors';
import routes from './routes/api/index.js';

mongo.connect()

const app = express()
app.use(cors());
app.use(express.json());
app.use('/api', routes);


const server = app.listen(process.env.PORT || 4000, () => {
  console.log('Listening on port ' + server.address().port);
});
