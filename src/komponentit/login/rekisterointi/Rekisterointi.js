import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import SignUpPage from '../../firebase/Firebase/SignUp';
import Substidudes2 from "../../substidudes2.png";

class Rekisterointi extends Component {
    render() {
        return (
            <div>
                <br/>
                <div className="logo">
                    <a href='/'>
                        <img src={Substidudes2} alt="Substidudes-logo"/></a>
                </div>
                <br/><br/><br/><br/><br/>
                <div className="SignUpPage">
                <SignUpPage/>
            </div>
            </div>
        );
    }
}

export default Rekisterointi;