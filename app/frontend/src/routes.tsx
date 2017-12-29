import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import NotFound from './components/NotFound/NotFound';

export const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact={true} path="/" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/signup" component={SignUp}/>
            <Route component={NotFound}/>
        </Switch>
    </BrowserRouter>
);