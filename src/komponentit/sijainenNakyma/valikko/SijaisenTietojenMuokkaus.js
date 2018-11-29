import React, {Component} from 'react';
import {haeYksittainenSijainen, muokkaaSijaista} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import MDspinner from "react-md-spinner";
import {Button, Col, Form, FormControl} from "react-bootstrap";
import './SijaisenTietojenMuokkaus.css';

class SijaisenTietojenMuokkaus extends Component {
    state = {
        sijainenId: this.props.match.params.id,
        sijainenNimi: '',
        sijainenOsoite: '',
        sijainenPuhelinnumero: '',
        sijainenSahkoposti: '',
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
        this.haeyksisijainen();
    }

    haeyksisijainen() {
        haeYksittainenSijainen(this.yksihaettu, this.props.match.params.id);
    }

    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({
                sijainenId: haettudata.sijainenId,
                sijainenNimi: haettudata.sijainenNimi,
                sijainenOsoite: haettudata.sijainenOsoite,
                sijainenPuhelinnumero: haettudata.sijainenPuhelinnumero,
                sijainenSahkoposti: haettudata.sijainenSahkoposti
            });

        }
    };

    muokkaatietoja = (e) => {
        e.preventDefault();
        muokkaaSijaista(this.state.sijainenId, this.state)
        // this.props.muokkaus();
        this.props.history.push('/sijainen/sijaisentiedot/');

    };

    peruuta = () => {
        this.props.history.push('/sijainen/sijaisentiedot/');
    }


    render() {
        return (
            <div className="keskitettyDivi">
                <div className="valkoinenDataboksi"><div className="keskitettyData">
                <Form>

                        Nimi:
                        <FormControl type="text" placeholder=""
                                     value={this.state.sijainenNimi}
                                     onChange={this.handlaaNimi}/><br/>

                        Osoite:
                        <FormControl type="text" placeholder=""
                                     value={this.state.sijainenOsoite}
                                     onChange={this.handlaaOsoite}/><br/>

                        Puhelinnumero:
                        <FormControl type="text" placeholder=""
                                     value={this.state.sijainenPuhelinnumero}
                                     onChange={this.handlaaPuhelinnumero}/><br/>


                    <Button type="submit" id="sijaisenTietojenTallennusNappi" onClick={this.muokkaatietoja}>Tallenna</Button>
                    <Button type="submit" id="sijaisenTietojenTallennusNappi" onClick={this.peruuta}>Peruuta</Button>
                </Form>

                </div>
                </div>

            </div>
        );
    }


    handlaaNimi = (e) => {
        this.setState({sijainenNimi: e.target.value});
    };
    handlaaOsoite = (e) => {
        this.setState({sijainenOsoite: e.target.value});
    };
    handlaaPuhelinnumero = (e) => {
        this.setState({sijainenPuhelinnumero: e.target.value});
    };
    // handlaaSahkoposti = (e) => {
    //     this.setState({sijainenSahkoposti: e.target.value})
    // };

}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(SijaisenTietojenMuokkaus);