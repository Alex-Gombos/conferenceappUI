import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import ClientList from './ClientList';
import ClientEdit from './ClientEdit';

class App extends Component {
  render() {
    return (
        <Router>
          <BrowserRouter>
            <Switch>
              <Route exact path='/' component={Home}/>
              <Route path='/sessions' exact={true} component={ClientList}/>
              <Route path='/sessions/:id' component={ClientEdit}/>
            </Switch>
          </BrowserRouter>
        </Router>
    )
  }
}

export default App;