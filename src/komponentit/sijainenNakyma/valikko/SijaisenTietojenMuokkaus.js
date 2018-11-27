import React, {Component} from 'react';
import {haeYksittainenSijainen, muokkaaSijaista} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import MDspinner from "react-md-spinner";
import {Button, Col, Form, FormControl} from "react-bootstrap";
import './SijaisenTietojenMuokkaus.css';

class SijaisenTietojenMuokkaus extends Component {
    state = {
        sijainenId: this.props.id,
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
        }, 1000)
    }

    componentDidMount() {
        this.haeyksisijainen();
    }

    haeyksisijainen() {
        haeYksittainenSijainen(this.yksihaettu, this.props.id);
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
        this.props.muokkaus();

    };

    render() {
        return (
            <div>{this.state.showME ?
                <div id="spinneri"><MDspinner singleColor="#e42226"/></div>
                :
                <Form>
                    <Col sm={2}>
                        Nimi:
                        <FormControl type="text" placeholder=""
                                     value={this.state.sijainenNimi}
                                     onChange={this.handlaaNimi}/><br/>
                    </Col>
                    <Col sm={3}>
                        Osoite:
                        <FormControl type="text" placeholder=""
                                     value={this.state.sijainenOsoite}
                                     onChange={this.handlaaOsoite}/><br/>
                    </Col>
                    <Col sm={3}>
                        Puhelinnumero:
                        <FormControl type="text" placeholder=""
                                     value={this.state.sijainenPuhelinnumero}
                                     onChange={this.handlaaPuhelinnumero}/><br/>
                    </Col>
                    <Col sm={4}>
                        Sahköposti:
                        <FormControl type="text" placeholder=""
                                     value={this.state.sijainenSahkoposti}
                                     onChange={this.handlaaSahkoposti}/><br/>
                    </Col>
                    <Col>
                    <Button type="submit" onClick={this.muokkaatietoja}>Tallenna</Button></Col>
                </Form>
            }
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
    handlaaSahkoposti = (e) => {
        this.setState({sijainenSahkoposti: e.target.value})
    };

}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(SijaisenTietojenMuokkaus);