import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Substidudes2 from "../../substidudes2.png";
import SignInPage from '../../firebase/SignIn';

class KouluLogin extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <a href='/'>
                        <img src={Substidudes2} alt="Substidudes-logo"/></a><br/><br/><br/><br/><br/><br/>
                </div>
                <h1 align="center">Kirjaudu sisään</h1><br/>
                <nav className="button-menu">

                        <form onSubmit={this.onSubmit}>
                            <input
                                name="email"
                                value={null}
                                onChange={this.onChange}
                                type="text"
                                placeholder="Sähköposti"
                            />
                            &nbsp;
                            <input
                                name="password"
                                value={null}
                                onChange={this.onChange}
                                type="password"
                                placeholder="Salasana"
                            /><br/>
                            &nbsp;
                        </form>
                            <NavLink to='/koulunakyma'>
                            <button className="SignIn" type="submit">
                                Kirjaudu sisään
                            </button>
                    </NavLink><br/><br/>
                    <NavLink className="button2" to='/rekisterointi'><span className="buttontext3">REKISTERÖIDY</span></NavLink>
                </nav>
            </div>
        );
    }
}

export default KouluLogin;