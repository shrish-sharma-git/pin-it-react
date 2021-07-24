import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Notes from './components/Notes';
import MakeNote from './components/MakeNote';
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import { AuthProvider } from "./context/authContext";
import Layout from "./components/Layout";
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Switch>
            <PrivateRoute exact path='/' component={Notes} />
            <PrivateRoute path='/MakeNote' component={MakeNote} />
            <Route path='/SignUp' component={SignUp} />
            <Route path='/SignIn' component={SignIn} />
          </Switch>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
