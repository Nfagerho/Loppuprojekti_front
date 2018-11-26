import React, {Component} from 'react';
import Substidudes2 from '../substidudes2.png'
import {Button, Col, Grid, Row, Thumbnail} from "react-bootstrap";
import koulu from './koulu.png';
import './koulu.css';
import KoulunTiedot from "./koulu/KoulunTiedot";
import KoulunToimeksiannot from "./koulu/KoulunToimeksiannot";

class KouluNakyma extends Component {

    render() {
        return (
            <div>
                <div className="logo">
                    <a href='/'>
                        <img src={Substidudes2}/></a><br/><br/><br/><br/><br/>
                </div>
                <Grid>
                    <Row className="show-grid">
                        <Col sm={2}>
                            <Thumbnail src={koulu}>
                                <h3>Koulun nimi</h3>
                                <p>Osoite</p>
                                <p>
                                    <Button bsStyle="info">Vaihda kuva</Button>
                                </p>
                            </Thumbnail>
                        </Col>
                        <Col sm={8}>
                            <KoulunTiedot/>
                            <KoulunToimeksiannot/>
                        </Col>
                    </Row>
                </Grid>;
            </div>
        );
    }
}

export default KouluNakyma;