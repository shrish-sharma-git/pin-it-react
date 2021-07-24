import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notes from './components/Notes';
import MakeNote from './components/MakeNote';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { AuthProvider } from "./context/authContext";
import Layout from "./components/Layout";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
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
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
