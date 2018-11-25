import React, {Component} from 'react';
import Substidudes2 from '../substidudes2.png'
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row, Thumbnail} from "react-bootstrap";
import koulu from './koulu.png';
import './koulu.css';

class KouluNakyma extends Component {
    render() {
        return (
            <div>
                <div className="logo">
                    <img src={Substidudes2}/><br/><br/><br/><br/><br/>
                </div>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={4}>
                            <Thumbnail src={koulu} alt="242x200">
                                <h3>Koulun nimi</h3>
                                <p>Osoite</p>
                                <p>
                                    <Button bsStyle="primary">Vaihda kuva</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                        <Col sm={8}>
                            <Form horizontal>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Koulun nimi
                                    </Col>

                                    <Col sm={3}>
                                        <FormControl type="text" placeholder="Default"/>
                                    </Col>
                                    <Col sm={4}>
                                        <FormControl type="text" placeholder="Osoite"/>
                                    </Col>
                                    <Col sm={2}>
                                        <FormControl type="text" placeholder="Y-tunnus"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Rehtori
                                    </Col>

                                    <Col sm={3}>
                                        <FormControl type="text" placeholder="Riku Rehtori"/>
                                    </Col>
                                    <Col sm={4}>
                                        <FormControl type="text" placeholder="email"/>
                                    </Col>
                                    <Col sm={2}>
                                        <FormControl type="text" placeholder="puhelin"/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col componentClass={ControlLabel} sm={2}>
                                        Sihteeri
                                    </Col>

                                    <Col sm={3}>
                                        <FormControl type="text" placeholder="Sihteeri"/>
                                    </Col>
                                    <Col sm={4}>
                                        <FormControl type="text" placeholder="email"/>
                                    </Col>
                                    <Col sm={2}>
                                        <FormControl type="text" placeholder="puhelin"/>
                                    </Col>
                                </FormGroup>
                            </Form>

                        </Col>
                    </Row>
                </Grid>;
            </div>
        );
    }
}

export default KouluNakyma;