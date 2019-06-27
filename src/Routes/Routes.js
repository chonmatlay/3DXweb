import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../Components/Home/Home";
import NotFound from "../Components/NotFound/NotFound";
import Signin from '../Components/Authentication/Signin/Signin';
import Event from '../Components/Event/Event';
export default () =>
  <Switch>
    <Route path="/" exact component={Signin} />
    <Route path="/signin" exact component={Signin} />
    <Route path="/event" exact component = {Event}/>
    { /* Finally, catch all unmatched routes */ }
    <Route component={NotFound} />
  </Switch>;