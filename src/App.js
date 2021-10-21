import './App.css';
import { useState, useEffect } from 'react';
import RariContext, { RariContextDefaultValue } from "./Context"
import NavBar from "./components/NavBar"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './components/Pages/Home';
import Create from './components/Pages/Create';
import Deposit from './components/Pages/Deposit';
import Withdraw from './components/Pages/Withdraw';
import Connect, { connectCachedProvider } from './components/Pages/Connect';


function App() {
  const [web3provider, setWeb3Provider] = useState(null);
  const [web3signer, setWeb3Signer] = useState(null);

  // Connect to cached provider if any.
  useEffect(() => {
    connectCachedProvider(web3provider, setWeb3Provider, setWeb3Signer);
  }, []);

  // This value should match the default context value so consumer's know what to expect.
  const value = {
    ...RariContextDefaultValue,
    web3provider: web3provider,
    web3signer: web3signer,
    setProvider: setWeb3Provider,
    setSigner: setWeb3Signer,
  };

  return (
    <>
      <RariContext.Provider value={value}>
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
      </RariContext.Provider>
    </>
  );
}

export default App;
