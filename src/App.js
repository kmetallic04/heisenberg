import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Login from './Login';
import Main from './Main';
import Orders from './Orders';

const THEME = createMuiTheme({
    typography: {
     "fontFamily": "\"Lexend Deca\", sans-serif",
     "fontSize": 14,
     "fontWeightLight": 300,
     "fontWeightRegular": 400,
     "fontWeightMedium": 500
    }
 });

export default function App(props) {
    return(
        <MuiThemeProvider theme={THEME}>
            <Switch>
                <Route exact path='/' component={Login}/>
                <Route path='/vendors' component={Main}/>
                <Route path='/orders' component={Orders}/>
            </Switch>
        </MuiThemeProvider>
    );
}