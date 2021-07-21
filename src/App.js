import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notes from './components/Notes';
import MakeNote from './components/MakeNote';

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
      </Switch>
    </Router>
  );
}

export default App;
