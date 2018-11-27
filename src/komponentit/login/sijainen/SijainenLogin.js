import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Substidudes2 from "../../substidudes2.png";
import SignInPage from '../../firebase/SignIn';

class SijainenLogin extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <a href='/'>
                        <img src={Substidudes2} alt="Substidudes-logo"/></a>
                </div>
                <br/><br/><br/><br/><br/>
                <div className="sijainenSignIn">
                    <SignInPage/><br/>
                </div>
                <nav className="button-menu">
                    <NavLink className="button2" to='/rekisterointi'><span
                        className="buttontext3">REKISTERÖIDY</span></NavLink>
                </nav>
            </div>
        );
    }
}

export default SijainenLogin;