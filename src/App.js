import React, { Component } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';
import Home from './Containers/Home/Home';

class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Home />
        </HashRouter>
      </div>
    );
  }
}

export default App;
