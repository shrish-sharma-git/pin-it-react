import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notes from './components/Notes';
import MakeNote from './components/MakeNote';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Notes />
        </Route>
        <Route path='/MakeNote'>
          <MakeNote />
        </Route>
        <Route path='/SignIn'>
          <SignIn />
        </Route>
        <Route path='/SignUp'>
          <SignUp />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
