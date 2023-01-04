import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react'

class App extends React.Component {
  state = {
    sessions: []
  };

  async componentDidMount() {
    const response = await fetch('/api/v1/sessions');
    console.log(response);
    const body = await response.json();
    this.setState({sessions: body});

  }

  render() {
    const {sessions} = this.state;
    return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div className="App-intro">
              <h2>Sessions</h2>
              {sessions.map(session =>
                  <div key={session[["session_id"]]}>
                    {session[["session_name"]]} ({session[["session_length"]]})
                  </div>
              )}
            </div>
          </header>
        </div>
    );
  }
}
export default App;
