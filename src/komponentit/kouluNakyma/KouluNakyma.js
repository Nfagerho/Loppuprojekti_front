import React, {Component} from 'react';
import Substidudes2 from '../substidudes2.png'
import './koulu.css';
import KoulunTiedot from "./koulu/KoulunTiedot";
import userSymbol from "../sijainenNakyma/userSymbol.png";
import {Link} from "react-router-dom";
import logoutKuva2 from './logout.png';


class KouluNakyma extends Component {

    render() {
        return (
            <div>
                <br/>
                <div className="logo">
                    <a href='/koulunakyma'>
                        <img src={Substidudes2} alt="Substidudes"/></a><br/><br/>
                </div>
                <div className="logOutNappi">
                    <a href="/"><img src={logoutKuva2} alt="logout-kuva"/></a>
                </div><br/>

                <div className="koulunTiedot">
                <KoulunTiedot/>

                </div>
            </div>
        );
    }
}

export default KouluNakyma;