import React, { Component } from 'react';
import Login from './Login'
import SignUp from './SignUp'
import SignUpConfirmation from './SignUpConfirmation'
import { Switch, Route } from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/signup' component={SignUp}/>
          <Route exact path='/signup-confirmation/:email' component={SignUpConfirmation}/>
        </Switch>
      </div>
    );
  }
}

export default App;
