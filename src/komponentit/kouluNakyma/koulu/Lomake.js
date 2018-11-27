import React, {Component} from 'react';
import {lahetaToimeksianto} from "../../../restpalvelu";
import {Button, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
import withAuthorization from "../../firebase/Session/withAuthorization";
import './Lomake.css';
import MDspinner from "react-md-spinner";

//Täällä koulu pystyy lisäämään uuden toimeksiannon. Tällä hetkellä kovakoodattu kouluID 1.
class Lomake extends Component {
    state = {
        toimeksiantoId: '',
        kouluNimi: '',
        kouluOsoite: '',
        kouluYhteyshenkilo: '',
        toimeksiantoAlkuaika: '',
        toimeksiantoLoppuaika: '',
        oppiaine: '',
        koulu: 1,
        showME: true,
        toimeksiantoLuotu: false
    };

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showME: false
            })
        }, 1000)
    }

    lahetaLomake = () => {
        lahetaToimeksianto(this.state);
        this.setState({toimeksiantoLuotu: true});
        this.props.history.push('/koulunakyma/');
    };
    peruuta = (e) => {
        this.props.history.push('/koulunakyma/' + e.target.value);
    };

    render() {
        return (
            <div>{this.state.showME ?
                <div id="spinneri"><MDspinner/></div>
                :
                <div>
                    <Row>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Toimeksiannon Alkuaika:
                            </Col>
                            <Col sm={2}>
                                <FormControl
                                    type="datetime-local"
                                    placeholder=""
                                    value={this.state.toimeksiantoAlkuaika}
                                    onChange={this.handlaatoimeksiantoAlkuaika}/><br/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Toimeksiannon Loppuaika:
                            </Col>
                            <Col sm={2}>
                                <FormControl
                                    type="datetime-local"
                                    placeholder=""
                                    value={this.state.toimeksiantoLoppuaika}
                                    onChange={this.handlaatoimeksiantoLoppuaika}/><br/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Row>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Oppiaine:
                            </Col>
                            <Col sm={2}>
                                <FormControl
                                    type="text" placeholder=""
                                    value={this.state.oppiaine}
                                    onChange={this.handlaaoppiaine}/><br/>
                            </Col>
                        </FormGroup>
                    </Row>
                    <Button id="submit-btn" onClick={this.lahetaLomake}>Luo</Button>
                    <Button onClick={this.peruuta}>Peruuta</Button>
                </div>
            }
            </div>
        );
    }

    handlaaKouluNimi = (e) => {
        this.setState({kouluNimi: e.target.value});
    };
    handlaaKouluOsoite = (e) => {
        this.setState({kouluOsoite: e.target.value});
    };
    handlaaKouluYhteyshenkilo = (e) => {
        this.setState({kouluYhteyshenkilo: e.target.value});
    };
    handlaatoimeksiantoAlkuaika = (e) => {
        this.setState({toimeksiantoAlkuaika: e.target.value});
    };
    handlaatoimeksiantoLoppuaika = (e) => {
        this.setState({toimeksiantoLoppuaika: e.target.value});
    };
    handlaaoppiaine = (e) => {
        this.setState({oppiaine: e.target.value});
    };
    handlaaPoistoByToimeksiantoId = (e) => {
        this.setState({toimeksiantoId: e.target.value})
    };
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Lomake);