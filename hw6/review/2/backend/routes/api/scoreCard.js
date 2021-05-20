import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard.js';
import bodyParser from 'body-parser';

const router = Router();

router.use(bodyParser.json());

router.post('/create-card', (req, res) => {
  const { name, subject, score } = req.body;

  try {
    ScoreCard.findOneAndUpdate(
      { name: name ,
        subject: subject 
      }, {
        $set: { score: score }
      }
    ).then( e => {
      if ( e != null ){
        console.log(`Successfully updated document: ${e}.`)
        res.json({ message: `Updating ( ${name} ${subject} ${score} )` })
      } else {
        const sc = new ScoreCard(req.body);
        sc.save();
        res.json({ message: `Adding ( ${name} ${subject} ${score} )` })
      }
    })
  } catch (e) {
      res.json({ message: 'Something went wrong...' });
  }

});

router.post('/clear', (req, res) => {
  try {
    ScoreCard.deleteMany({}, () => {
      res.json({ message: 'Database cleared.' });
    });
  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

router.post('/query', (req, res) => {
  const { QName, QSubject, QScore, QNameString, QSubjectString, QScoreString, sort, sortMethod } = req.body;
  const query = {};
  if (QName==='Y') query['name'] = QNameString;
  if (QSubject==='Y') query['subject'] = QSubjectString;
  if (QScore==='Y') query['score'] = QScoreString;

  try {
    ScoreCard.find( query )
      .then( e => {
        if (e.length != 0 ){
          let msg = ['name / subject / score\n'];
          if (sort==='Y') {
            (sortMethod==='H') ? 
              e.sort((a,b) => b.score - a.score)
              : e.sort((a,b) => a.score - b.score)
          }

          for ( var i in e ) {
            msg.push(e[i].name + ' ' + e[i].subject + ' ' + e[i].score + '\n');
          }
          res.json({ messages: msg , message:'' })
        } else {
          let msg = '';
          for ( var i in query ){
            msg = msg.concat(i + ' ( ' + query[i] + ' ) ');     
          }
          msg = msg.concat('not found!\n');
          res.json({ message: msg })
        }


      })
  } catch (e) {
      res.json({ message: 'Something went wrong...' });
  }
})

export default router;