import React from 'react';
import { hot } from 'react-hot-loader';
import { BrowserRouter as Router } from 'react-router-dom'
import { Layout } from 'components/layout';
import { useWalletAndContracts, useWatchers } from './App.logic'

const App = () => {
  const {
    imBusy, setBusy,
    isWalletConnected,
    isContractsInitialized,
    reconnectWallet
  } = useWalletAndContracts()

  const watchers = useWatchers({ imBusy, setBusy, isWalletConnected, isContractsInitialized })

  if (!isWalletConnected) {
    return (<div>Wallet is not connected, please connect wallet to use app <button type="button" onClick={reconnectWallet}>Connect with metamask</button></div>)
  }

  if (!isContractsInitialized) {
    return <div>Initializing contracts</div>
  }

  if (imBusy) {
    return <div>Loading wallet</div>
  }

  return (
    <>
      <Router>
        <div id="app">
          <Layout />
        </div>
      </Router>
    </>
  );
}



export default hot(module)(App);
