import React, {Component} from 'react';
import Substidudes2 from '../substidudes2.png'
import './koulu.css';
import KoulunTiedot from "./koulu/KoulunTiedot";

class KouluNakyma extends Component {

    render() {
        return (
            <div>
                <div className="logo">
                    <a href='/'>
                        <img src={Substidudes2}/></a><br/><br/><br/><br/><br/>
                </div>
                <KoulunTiedot/>
            </div>
        );
    }
}

export default KouluNakyma;