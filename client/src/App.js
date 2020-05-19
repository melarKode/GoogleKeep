import React,{ Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note';
import List from './components/List';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
          <Route path='/user/register' component={Register} />
          <Route path='/user/login' component={Login} />
          <Route path='/user/logout' component={Logout} />
          <div className="app">
          <Navbar />
          <Route path='/home' component={Home} />
          <Route path='/note' component={Note} />
          <Route path='/list' component={List} />
          </div>
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
