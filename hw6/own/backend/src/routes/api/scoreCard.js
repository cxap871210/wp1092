import { Router } from 'express';
import ScoreCard from '../../models/ScoreCard';

const router = Router();


router.post('/create-card', async function (req, res) {
  try {
    // TODO:
    // - Create card based on { name, subject, score } of req.xxx
    // - If {name, subject} exists,
    //     update score of that card in DB
    //     res.send({card, message}), where message is the text to print
    //   Else
    //     create a new card, save it to DB
    //     res.send({card, message}), where message is the text to print

    let r_name = req.body.name
    let r_subject = req.body.subject
    let r_score = req.body.score
    
    // console.log('add')
    // console.log(r_name, r_subject, r_score)
    
    const existing = await ScoreCard.findOne({ name: r_name, subject: r_subject})
    
    if(existing)
    {
      await ScoreCard.findOneAndUpdate({name:r_name, subject: r_subject}, {score: r_score})
      // console.log('update')
      let msg = 'Updating (' + r_name + ', ' + r_subject + ', ' + r_score + ')'
      res.send({card: true, message: msg})
    }
    else
    {
      const newCard = new ScoreCard({name:r_name, subject: r_subject, score: r_score});
      await newCard.save()
      // console.log('save')
      let msg = 'Adding (' + r_name + ', ' + r_subject + ', ' + r_score + ')'
      res.send({card: true, message: msg})
      
    }

    

  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

// TODO: delete the collection of the DB
// router.delete(...)
router.delete('/', async function (req, res) {
  try {
    
    await ScoreCard.deleteMany({});
    // console.log("Database deleted");
    res.send({message: 'Database cleared'})


  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});


// TODO: implement the DB query
// route.xx(xxxx)
router.get('/qqq', async function (req, res) {
  try {
    
    let q_type = req.query.queryType
    let q_string = req.query.queryString

    // console.log(q_string, q_type)
    
    let docs
    if (q_type === 'subject') {docs = await ScoreCard.find({ subject: q_string})}
    else {docs = await ScoreCard.find({ name: q_string})}
    // console.log(docs)

    if (docs.length === 0) 
    {
      let msg = q_type + '(' + q_string + ') not found!'
      res.send({messages: false, message: msg})
    }
    else
    {
      let msg = docs.map(doc =>'name: ' + doc.name + ', subject: ' + doc.subject + ', score: ' + doc.score)
      // console.log(msg)
      res.send({messages: true, message: msg})
    }


  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});

router.get('/ADqqq', async function (req, res) {
  try {
    
    let q_type = req.query.cmpType
    let q_1 = req.query.ADqueryString_1
    let q_2 = req.query.ADqueryString_2
    let q_oper = req.query.operType
    let q_SC = req.query.queryString_o

    let docs
    if (q_type === 'name')
    {
      docs = await ScoreCard.find({$or: [{ name: q_1 }, { name: q_2 }] })
    }
    else
    {
      docs = await ScoreCard.find({$or: [{ subject: q_1 }, { subject: q_2 }] })
    }

    let out = []
    if(q_oper === 'larger')
    {
      for(let i = 0 ; i < docs.length ; i++)
      {
        if(docs[i].score >= q_SC)
        {
          out.push(docs[i])
        }
      }
    }
    else
    {
      for(let i = 0 ; i < docs.length ; i++)
      {
        if(docs[i].score <= q_SC)
        {
          out.push(docs[i])
        }
      }
    }

    if(out.length === 0)
    {
      let msg = 'score of ' + q_type + ' (' + q_1 +' or ' + q_2 + ') ' + q_oper + ' than ' + q_SC + ' not found!'
      res.send({messages: false, message: msg})
    }
    else
    {
      let msg = out.map(doc =>'name: ' + doc.name + ', subject: ' + doc.subject + ', score: ' + doc.score)
      // console.log(msg)
      res.send({messages: true, message: msg})
    }
    
    


  } catch (e) {
    res.json({ message: 'Something went wrong...' });
  }
});



export default router;
