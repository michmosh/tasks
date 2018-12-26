import React, { Component } from 'react';

import './App.css';
import Main from './main/main';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="dark-blue">
        <div className="logo">Tasks</div>
        <div className="hamburger-wrapper">
            <div className='hamburger'>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        </header>
        <Main />
        <div className="side-nav dark-blue">
         <ul>
           <li>Link 1</li>
           <li>Link 1</li>
           <li>Link 1</li>
           <li>Link 1</li>
         </ul>
        </div>
        <footer className="dark-blue"></footer>
      </div>
    );
  }
}

export default App;
