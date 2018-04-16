import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    time: 10
  }
  componentDidMount() {
    const countDown = () => {
      if(this.state.time > 0){
        this.setState({ time: this.state.time-1 })
      }else{
        this.setState({ time: 'timeout' })
      }
    }
    setInterval(countDown, 1000)
  }
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Game time: {this.state.time}</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
