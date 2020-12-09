

/* Utility Imports */
 import {BrowserRouter as Router, Switch, Redirect,Route} from 'react-router-dom'

 /* Component Imports */
 import Homepage from './components/Homepage/Homepage';
 import Login from './components/Login/Login';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Homepage}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="*">
          <Redirect to="/login" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
