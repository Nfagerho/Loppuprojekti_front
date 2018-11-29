import React, {Component} from 'react';
import {haeYksittainenToimeksianto, muokkaaToimeksianto} from '../../../restpalvelu';
import MDspinner from "react-md-spinner";

class ToimeksiannonVaraus extends Component {
    state = {
        toimeksiantoId: '',
        oppiaine: '',
        toimeksiantoAlkuaika: '',
        toimeksiantoLoppuaika: '',
        koulu: '',
        sijainen: this.props.sijaisenId,
        vahvistus: '',
        showME: true
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showME: false
            })
        }, 0)
    }

    componentDidMount() {
        this.haeyksitoimeksianto();
    }

    haeyksitoimeksianto() {
        haeYksittainenToimeksianto(this.yksihaettu, this.props.match.params.id);
    }

    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({
                toimeksiantoId: haettudata.toimeksiantoId,
                oppiaine: haettudata.oppiaine,
                toimeksiantoAlkuaika: haettudata.toimeksiantoAlkuaika,
                toimeksiantoLoppuaika: haettudata.toimeksiantoLoppuaika,
                koulu: haettudata.koulu.kouluId,
                kouluNimi: haettudata.koulu.kouluNimi,
                kouluOsoite: haettudata.koulu.kouluOsoite,
                kouluYhteyshenkilo: haettudata.koulu.kouluYhteyshenkilo,
                vahvistus: false
                // Sijaisen ID on noukittava sisäänkirjautuneen emailin avulla!!!!!!!!
                // sijainen: haettudata.sijainen.sijainenId
            });


        }
    }

    muokkaatietoja = (e) => {
        e.preventDefault();
        muokkaaToimeksianto(this.state.toimeksiantoId, this.state)
        // this.props.varaus();
        this.props.history.push('/sijainen/toimeksiannot/');

    };

    render() {

        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
            var toimeksiantoalku = this.state.toimeksiantoAlkuaika
            var toimeksiantoloppu = this.state.toimeksiantoLoppuaika
            var aikamuutos = new Date(toimeksiantoalku);
            var aikamuutos1 = new Date(toimeksiantoloppu);

        return (

                <div className="keskitettyDivi">
                <div className="valkoinenDataboksi"><div className="keskitettyData">
                    <ul>
                        <li><strong>Oppiaine:</strong>{this.state.oppiaine}</li>

                        <li><strong>Alkaa:</strong>{aikamuutos.toLocaleTimeString("fi", optiot)}</li>

                        <li><strong>Loppuu:</strong>{aikamuutos1.toLocaleTimeString("fi", optiot)}</li>

                        <li><strong>Koulu:</strong>{this.state.kouluNimi}</li>

                        <li><strong>Osoite:</strong>{this.state.kouluOsoite}</li>

                        <li><strong>Yhteyshenkilö:</strong>{this.state.kouluYhteyshenkilo}</li><br/>

                        <button type="submit" id="vahvistaVarausNappi" onClick={this.muokkaatietoja}>Vahvista varaus</button>
                    </ul>
                </div>
                </div>
            </div>
        );
    }
}


export default ToimeksiannonVaraus;