import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Francisco Javier Chiyah Garcia
          </p>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Coming soon!
          </p>
          <p>
            For now, you can visit: 
              <ul className="App-list">
                <li><a className="App-link" href="https://www.linkedin.com/in/javier-chiyah-garcia-469045a6/">LinkedIn profile</a></li>
                <li><a className="App-link" href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#">Google Schoolar profile</a></li>
                <li><a className="App-link" href="https://github.com/jchiyah">GitHub profile</a></li>
              </ul>
              You can also contact me at <tt>jchiyah@outlook.com</tt>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
