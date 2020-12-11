

/* Utility Imports */
 import {BrowserRouter as Router, Switch, Redirect,Route} from 'react-router-dom'

 /* Component Imports */
 import Homepage from './components/Homepage/Homepage';
 import Login from './components/Login/Login';
 import Signup from './components/Signup/Signup';
 import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
