import "./App.css";
import {
    BrowserRouter as Router, 
    Switch,
    Route
} from 'react-router-dom';
import Main from "./pages/main";

function App() {

  return (
    <Router>
        <h1>test</h1>
        <Switch>
            <Route path="/">
                <h1>test</h1>
            </Route>
            <Route path="/dashboard" >
                <Main />
            </Route>
            <Route path="/log-in">
                <div><h1>Log IN</h1></div>
            </Route>
        </Switch>
    </Router>
  );
}

export default App;
