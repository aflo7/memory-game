import React, { useState, useEffect } from "react"
import "./css/game.css"
import Pic from "./Pic"
import Header from "./Header"
import swal from "sweetalert"
import "./css/swal.css"

const cardsPng = [
  "./cards/2_of_spades.png",
  "./cards/3_of_spades.png",
  "./cards/4_of_spades.png",
  "./cards/5_of_spades.png",
  "./cards/6_of_spades.png",
  "./cards/7_of_spades.png",
  "./cards/8_of_spades.png",
  "./cards/9_of_spades.png",
  "./cards/10_of_spades.png",
  "./cards/jack_of_spades2.png"
]

const Game = () => {
  const [score, setScore] = useState(0)
  const [currLevel, setCurrLevel] = useState()
  const [cardsArr, setCardsArr] = useState([])
  const [canAdvance, setCanAdvance] = useState()
  const [foundArr, setFoundArr] = useState([])
  const [spades] = useState(cardsPng)

  const begin = () => {
    setCanAdvance(false)
    setCardsArr([])
    setFoundArr([])

    for (let i = 0; i < currLevel; i++) {
      setCardsArr((p) => [...p, i])
      setFoundArr((p) => [...p, i])
    }
  }

  const checkCardsArr = (key) => {
    let found = false
    for (let i = 0; i < cardsArr.length; i++) {
      if (cardsArr[i] === key) {
        console.log("+1 point")
        let newCardsArr = cardsArr
        newCardsArr.splice(i, 1)

        setCardsArr(newCardsArr)

        found = true
        setScore((prevScore) => prevScore + 1)
      }
    }

    if (cardsArr.length === 0) {
      console.log("advance is possible")
      setCanAdvance(true)
    }

    if (!found) {
      swal("You lose")
      setCurrLevel(4)
      setScore(0)
      begin()
    }
  }

  // this useEffect runs once on mount
  useEffect(() => {
    setCurrLevel(4)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // increase level by 1
  useEffect(() => {
    if (canAdvance) {
      setCurrLevel((prev) => prev + 1)
      console.log("off to next level", currLevel)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canAdvance])

  useEffect(() => {
    if (currLevel === 6) {
      // winner!
      swal("Winner!")
      setCurrLevel(4)
      setScore(0)
    } else {
      begin()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLevel])

  return (
    <div className="game-wrap">
      <Header />

      <div className="card-wrap">
        {foundArr.map((key) => (
          <Pic
            key={key}
            img={spades[key]}
            uniqueID={key}
            check={checkCardsArr}
          />
        ))}
      </div>

      <div className="game-info">
        <div className="score">Score: {score}</div>
        <div>Current Level: {currLevel}</div>
      </div>
    </div>
  )
}

export default Game
