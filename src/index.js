import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Etusivu from './komponentit/etusivu/Etusivu';
import LoginSivu from './komponentit/login/LoginSivu';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import SijainenLogin from './komponentit/login/sijainen/SijainenLogin';
import KouluLogin from './komponentit/login/koulu/KouluLogin';
import Rekisterointi from './komponentit/login/rekisterointi/Rekisterointi';


ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={LoginSivu}></Route>
            <Route exact path='/etusivu' component={Etusivu}></Route>
            <Route exact path='/sijainenlogin' component={SijainenLogin}></Route>
            <Route exact path='/koululogin' component={KouluLogin}></Route>
            <Route exact path='/rekisterointi' component={Rekisterointi}></Route>
            {/* <Route component={SivuaEiLoytynyt} /> */}
        </Switch>
    </BrowserRouter>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

