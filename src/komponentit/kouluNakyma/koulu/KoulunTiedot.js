import React, {Component} from 'react';
import {haeKoulunTiedot} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row, Thumbnail} from "react-bootstrap";
import koulu from "../koulu.jpg";
import KoulunToimeksiannot from "./KoulunToimeksiannot";
import Lomake from "./Lomake";
import {Link} from "react-router-dom";


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
    };

    siirryLomakkeelle= (e) => {
        this.props.history.push('/lomake/'+ e.target.value);
    };

    handlaatietojenmuokkaus = (e) => {
        this.props.history.push('/koulunomientietojenmuokkaus/' + e.target.value);
    };

    //Täällä mapataan data
    render() {

        var kouluntiedotolio = this.state.kouluntiedotdata.map((kouluntiedotmappi) => {
            if (kouluntiedotmappi && kouluntiedotmappi.kouluId) {
                return <Grid>
                    <Row>
                        <Col sm={2}>
                            <Thumbnail src={koulu}>
                                <h3>{kouluntiedotmappi.kouluNimi}</h3>
                                <p>{kouluntiedotmappi.kouluOsoite}</p>
                                <Button onClick={this.siirryLomakkeelle}>Luo uusi toimeksianto</Button>
                            </Thumbnail>
                        </Col>
                        <Col sm={10}>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Koulun nimi
                            </Col>
                            <Col sm={2}>
                                <FormControl type="text" placeholder={kouluntiedotmappi.kouluNimi}/>
                            </Col>
                            <Col sm={3}>
                                <FormControl type="text" placeholder={kouluntiedotmappi.kouluOsoite}/>
                            </Col>
                            <Col sm={2}>
                                <FormControl type="text" placeholder="Y-tunnus"/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Rehtori
                            </Col>
                            <Col sm={2}>
                                <FormControl type="text" placeholder={kouluntiedotmappi.rehtori}/>
                            </Col>
                            <Col sm={3}>
                                <FormControl type="text" placeholder={kouluntiedotmappi.rehtoriEmail}/>
                            </Col>
                            <Col sm={2}>
                                <FormControl type="text" placeholder={kouluntiedotmappi.rehtoriTel}/>
                            </Col>
                        </FormGroup>
                        <FormGroup>
                            <Col componentClass={ControlLabel} sm={2}>
                                Sihteeri
                            </Col>
                            <Col sm={2}>
                                <FormControl type="text" placeholder={kouluntiedotmappi.sihteeri}/>
                            </Col>
                            <Col sm={3}>
                                <FormControl type="text" placeholder={kouluntiedotmappi.sihteeriEmail}/>
                            </Col>
                            <Col sm={2}>
                                <FormControl type="text" placeholder={kouluntiedotmappi.sihteeriTel}/>
                            </Col>
                            <Button
                                id="muokkaatietojanappi"
                                value={kouluntiedotmappi.kouluId}
                                onClick={this.handlaatietojenmuokkaus}>
                                Muokkaa tietoja
                            </Button>
                        </FormGroup>
                            <div id="toimeksianto-teksti"><b>Toimeksiannot:</b></div>
                            <KoulunToimeksiannot/>
                        </Col>
                    </Row>
                </Grid>
            }
        });
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