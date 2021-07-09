import React from 'react';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Checkout from './components/Checkout';
import Dashboard from './components/Dashboard';
import Erro404 from './components/Erro404';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

function App() {
  return(
    <BrowserRouter>
    <Switch>
      <Route path="/"          exact={true} component={SignIn}    />
      <Route path="/signin"    exact={true} component={SignIn}    />
      <Route path="/signup"    exact={true} component={SignUp}    />
      <Route path="/checkout"  exact={true} component={Checkout}  />
      <Route path="/dashboard" exact={true} component={Dashboard} />
      <Route path="*"                       component={Erro404}    />
    </Switch>
  </BrowserRouter>
  );
}

export default App;
