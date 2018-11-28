import React, {Component} from 'react';
import {haeYksittainenToimeksianto, muokkaaToimeksianto, poistaToimeksianto} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import MDspinner from "react-md-spinner";
import Substidudes2 from "../../substidudes2.png";
import {Button, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";

//Täällä haetaan muokattavan toimeksiannon tiedot ja asetetaan ne stateen. 

class VahvistaToimeksianto extends Component {
    state = {
        toimeksiantoId: '',
        toimeksiantoAlkuaika: '',
        toimeksiantoLoppuaika: '',
        oppiaine: '',
        koulu: 1,
        sijainen: '',
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
        this.haeyksi();
    }

    //Haetaan selaimesta tulevalla id:llä (this.props.match.params.id) yksittäisen toimeksiannon tiedot ja
    //laitetaan sen jälkeen setStatella ne stateksi. Tällöin lomake saa tiedot automaattisesti ja voit muokata niitä haluamallasi tavalla
    haeyksi() {
        haeYksittainenToimeksianto(this.yksihaettu, this.props.match.params.id);
    }

    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({
                toimeksiantoId: haettudata.toimeksiantoId,
                toimeksiantoAlkuaika: haettudata.toimeksiantoAlkuaika,
                toimeksiantoLoppuaika: haettudata.toimeksiantoLoppuaika,
                oppiaine: haettudata.oppiaine,
                sijainen: haettudata.sijainen,
                vahvistus: true
            });
            console.log("Sijainen"+ this.state.sijainen.sijainenNimi)


        }
    }

    //Lomakkeen muokkausfunktio, joka aktivoituu buttonin painalluksesta. Kun muokkaus on tehty, siirtää se sivuston automaattisesti
    //omiin toimeksiantoihin.
    vahvistalomake = (e) => {
        e.preventDefault();
        muokkaaToimeksianto(this.state.toimeksiantoId, this.state)
        this.props.history.push('/koulunakyma/');
    };
    peruuta = (e) => {
        muokkaaToimeksianto(this.state.toimeksiantoId, this.state)
        this.props.history.push('/koulunakyma/' + e.target.value);
    };

    render() {
        return (
            <div>{this.state.showME ?
                <div id="spinneri"><MDspinner singleColor="#e42226"/></div>
                :
                <div>
                    <div className="logo">
                        <a href='/'>
                            <img src={Substidudes2} alt="Substidudes-logo"/></a><br/><br/><br/><br/><br/><br/>
                    </div>
                    <Col id="lomake2Col">
                        <Row>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Toimeksiannon alkuaika:
                                </Col>
                                <Col sm={3}>
                                    <FormControl
                                        type="datetime-local"
                                        placeholder=""
                                        value={this.state.toimeksiantoAlkuaika}
                                       /><br/>
                                </Col>
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Toimeksiannon loppuaika:
                                </Col>
                                <Col sm={3}>
                                    <FormControl
                                        type="datetime-local"
                                        placeholder=""
                                        value={this.state.toimeksiantoLoppuaika}
                                        /><br/>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Oppiaine:
                                </Col>
                                <Col sm={3}>
                                    <FormControl
                                        type="text" placeholder=""
                                        value={this.state.oppiaine}
                                        /><br/>
                                </Col>
                            </FormGroup>
                        </Row>
                        <Row>
                            <FormGroup>
                                <Col componentClass={ControlLabel} sm={2}>
                                    Sijaisen tiedot: 
                                </Col>
                                <Col sm={3}>
                                {this.state.sijainen.sijainenNimi} <br/> 
                                {this.state.sijainen.sijainenPuhelinnumero} <br/> 
                                {this.state.sijainen.sijainenSahkoposti}<br/> 
                                </Col>
                            </FormGroup>
                        </Row>
                    </Col>
                    <br/>
                    <Button id="submit-btn2" onClick={this.vahvistalomake}>Vahvista sijaisuus</Button>
                    <Button onClick={this.peruuta}>Hylkää sijaisuus</Button>
                    
                </div>
            }
            </div>
        );
    }

}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(VahvistaToimeksianto);