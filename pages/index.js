import React, { Component } from 'react';
import Stack from './stack';
import Score from './score';

export default class extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
      score: 0
    }
    this.generateItems = this.generateItems.bind(this)
    this.setScore = this.setScore.bind(this)
  }

  componentDidMount() {
    this.generateItems('number', 3, 3)
  }

  generateItems(category, count, max) {
    let itemArray = []
    if(category === 'number') {
      const nums = new Set();
      nums.add(Math.floor(Math.random() * max) + 1)
      while (nums.size !== count) {
        nums.add(Math.floor(Math.random() * max) + 1);
      }
      itemArray = [...nums]
      console.log(itemArray)
      if (itemArray.length > 1 && itemArray[0] === 1) {
        [itemArray[0], itemArray[itemArray.length - 1]] = [itemArray[itemArray.length - 1], itemArray[0]]
      }
      this.setState({
        items: itemArray
      })
    }
  }

  setScore(score) {
    this.setState({ score: this.state.score+score })
  }

  render() {
    const { items, score } = this.state
    const { setScore, generateItems } = this
    return (
      <>
        <Score
          score={score}
        />
        <Stack
          score={score}
          generateItems={generateItems}
          setScore={setScore}
          items={this.state.items}
        />
      </>

    );
  }
}
