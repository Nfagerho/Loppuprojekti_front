import React, {Component} from 'react';
import {haeSijaisenTiedot} from '../../../restpalvelu';
import withAuthorization from "../../firebase/Session/withAuthorization";
import {Button} from "react-bootstrap";
import MDspinner from "react-md-spinner";
import './SijaisenTietojenMuokkaus.css'
import SignOutButton from '../../firebase/SignOut';


// Täällä haetaan sijaisen omat tiedot. Tällä hetkellä hakee kaikkien sijaisten kaikki tiedot. 
class SijaisenTiedot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sijaisentiedotdata: [],
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
        haeSijaisenTiedot(this.kaikkihaettu);
    }

    kaikkihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({sijaisentiedotdata: haettudata});

        }
    };
    handlaamuokkaus = (e) => {
        // this.props.muokkaus(e.target.value);
        this.props.history.push('/sijaisenomientietojenmuokkaus/'+ e.target.value);

    };


    //Täällä mapataan data
    render() {
        var kirjautuneenEmail = this.props.emaili;
        var sijaisentiedotolio = this.state.sijaisentiedotdata.map((sijaisentiedotmappi) => {
            if (sijaisentiedotmappi) {
                if (sijaisentiedotmappi.sijainenSahkoposti === kirjautuneenEmail) {
                    return <li key={sijaisentiedotmappi.sijainenId}>
                        <strong>Nimi:</strong> {sijaisentiedotmappi.sijainenNimi}
                        <li><strong>Osoite: </strong> {sijaisentiedotmappi.sijainenOsoite}</li>
                        <li><strong>Puhelinnumero: </strong> {sijaisentiedotmappi.sijainenPuhelinnumero}</li>
                        <li><strong>Sähköposti:</strong> {sijaisentiedotmappi.sijainenSahkoposti}</li>
                        <Button type="button"
                                value={sijaisentiedotmappi.sijainenId} 
                                onClick={this.handlaamuokkaus}>
                                Muokkaa yhteystietojasi
                        </Button>
                    </li>
                }
            }
        });
        //ja näytetään se sivustolla:
        return (
            <div className="keskitettyDivi">
                <div className="valkoinenDataboksi">
                    
                    <div className="keskitettyData">
                        <div className="keskitaBootstrappi">
                            <SignOutButton/>
                        </div>
                        <ul>
                            {sijaisentiedotolio}
                        </ul>
                    </div>
                </div>
            </div>
        );

    }
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)

(
    SijaisenTiedot
)
;