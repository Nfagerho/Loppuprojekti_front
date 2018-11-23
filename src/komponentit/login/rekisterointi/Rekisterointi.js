import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SignUpPage from '../../firebase/Firebase/SignUp';


class Rekisterointi extends Component {
    render() {
        return (
            <div>
                Täällä rekisteröidään
                <nav>
                    <NavLink to='/sijainen'>Etusivu</NavLink><br/>
                </nav>
                <SignUpPage/>
            </div>
        );
    }
}

export default Rekisterointi;