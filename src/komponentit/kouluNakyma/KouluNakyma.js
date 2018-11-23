import React, {Component} from 'react';
import {Col, ControlLabel, Form, FormControl, FormGroup, Grid} from "react-bootstrap";

class KouluNakyma extends Component {
    render() {
        return (
            <Grid>
                <Form horizontal>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Koulun nimi
                        </Col>
                        <Col sm={2}>
                            <FormControl type="text" placeholder="Default"/>
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder="Osoite"/>
                        </Col>
                        <Col sm={2}>
                            <FormControl type="text" placeholder="Y-tunnus"/>
                        </Col>
                    </FormGroup>
                    <FormGroup controlId="formHorizontalEmail">
                        <Col componentClass={ControlLabel} sm={2}>
                            Rehtori
                        </Col>
                        <Col sm={2}>
                            <FormControl type="text" placeholder="Riku Rehtorimiäs"/>
                        </Col>
                        <Col sm={2}>
                            <FormControl type="text" placeholder="Puhelin"/>
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder="email"/>
                        </Col>
                    </FormGroup>

                    <FormGroup controlId="formHorizontalPassword">
                        <Col componentClass={ControlLabel} sm={2}>
                            Sihteeri
                        </Col>
                        <Col sm={2}>
                            <FormControl type="text" placeholder="Sihteeri"/>
                        </Col>
                        <Col sm={2}>
                            <FormControl type="text" placeholder="Puhelin"/>
                        </Col>
                        <Col sm={3}>
                            <FormControl type="text" placeholder="email"/>
                        </Col>
                    </FormGroup>
                </Form>
            </Grid>

        );
    }
}

export default KouluNakyma;