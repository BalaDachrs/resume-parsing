import {
  BackendError,
  Lockscreen,
  NotFound,
  PasswordReset,
  Signin,
  Signup,
  Otp,
  Newpassword,
  Updates
} from "./pages";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import AppProvider from "./components/AppProvider/AppProvider";
import Dashboard from "./containers/Dashboard";
import React from "react";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";
import Header from "./containers/Header";

render(
  <AppProvider>
    <BrowserRouter>
      <Switch>
        <Route exact path="/404" component={NotFound} />
        <Route exact path="/500" component={BackendError} />
        <Route exact path="/Lockscreen" component={Lockscreen} />
        <Route exact path="/otp" component={Otp} />
        <Route exact path="/newpassword" component={Newpassword} />
        <Route exact path="/update" component={Updates} />
        <Route exact path="/forgot" component={PasswordReset} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/">
          <Header page="Dashboard" />
        </Route>
        <Route exact path="/Dashboard">
          <Header page="Dashboard" />
        </Route>
        <Route exact path="/Inbox">
          <Header page="Inbox" />
        </Route>
        <Route exact path="/Contacts" >
          <Header page="Contacts" />
        </Route>
        <Route exact path="/Report">
          <Header page="Report" />
        </Route>
      </Switch>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById("root")
);

registerServiceWorker();
