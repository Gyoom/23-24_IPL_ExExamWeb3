const router = require('express').Router()
const Score = require('../models/score') 
const Joke = require('../models/joke')
const joke = require('../models/joke')
const { ObjectId } = require('mongodb');

router.get("/", async (req, res, next) => {
    // get data from database
    var scores = []
    await Score.find({})
      .then(dbScores => scores = dbScores)
      .catch(e => {
          res.status(500).json()
          return
      })
  
    res.status(200).json(scores)
})

// Insert One
router.post("/", async (req, res, next) => {
  const newScore = req.body
  // check
  if (newScore.username == undefined || 
      newScore.date == undefined ||
      newScore.score == undefined ||
      newScore.joke == undefined)
  {
      res.status(400).json()
      return
  }
  if (newScore.username.length < 3)
  {
      res.status(400).json()
      return
  }
  var count = 0

  await Joke.find({ _id: newScore.joke })
    .then(dbJoke => count = dbJoke.length)
    .catch(err => next(err))

  if (count === 0)
  {
      res.status(404).json()
      return
  }
  var scoreExist = false;
  await Score.find({
    username: newScore.username,
    joke: newScore.joke
  })
  .then(dbScores => scoreExist = dbScores.length > 0)
  .catch(err => next(err))
  if (scoreExist)
  {
    res.status(409).json()
      return
  }
  // post
  await Score.create({
      username: newScore.username,
      date: newScore.date,
      score: newScore.score,
      joke: newScore.joke
    })
    .catch(err => next(err))
  
    res.status(200).json(newScore)
  })

module.exports = router