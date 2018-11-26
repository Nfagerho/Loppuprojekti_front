import React, {Component} from 'react';
import {haeKoulunTiedot} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import {Col, ControlLabel, Form, FormControl, FormGroup} from "react-bootstrap";


// Täällä haetaan koulun omat tiedot. Tällä hetkellä hakee kaikkien koulujen kaikki tiedot. 
class KoulunTiedot extends Component {

    constructor(props) {
        super(props);
        this.state = {kouluntiedotdata: []};

    }

    componentDidMount() {
        this.haekaikki();
    }

    haekaikki() {
        haeKoulunTiedot(this.kaikkihaettu);
    }

    kaikkihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({kouluntiedotdata: haettudata});
        }
    }

    handlaatietojenmuokkaus = (e) => {
        this.props.history.push('/koulunomientietojenmuokkaus/' + e.target.value);
    };

    //Täällä mapataan data
    render() {
        console.log(this.state.kouluntiedotdata);
        var kouluntiedotolio = this.state.kouluntiedotdata.map((kouluntiedotmappi) => {
            if (kouluntiedotmappi && kouluntiedotmappi.kouluId) {
                return <div>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Koulun nimi
                        </Col>

                        <Col sm={3}>
                            <FormControl type="text" placeholder={kouluntiedotmappi.kouluNimi}/>
                        </Col>
                        <Col sm={4}>
                            <FormControl type="text" placeholder={kouluntiedotmappi.kouluOsoite}/>
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder="Y-tunnus"/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Rehtori
                        </Col>

                        <Col sm={3}>
                            <FormControl type="text" placeholder={kouluntiedotmappi.rehtori}/>
                        </Col>
                        <Col sm={4}>
                            <FormControl type="text" placeholder={kouluntiedotmappi.rehtoriEmail}/>
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder={kouluntiedotmappi.rehtoriTel}/>
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            Sihteeri
                        </Col>

                        <Col sm={3}>
                            <FormControl type="text" placeholder={kouluntiedotmappi.sihteeri}/>
                        </Col>
                        <Col sm={4}>
                            <FormControl type="text" placeholder={kouluntiedotmappi.sihteeriEmail}/>
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder={kouluntiedotmappi.sihteeriTel}/>
                        </Col>
                    </FormGroup>
                </div>
            }


        })
        //ja näytetään se sivustolla:
        return (
            <Form horizontal>
                {kouluntiedotolio}
            </Form>
        );

    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(KoulunTiedot);