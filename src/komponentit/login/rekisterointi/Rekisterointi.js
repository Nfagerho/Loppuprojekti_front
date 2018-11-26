import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SignUpPage from '../../firebase/Firebase/SignUp';
import SijaisenRekisterointilomake from '../../firebase/Firebase/SignUp/SijaisenRekisterointilomake';


class Rekisterointi extends Component {
    render() {
        return (
            <div>
                Täällä rekisteröidään
                <nav>
                    <NavLink to='/sijainen'>Etusivu</NavLink><br/>
                </nav>
                <SignUpPage/>
                <SijaisenRekisterointilomake/>
            </div>
        );
    }
}

export default Rekisterointi;