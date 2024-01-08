// npm packages 
import React, { useState, useEffect } from "react"
// react services
import scoresServices from "services/scoreApi"
import jokesServices from "services/jokeApi"

const Context = React.createContext(null)

    
const ProviderWrapper = (props) => {
    const [ scores, setScores ] = useState([])
    const [ jokes, setJokes ] = useState([])
    

    useEffect(() => {
        const fetchData = async () => {
            var scores = []
            var jokes = []

            await scoresServices.getAll()
            .then(dbScores =>{
                scores = dbScores;
            })
            await jokesServices.getAll()
            .then(dbJokes => {
                jokes = dbJokes
            })

            for (let index = 0; index < jokes.length; index++) {
                var tempScores = []
                tempScores = scores.filter(s => s.joke === jokes[index].id)
                jokes[index].scoreCount = tempScores.length
                var avrScore = 0
                tempScores.forEach(score => {
                    avrScore += score.score
                })
                jokes[index].averageScore = avrScore / tempScores.length
            }
            setJokes(jokes)
            setScores(scores)
        }
        fetchData()


    }, [])


    const getJokeWithScores = (id) => {
        var currentJoke = jokes.find(j => j.id === id)
        
        var tempScores = []
        tempScores = scores.filter(s => s.joke === currentJoke.id)
        
        currentJoke.scores = tempScores
        currentJoke.scores.sort((a, b) => {
            if (b.score === a.score) {
                return +new Date(b.date) - +new Date(a.date);
            }
            return b.score - a.score;
        });
        
        currentJoke.scoreCount = tempScores.length
        
        var avrScore = 0
        tempScores.forEach(score => {
            avrScore += score.score
        })
        currentJoke.averageScore = avrScore / tempScores.length

        return currentJoke
    }

    const addScore = async (newScore) => {
        await scoresServices.createOne(newScore)
    }
    
    const exposedValue = {
        scores,
        jokes,
        getJokeWithScores,
        addScore
    }
    
    return (
        <Context.Provider value={exposedValue}>
            { props.children }
        </Context.Provider> 
        )   
}
    
export {    
    Context,
    ProviderWrapper,    
}