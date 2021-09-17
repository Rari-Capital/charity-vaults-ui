import './App.css';
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Pages/Home';
import Create from './components/Pages/Create';
import Deposit from './components/Pages/Deposit';
import Withdraw from './components/Pages/Withdraw';
import Connect from './components/Pages/Connect';

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <div className="pages">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/create" component={Create} />
            <Route path="/deposit" component={Deposit} />
            <Route path="/withdraw" component={Withdraw} />
            <Route path="/connect" component={Connect} />
          </Switch>
        </div>
      </Router>
    </>
  );
}

export default App;
