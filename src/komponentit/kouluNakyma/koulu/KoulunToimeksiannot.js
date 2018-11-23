import React, {Component} from 'react';
import {haeKaikkiToimeksiannot, poistaToimeksianto, muokkaaToimeksianto} from '../../../restpalvelu';
import { Route, Redirect } from 'react-router'


//Täällä haetaan yksittäiseen kouluun liittyvät toimeksiannot. Tällä hetkellä koodiin on kovakoodattu koulunID 1. Tämä pitäisi
//saada vastaamaan sisäänkirjautuneen koulun ID:tä Firebasen kautta.
class KoulunToimeksiannot extends Component {
    constructor(props) {
        super(props);
        this.state = {toimeksiantodata: []};
    }

    componentDidMount() {
        this.haekaikki();
    }

    haekaikki() {
        haeKaikkiToimeksiannot(this.kaikkihaettu);
    }

    kaikkihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantodata: haettudata});

        }
    }
    poistaToimeksiantoById = (e) => {
        e.preventDefault();
        poistaToimeksianto(e.target.value).then((function(){
            this.haekaikki();
        }).bind(this));


    };

    handlaamuokkaus = (e) => {
        this.props.history.push('/muokkaalomake/'+ e.target.value);
        };


//Alla olevaan mappaukseen on kovakoodattu kouluID 1. Eli IF-lause tsekkaa, onko toimeksiantoon kytketyn koulun ID 1, jos on niin
//näyttää toimeksiannon. Jos ei, niin ei näytä mitään.
    render() {
        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliot = this.state.toimeksiantodata.map((toimeksiantomappi) => {
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
            if (toimeksiantomappi.koulu && toimeksiantomappi.koulu.kouluId === 1) {
                return <li key={toimeksiantomappi.toimeksiantoId}>
                    {toimeksiantomappi.koulu &&
                    <li>Oppiaine: {toimeksiantomappi.oppiaine}<br/> Alkaa: {aikamuutos.toLocaleTimeString("fi", optiot)} Loppuu: {aikamuutos1.toLocaleTimeString("fi", optiot)}
                    </li>}<button type="button"
                            value={toimeksiantomappi.toimeksiantoId}
                            onClick={this.poistaToimeksiantoById}>Poista toimeksianto</button> 
                            
                            <button type="button"
                            value={toimeksiantomappi.toimeksiantoId} onClick={this.handlaamuokkaus}>Muokkaa toimeksiantoa</button>
                </li>
            }

            
            // sessionStorage.setItem("toimeksiantoja", JSON.stringify(toimeksiantomappi));
            
            // console.log(JSON.parse(sessionStorage.getItem('toimeksiantoja')));
        })

        return (
            <ul>
                {toimeksiantooliot}
            </ul>
        );

    }
}

export default KoulunToimeksiannot;