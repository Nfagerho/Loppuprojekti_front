import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Rekisterointi extends Component {
    render() {
        return (
            <div>
                Täällä rekisteröidään
                <nav>
                    <NavLink to='/etusivu'>Etusivu</NavLink><br/>
                </nav>
            </div>
        );
    }
}

export default Rekisterointi;