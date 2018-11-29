import React, {Component} from 'react';
import {haeKaikkiToimeksiannot} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import MDspinner from "react-md-spinner";

//Täällä näytetään kaikki mahdolliset toimeksiannot. Koodiin ei ole vielä lisätty ominaisuutta, joka blokkaisi ne toimeksiannot, jotka
//on jo kytketty johonkin sijaiseen
class KaikkiToimeksiannot extends Component {

    constructor(props) {
        super(props);
        this.state = {
            toimeksiantodata: [],
            showME: true
        };
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showME: false
            })
        }, 0)
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
            // console.log(this.state.toimeksiantodata);
        }
    };

    handlaavaraus = (e) => {
        // this.props.varaus(e.target.value);
        this.props.history.push('/toimeksiannonvaraus/'+ e.target.value);

    };

//Datan mappaus
    render() {

        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliot = this.state.toimeksiantodata.map((toimeksiantomappi) => {
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
            if (toimeksiantomappi.sijainen === null && toimeksiantomappi.vahvistus === false) {
                return <div className="harmaaDataboksi"><div className="keskitettyData">
                    <ul key={toimeksiantomappi.toimeksiantoId}>
                    <li><strong>Oppiaine:</strong> {toimeksiantomappi.oppiaine}</li>
                    <li><strong>Alkaa:</strong> {aikamuutos.toLocaleTimeString("fi", optiot)}</li> 
                    <li><strong>Päättyy:</strong> {aikamuutos1.toLocaleTimeString("fi", optiot)}</li>
                    <li><strong>Koulu:</strong> {toimeksiantomappi.koulu.kouluNimi}</li>
                    <li><strong>Osoite:</strong> {toimeksiantomappi.koulu.kouluOsoite}</li>
                    <li><strong>Yhteyshenkilö:</strong> {toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>
                        <br/>
                    <button type="button" id="varaaToimeksiantoNappi" value={toimeksiantomappi.toimeksiantoId} onClick={this.handlaavaraus}>Varaa</button>
                </ul>
                </div>
                </div>

            }

        })
//Datan näyttö sivustolla:

        return (
            <div className="keskitettyDivi">
                <div>
                    
                        {toimeksiantooliot}
                    
                </div>
            </div>
        );

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(KaikkiToimeksiannot);