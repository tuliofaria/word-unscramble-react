import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    time: 10,
    word: '',
    available:[
      { letter: 'B', used: false },
      { letter: 'A', used: false },
      { letter: 'L', used: false },
      { letter: 'L', used: false },
      { letter: 'M', used: false }
    ],
    words:[
      { word: 'BALL', discovered: false },
      { word: 'LAMB', discovered: true },
      { word: 'LAB', discovered: false }
    ],
    playState: 'stopped'
  }
  checkWord = word => {
    const wordIndex = this.state.words.findIndex(w => {
      return word === w.word && !w.discovered
    })
    if(wordIndex >= 0){
      const words = [...this.state.words]
      words[wordIndex].discovered = true

      const available = this.state.available.map(letter => {
        letter.used = false
        return letter
      })

      this.setState({ available, words, word: '' })
    }
  }
  handleKey = letter => {
    if(letter === 'ENTER'){
      this.checkWord(this.state.word)
    }else if(letter === 'BACKSPACE'){
      const lastLetter = this.state.word.substr(-1, 1)
      const word = this.state.word.substr(0, this.state.word.length-1)
      const letterIndex = this.state.available.findIndex(l => {
        return l.letter === lastLetter && l.used
      })
      if(letterIndex >= 0){
        const available = [...this.state.available]
        available[letterIndex].used = false
        this.setState({
          available,
          word
        })
      }
    }else{
      const letterIndex = this.state.available.findIndex(l => {
        return l.letter === letter && !l.used
      })
      // if we found the letter
      if(letterIndex >= 0){
        const available = [...this.state.available]
        available[letterIndex].used = true
        const word = this.state.word + letter
        this.setState({
          available, word
        })
      }
    }
  }
  componentDidMount() {
    const countDown = () => {
      if(this.state.time > 0){
        this.setState({ time: this.state.time-1 })
      }else{
        this.setState({ time: 'timeout', playState: 'timeout' })
      }
    }
    setInterval(countDown, 1000)

    window.addEventListener('keydown', evt => {
      const letter = String(evt.key).toUpperCase()
      this.handleKey(letter)
    })
  }
  componentWillUnmount() {
    window.removeEventListener('keydown')
  }
  handleKeyDown = (event) => {
    console.log(event)
  }
  renderWord(word, index){
    if(word.discovered){
      return <p key={index}>{word.word}</p>
    }
    const len = word.word.length
    const blanks = ''.padStart(len, '_').split('').join(' ')
    return <p key={index}>{blanks}</p>
  }
  play = () => {
    const words = this.state.words.map(word => ({...word, discovered: false }))
    const available = this.state.available.map(letter => ({...letter, used: false }))
    this.setState({
      playState: 'playing',
      time: 60,
      words, available
    })
  }
  render () {
    if(this.state.playState ==='stopped'){
      return (
        <div>
          <button onClick={this.play}>Play!</button>
        </div>
      )
    }
    if(this.state.playState ==='timeout'){
      return (
        <div>
          <button onClick={this.play}>Play again!</button>
        </div>
      )
    }
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Game time: {this.state.time}</h1>
        </header>
        <div className="App-intro">
          {this.state.words.map(this.renderWord)}
        </div>
        <p className="App-intro">
          {this.state.available.filter(letter => !letter.used).map((letter,i) => <span key={i}>{letter.letter}</span>)}
        </p>
        <p>
          {JSON.stringify(this.state.available)}
        </p>
        <p className="App-intro">
          {this.state.word}
        </p>
      </div>
    );
  }
}

export default App;
