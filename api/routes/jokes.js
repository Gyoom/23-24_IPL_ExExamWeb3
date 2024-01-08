const router = require('express').Router()
const Joke = require('../models/joke')

// get all
router.get("/", async (req, res, next) => {
    // get data from database
    var jokes = []
    await Joke.find({})
      .then(dbJokes => jokes = dbJokes)
      .catch(e => {
          res.status(500).json()
          return
      })
  
    res.status(200).json(jokes)
})

// get One by Id
router.get("/:id", async (req, res, next) => {
    var id = req.params.id
    // get data from database
    var joke = {}
    await Joke.find({ _id:id })
      .then(dbJoke => joke = dbJoke[0])
      .catch(e => {
          console.log('API getOneById : db request :\n', e)
          res.status(500).json()
          return
      })
  
    res.status(200).json(joke)
  })
  
  // Insert One
  router.post("/", async (req, res, next) => {
    const newJoke = req.body
  
    if (newJoke.question == undefined || 
        newJoke.answer == undefined ||
        newJoke.category == undefined)
    {
        res.status(400).json()
        return
    }
    if (newJoke.question.length < 3 || 
        newJoke.answer.length < 3)
    {
        res.status(400).json()
        return
    }

    await Joke
      .create({
        question: newJoke.question,
        answer: newJoke.answer,
        category: newJoke.category
      })
      .catch(err => next(err))
  
    res.status(200).json(newJoke)
  })
  
  // delete One
  router.delete("/:id", async (req, res, next) => {
    var id = req.params.id
  
    await Joke.deleteOne({ _id:id })
  
    res.status(200).json()
  })



module.exports = router