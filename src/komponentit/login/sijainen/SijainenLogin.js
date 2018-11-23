import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Substidudes2 from "../../substidudes2.png";

class SijainenLogin extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <img src={Substidudes2}/><br/><br/><br/><br/><br/>
                </div>
                <nav className="button-menu">
                    <NavLink to='/sijainen'>Etusivu</NavLink><br/><br/><br/>
                    <NavLink className="button" to='/rekisterointi'><span className="buttontext3">REKISTERÖIDY</span></NavLink>
                </nav>
            </div>
        );
    }
}

export default SijainenLogin;