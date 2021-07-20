import React from 'react';
import Header from './Header';
import SignUp from './SignUp';
import PostList from './PostList';
import Login from './Login'
import Logout from './Logout'
import Home from './Home';
import { Switch, Route } from 'react-router-dom';
import '../styles/App.css';

function App() {


  
  return (
    <div className="App">
      <Header />
      <div className="uk-margin-medium-top">
        <Switch>
          <Route exact path="/topic" component={PostList} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/logout" component={Logout}/>
        </Switch>
      </div>
    </div>
  );
}

export default App;
