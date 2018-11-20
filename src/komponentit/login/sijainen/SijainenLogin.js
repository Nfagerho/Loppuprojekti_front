import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class SijainenLogin extends Component {
    render() {
        return (
            <div>
                Täällä kirjautuu Sijainen
                <nav>
                    <NavLink to='/etusivu'>Etusivu</NavLink><br/>
                </nav>
            </div>
        );
    }
}

export default SijainenLogin;