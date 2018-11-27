import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import './login/login.css';
import Substidudes2 from './substidudes2.png'

class Etusivu extends Component {

    render() {
        return (

            <div>
                <div className="logo">
                    <a href='/'>
                        <img src={Substidudes2} alt="Substidudes-logo"/></a>
                </div>
                <br/><br/><br/><br/><br/>
                <nav className="button-menu">
                    <NavLink className="button" to='/sijainenlogin'><span
                        className="buttontext">SIJAINEN</span></NavLink><br/><br/>
                    <NavLink className="button" to='/koululogin'><span
                        className="buttontext2">KOULU</span></NavLink><br/><br/>
                    {/*<NavLink className="button" to='/rekisterointi'><span className="buttontext3">REKISTERÖIDY</span></NavLink><br/><br/>*/}
                </nav>
                <footer>
                    © 2018 Substidudes Inc. All rights reserved.<br/>
                    <a href="mailto:info.substidudes@gmail.com" target="_top">info.substidudes@gmail.com</a>
                </footer>
            </div>

        );
    }
}

export default Etusivu;