import React,{ Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note';
import List from './components/List';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import NoteDetail from './components/NoteDetail';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <Switch>
        <Route path='/user/register' component={Register} />
        <Route path='/user/login' component={Login} />
        <Route path='/user/logout' component={Logout} />
        <Navbar />
      </Switch>
      <Switch>  
          <Route path='/note/:noteid' component={NoteDetail} />
          <Route path='/home' component={Home} />
          <Route path='/note' component={Note} />
          <Route path='/list' component={List} />
      </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
