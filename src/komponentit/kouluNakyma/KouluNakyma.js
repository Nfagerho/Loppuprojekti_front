import React, {Component} from 'react';
import Substidudes2 from '../substidudes2.png'
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Grid, Row, Thumbnail} from "react-bootstrap";
import koulu from './koulu.png';
import './koulu.css';
import KoulunToimeksiannot from "./KoulunToimeksiannot";
import {haeKoulunTiedot} from "../../restpalvelu";
import KoulunTiedot from "./koulu/KoulunTiedot";

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
                            <KoulunToimeksiannot/>
                        </Col>
                    </Row>
                </Grid>;
            </div>
        );
    }
}

export default KouluNakyma;