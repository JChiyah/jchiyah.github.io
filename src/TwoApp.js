import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import './App.scss';

import NavigationBar from './NavigationBar';
import Landing from './Landing';


class TwoApp extends Component {
    componentDidMount() {
    // browserHistory.push('/');
  }
  
  render() {
    return (
      <div className="App">
        <h1> Hello from home!</h1>

      </div>
    );
  }
}

export default TwoApp;

/*
        // <header className="App-header">
        //   <p>
        //     Francisco Javier Chiyah Garcia
        //   </p>
        //   <img src={logo} className="App-logo" alt="logo" />
        //   <p>
        //     Coming soon!
        //   </p>
        //   <p>
        //     For now, you can visit: 
        //       <ul className="App-list">
        //         <li><a className="App-link" href="https://www.linkedin.com/in/javier-chiyah-garcia-469045a6/">LinkedIn profile</a></li>
        //         <li><a className="App-link" href="https://scholar.google.co.uk/citations?hl=en&user=NQyCFjYAAAAJ#">Google Schoolar profile</a></li>
        //         <li><a className="App-link" href="https://github.com/jchiyah">GitHub profile</a></li>
        //       </ul>
        //       You can also contact me at <tt>jchiyah@outlook.com</tt>
        //   </p>
        // </header>*/
