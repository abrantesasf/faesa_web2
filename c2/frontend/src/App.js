import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Checkout from './components/Checkout';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <>
      <SignIn />
      <SignUp />
      <Checkout />
      <Dashboard />
    </>
  );
}

export default App;
