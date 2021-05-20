import { Router } from "express";
import ScoreCard from "../../models/ScoreCard";

const router = Router();

router.post("/create-card", async function (req, res) {
  try {
    const card = new ScoreCard(req.body);
    res.status(200).json(card);
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print
  } catch (e) {
    res.json({ message: "Something went wrong..." });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete("./delete-card", async (req, res) => {
  try {
    ScoreCard.delete();
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(400).json({ msg: error });
  }
});


// TODO: implement the DB query
// route.xx(xxxx)

export default router;
