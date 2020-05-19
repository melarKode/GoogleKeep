import React,{ Component } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/Home';
import Note from './components/Note';
import List from './components/List';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route path='/home' component={Home} />
          <Route path='/note' component={Note} />
          <Route path='/list' component={List} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App;
