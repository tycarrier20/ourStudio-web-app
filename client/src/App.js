import React from 'react';
import FileUpload from './components/FileUpload';
import Navbar from './components/Navbar';
import About from './about';
import Profile from './profile';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Upload from './upload';

const App = () => (
  <Router>
    <div>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/profile" component={Profile} />
        <Route path="/upload" component={Upload} />
      </Switch>
    </div>
  </Router>
);

const Home = () => (
  <div>
    Home
  </div>
)

export default App;
