import express from 'express'
import getNumber from '../core/getNumber'
var fs = require('fs')

let today = new Date();
let date = today.getFullYear()+'-' + (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getHours() + "-" + today.getMinutes();
let time = ''
let path = './server/log/' + date + '.log'

let record = ''

const router = express.Router()

function roughScale(x, base) {
  const parsed = parseInt(x, base)
  if (isNaN(parsed)) {
    return 0
  }
  return parsed
}
// let fso=new ActiveXObject(Scripting.FileSystemObject)

// Just call getNumber(true) to generate a random number for guessing game
router.post('/start', (_, res) => {
  today = new Date();
  time = today.getFullYear()+'-' + (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getHours() + "-" + today.getMinutes() + '-' + today.getSeconds();
  
  getNumber(true)
  
  if (record !== '')
  {
    record = record + '\n'
  }
  record = record + 'start number = ' + getNumber(true).toString() + ' ' + time
  fs.writeFile(path, record,function (error) {})

  res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
  today = new Date();
  time = today.getFullYear()+'-' + (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getHours() + "-" + today.getMinutes() + '-' + today.getSeconds();

  const number = getNumber()
  const guessed = roughScale(req.query.number, 10)
  // console.log('guessed:', guessed)

  // check if NOT a num or not in range [1,100]
  if (!guessed || guessed < 1 || guessed > 100) {
    res.status(400).send({ msg: 'Not a legal number.' })
  }
  else {
  // TODO: check if number and guessed are the same,
  // and response with some hint "Equal", "Bigger", "Smaller"
    if (guessed === number)
    {
      res.send({msg: 'Equal!'})
      record = record + '\nguess ' + guessed.toString() + ' ' + time + '\nendgame'
      fs.writeFile(path, record,function (error) {})
    }
    else if (guessed > number)
    {
      res.send({msg: 'Smaller'})
      record = record + '\nguess ' + guessed.toString() + ' ' + time
      fs.writeFile(path, record,function (error) {})
    }
    else if (guessed < number)
    {
      res.send({msg: 'Bigger'})
      record = record + '\nguess ' + guessed.toString() + ' ' + time
      fs.writeFile(path, record,function (error) {})
    }
  }

})

// TODO: add router.post('/restart',...)
router.post('/restart', (_, res) => {
  today = new Date()
  time = today.getFullYear()+'-' + (today.getMonth()+1) + '-' + today.getDate() + '-' + today.getHours() + "-" + today.getMinutes() + '-' + today.getSeconds()
  
  getNumber(true)

  record = record + '\nrestart number = ' + getNumber(true).toString() + ' ' + time
  fs.writeFile(path, record,function (error) {})
  res.json({ msg: 'The game has Re-started.' })
})

export default router
