import React, {Component} from 'react';
import {haeYksittainenKoulu, muokkaaKoulua} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import {Button, Col, Form, FormControl} from "react-bootstrap";
import './Lomake.css';
import MDspinner from "react-md-spinner";

class KoulunTietojenMuokkaus extends Component {
    state = {
        kouluId: this.props.match.params.id,
        kouluNimi: '',
        kouluOsoite: '',
        kouluYhteyshenkilo: '',
        kouluKoordLat: '',
        kouluKoordLong: '',
        rehtori: '',
        rehtoriEmail: '',
        rehtoriTel: '',
        sihteeri: '',
        sihteeriEmail: '',
        sihteeriTel: ''
    };


    componentDidMount() {
        this.haeyksikoulu();
    }

    haeyksikoulu() {
        haeYksittainenKoulu(this.yksihaettu, this.props.match.params.id);
    }

    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({
                kouluId: haettudata.kouluId,
                kouluNimi: haettudata.kouluNimi,
                kouluOsoite: haettudata.kouluOsoite,
                kouluYhteyshenkilo: haettudata.kouluYhteyshenkilo,
                rehtori: haettudata.rehtori,
                rehtoriEmail: haettudata.rehtoriEmail,
                rehtoriTel: haettudata.rehtoriTel,
                sihteeri: haettudata.sihteeri,
                sihteeriEmail: haettudata.sihteeriEmail,
                sihteeriTel: haettudata.sihteeriTel,
                showME: true
            });


        }
    }

    muokkaatietoja = (e) => {
        e.preventDefault();
        muokkaaKoulua(this.state.kouluId, this.state)
        this.props.history.push('/koulunakyma/');


    };

    peruuta = (e) => {
        e.preventDefault();
        this.props.history.push('/koulunakyma/');

    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showME: false
            })
        }, 0)
    }

    render() {
        return (
            <div>{this.state.showME ?
                <div id="spinneri"><MDspinner/></div>
                :
                <div>
                    <Form>
                        <Col sm={2}>
                            <b>Koulun nimi:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.kouluNimi}
                                onChange={this.handlaaNimi}/>
                            <br/>
                            <b>Koulun osoite:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.kouluOsoite}
                                onChange={this.handlaaOsoite}/>
                            <br/>
                            <b>Yhteyshenkilö:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.kouluYhteyshenkilo}
                                onChange={this.handlaaYhteystieto}/>
                            <br/>
                        </Col>
                        <Col sm={2}>
                            <b>Rehtori:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.rehtori}
                                onChange={this.handlaaReksi}/>
                            <br/>
                            <b>Rehtorin email:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.rehtoriEmail}
                                onChange={this.handlaaReksiEmail}/>
                            <br/>
                            <b>Rehtorin puhelin:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.rehtoriTel}
                                onChange={this.handlaaReksiTel}/>
                            <br/>
                        </Col>
                        <Col sm={2}>
                            <b>Sihteeri:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.sihteeri}
                                onChange={this.handlaaSihteeri}/>
                            <br/>
                            <b>Sihteerin email:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.sihteeriEmail}
                                onChange={this.handlaaSihteeriEmail}/>
                            <br/>
                            <b>Sihteerin puhelin:</b> <br/>
                            <FormControl
                                type="text"
                                placeholder={this.state.sihteeriTel}
                                onChange={this.handlaaSihteeriTel}/>
                            <br/>
                            <Button
                                id="muokkaatietolomakenappi"
                                onClick={this.muokkaatietoja}>Tallenna</Button>
                            <Button
                                id="muokkauksenperuutusnappi1"
                                onClick={this.peruuta}>Peruuta</Button>
                        </Col>
                    </Form>
                </div>}
            </div>
        );
    }


    handlaaNimi = (e) => {
        this.setState({kouluNimi: e.target.value});
    };
    handlaaOsoite = (e) => {
        this.setState({kouluOsoite: e.target.value});
    };
    handlaaYhteystieto = (e) => {
        this.setState({kouluYhteyshenkilo: e.target.value});
    };

    handlaaReksi = (e) => {
        this.setState({rehtori: e.target.value});
    };
    handlaaReksiEmail = (e) => {
        this.setState({rehtoriEmail: e.target.value});
    };
    handlaaReksiTel = (e) => {
        this.setState({rehtoriTel: e.target.value});
    };
    handlaaSihteeri = (e) => {
        this.setState({sihteeri: e.target.value});
    };
    handlaaSihteeriEmail = (e) => {
        this.setState({sihteeriEmail: e.target.value});
    };
    handlaaSihteeriTel = (e) => {
        this.setState({sihteeriTel: e.target.value});
    };

}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(KoulunTietojenMuokkaus);