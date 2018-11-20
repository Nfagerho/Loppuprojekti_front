import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SijainenLogin from './sijainen/SijainenLogin';
import KouluLogin from './koulu/KouluLogin';
import Rekisterointi from './rekisterointi/Rekisterointi';
import { Switch, Route } from 'react-router-dom';
class LoginSivu extends Component {
    render() {
        return (
            <div>
                LoginSivu
                <nav>
                    <NavLink to='/sijainenlogin'>SijainenLogin</NavLink><br/>
                    <NavLink to='/koululogin'>KouluLogin</NavLink><br/>
                    <NavLink to='/rekisterointi'>Rekisteröinti</NavLink>              
                </nav>
                {/* <Switch>
                    <Route exact path='/sijainenlogin' component={SijainenLogin}></Route>
                    <Route exact path='/koululogin' component={KouluLogin}></Route>
                    <Route exact path='/rekisterointi' component={Rekisterointi}></Route>
                </Switch> */}
            </div>
        );
    }
}

export default LoginSivu;