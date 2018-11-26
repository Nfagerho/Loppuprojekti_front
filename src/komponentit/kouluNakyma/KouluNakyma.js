import React, { Component } from 'react';
import Substidudes2 from '../substidudes2.png'
import KoulunTiedot from './koulu/KoulunTiedot';
import KoulunToimeksiannot from './koulu/KoulunToimeksiannot';

class KouluNakyma extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <img src={Substidudes2}/><br/><br/><br/><br/><br/>
                </div>
                Tämä on koulunäkymä etusivulla
                <KoulunTiedot />
                <KoulunToimeksiannot />
            </div>
        );
    }
}

export default KouluNakyma;