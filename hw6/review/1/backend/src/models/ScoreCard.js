// TODO: Define ScoreCardSchema
//   name   : String
//   subject: String
//   score  : Number
// export default model('ScoreCard', scoreCardSchema);
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ScoreCardSchema = Schema(
  {
    name: String,
    subject: String,
    score: Number, 
  }
);

const exportSchema = mongoose.model("ScoreCard", ScoreCardSchema);

export default exportSchema;
