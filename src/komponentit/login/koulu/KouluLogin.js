import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class KouluLogin extends Component {
    render() {
        return (
            <div>
                Täällä kirjautuu Koulu.
                <nav>
                    <NavLink to='/etusivu'>Etusivu</NavLink><br/>
                </nav>
            </div>
        );
    }
}

export default KouluLogin;