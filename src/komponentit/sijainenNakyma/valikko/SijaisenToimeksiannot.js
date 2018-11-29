import React, {Component} from 'react';
import {haeKaikkiToimeksiannot} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import MDspinner from "react-md-spinner";

//Täällä haetaan yksittäiseen sijaiseen liittyvät toimeksiannot. Tällä hetkellä koodiin on kovakoodattu SijaisenId 1. Tämä pitäisi
//saada vastaamaan sisäänkirjautuneen sijaisen ID:tä Firebasen kautta.
class SijaisenToimeksiannot extends Component {

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
        }
    }

    render() {

        var kirjautuneenEmail = this.props.emaili;
        //Tämä näyttää tulevat toimeksiannot
        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliot = this.state.toimeksiantodata.map(function (toimeksiantomappi) {
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
            var d = new Date();
            var d1 = Date.parse(d);
            var d2 = Date.parse(aikamuutos1);
            if (toimeksiantomappi.sijainen) {
                if (toimeksiantomappi.sijainen.sijainenSahkoposti === kirjautuneenEmail && toimeksiantomappi.vahvistus === true) {
                    if (d2 > d1) {
                        return <div className="vihreaDataboksi">
                            <div className="keskitettyData"><ul key={toimeksiantomappi.toimeksiantoId}>
                            <li><strong>Oppiaine:</strong> {toimeksiantomappi.oppiaine}</li> 
                            <li><strong>Alkaa:</strong> {aikamuutos.toLocaleTimeString("fi", optiot)}</li>
                            <li><strong>Loppuu:</strong> {aikamuutos1.toLocaleTimeString("fi", optiot)}</li>
                            <li><strong>Koulu:</strong> {toimeksiantomappi.koulu.kouluNimi}</li>
                            <li><strong>Osoite:</strong> {toimeksiantomappi.koulu.kouluOsoite}</li>
                            <li><strong>Yhteyshenkilö:</strong> {toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>
                            </ul>
                            </div>
                            </div>
                    }
                }
            }
        })

        // Ja tämä menneet toimeksiannot
        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliotmenneet = this.state.toimeksiantodata.map(function (toimeksiantomappi) {
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
            var d = new Date();
            var d1 = Date.parse(d);
            var d2 = Date.parse(aikamuutos1);
            if (toimeksiantomappi.sijainen) {
                if (toimeksiantomappi.sijainen.sijainenSahkoposti === kirjautuneenEmail && toimeksiantomappi.vahvistus === true) {
                    if (d2 < d1) {
                        return <div className="harmaaDataboksi"><div className="keskitettyData"><ul key={toimeksiantomappi.toimeksiantoId}>
                            <li><strong>Oppiaine:</strong> {toimeksiantomappi.oppiaine}</li> 
                            <li><strong>Alkaa:</strong> {aikamuutos.toLocaleTimeString("fi", optiot)}</li>
                            <li><strong>Loppuu:</strong> {aikamuutos1.toLocaleTimeString("fi", optiot)}</li>
                            <li><strong>Koulu:</strong> {toimeksiantomappi.koulu.kouluNimi}</li>
                            <li><strong>Osoite:</strong> {toimeksiantomappi.koulu.kouluOsoite}</li>
                            <li><strong>Yhteyshenkilö:</strong> {toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>
                            </ul>
                            </div>
                            </div>
                    }
                }
            }
        });

        return (
            <div className="keskitettyDivi">
                <div className="sijaisuustekstit">
                    <h2><strong>Tulevat:</strong></h2>
                </div>
                    {toimeksiantooliot}

                <div className="sijaisuustekstit">
                    <h2><strong>Päättyneet:</strong></h2>
                </div>
                    {toimeksiantooliotmenneet}
            </div>


        );

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(SijaisenToimeksiannot);