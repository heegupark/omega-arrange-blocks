import React, { Component } from 'react';
import Stack from '../components/stack';
import Score from '../components/score';
import Menu from '../components/menu';
import MainMenu from '../components/main-menu';
import PlayAgain from '../components/play-again';
import Footer from '../components/footer';
import IndexPage from '../components/index-page'

const levelData = {
  1: ['number', 3, 3],
  2: ['number', 3, 5],
  3: ['number', 3, 10],
  4: ['number', 4, 5],
  5: ['number', 4, 10],
  6: ['number', 4, 15],
  7: ['number', 4, 20],
  8: ['number', 5, 10],
  9: ['number', 5, 15],
  10: ['number', 5, 20],
  11: ['number', 5, 30],
  12: ['number', 5, 40],
  13: ['number', 6, 15],
  14: ['number', 6, 20],
  15: ['number', 6, 30],
  16: ['number', 6, 40],
  17: ['number', 6, 50],
  18: ['number', 6, 60],
  19: ['number', 7, 15],
  20: ['number', 7, 20],
  21: ['number', 7, 30],
  22: ['number', 7, 40],
  23: ['number', 7, 50],
  24: ['number', 7, 60],
  25: ['number', 7, 70],
  26: ['number', 8, 15],
  27: ['number', 8, 30],
  28: ['number', 8, 50],
  29: ['number', 8, 70],
  30: ['number', 8, 90],
  31: ['number', 8, 110],
  32: ['number', 8, 130],
  33: ['number', 8, 150],
  34: ['number', 9, 20],
  35: ['number', 9, 40],
  36: ['number', 9, 60],
  37: ['number', 9, 80],
  38: ['number', 9, 100],
  39: ['number', 9, 120],
  40: ['number', 9, 140],
  41: ['number', 9, 160],
  42: ['number', 9, 180],
  43: ['number', 10, 20],
  44: ['number', 10, 40],
  45: ['number', 10, 60],
  46: ['number', 10, 80],
  47: ['number', 10, 100],
  48: ['number', 10, 120],
  49: ['number', 10, 140],
  50: ['number', 10, 160],
  51: ['number', 10, 180],
  52: ['number', 10, 200]
}

export default class Main extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      score: 0,
      isStarted: false,
      username: '',
      level: 1,
      winModal: false,
      gameOver: false
    }
    this.generateItems = this.generateItems.bind(this)
    this.setScore = this.setScore.bind(this)
    this.start = this.start.bind(this)
    this.setLevel = this.setLevel.bind(this)
    this.openWinModal = this.openWinModal.bind(this)
    this.next = this.next.bind(this)
    this.finish = this.finish.bind(this)
    this.playAgain = this.playAgain.bind(this)
    this.mainMenu = this.mainMenu.bind(this)
    this.startOver = this.startOver.bind(this)
  }

  startOver() {
    this.setState({ level: 1, score: 0 })
    this.start(1)
  }

  start(level) {
    if (!level) level = 1
    this.openWinModal(false)
    this.setState({ gameOver: false })
    this.setLevel(level)
    const data = levelData[level]
    if (data) {
      setTimeout(() => {
        this.generateItems(data[0], data[1], data[2])
      }, 500)
      this.generateItems('number', 1, 10)
      this.setState({ isStarted: true })
    } else {
      this.finish()
    }
  }

  setLevel(level) {
    this.setState({ level })
  }

  finish() {
    this.setState({ gameOver: true })
  }

  generateItems(category, count, max) {
    let itemArray = []
    if (category === 'number') {
      const nums = new Set();
      nums.add(Math.floor(Math.random() * max) + 1)
      while (nums.size !== count) {
        nums.add(Math.floor(Math.random() * max) + 1);
      }
      itemArray = [...nums]
      if (itemArray.length > 1 && itemArray[0] === Math.min(...itemArray)) {
        [itemArray[0], itemArray[itemArray.length - 1]] = [itemArray[itemArray.length - 1], itemArray[0]]
      }
      this.setState({
        items: itemArray
      })
    }
  }

  setScore(score) {
    this.setState({ score: this.state.score + score })
  }

  openWinModal(open) {
    this.setState({ winModal: open })
  }

  next() {
    const newLevel = this.state.level + 1
    this.setLevel(newLevel)
    this.openWinModal(false)
    this.start(newLevel)
  }

  playAgain() {
    this.start(this.state.level)
  }

  mainMenu() {
    this.setState({
      items: [],
      score: 0,
      isStarted: false,
      username: '',
      level: 1,
      winModal: false,
      gameOver: false
    })
  }

  render() {
    const { items, score, isStarted, winModal, gameOver } = this.state
    const { setScore, generateItems, start, openWinModal, next, playAgain, mainMenu, startOver } = this
    return (
      <>
        <IndexPage />
        <div className="board">
          {isStarted &&
            <div className="top-menu-box">
              <MainMenu mainMenu={mainMenu} />
              <Score score={score} />
              <PlayAgain playAgain={playAgain} />
            </div>
          }
          <Stack
            score={score}
            generateItems={generateItems}
            setScore={setScore}
            items={items}
            openWinModal={openWinModal}
          />
        </div>
        {!isStarted &&
          <Menu
            category={'menu'}
            start={start}
          />}
        {winModal &&
          <Menu
            category={'win'}
            startOver={startOver}
            next={next}
          />}
        {gameOver &&
          <Menu
            category={'gameover'}
            startOver={startOver}
          />}
        <Footer />
      </>
    );
  }
}
