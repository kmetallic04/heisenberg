import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Login';
import Main from './Main';

export default function App(props) {
    return(
        <Switch>
            <Route exact path='/' component={Login}/>
            <Route path='/vendors' component={Main}/>
        </Switch>
    );
}