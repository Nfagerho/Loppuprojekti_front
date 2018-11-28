import React, {Component} from 'react';
import {haeKaikkiToimeksiannot, poistaToimeksianto} from '../../../restpalvelu';
import {withAuthorization} from '../../firebase/Session';
import {Button, Col, ListGroup, ListGroupItem} from "react-bootstrap";
import './Lomake.css';


//Täällä haetaan yksittäiseen kouluun liittyvät toimeksiannot. Tällä hetkellä koodiin on kovakoodattu koulunID 1. Tämä pitäisi
//saada vastaamaan sisäänkirjautuneen koulun ID:tä Firebasen kautta.
class KoulunToimeksiannot extends Component {
    constructor(props) {
        super(props);
        this.state = {toimeksiantodata: []};
    }

    componentDidMount() {
        this.haekaikki();
    }

    haekaikki() {
        haeKaikkiToimeksiannot(this.kaikkihaettu);
    }

    kaikkihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantodata: haettudata});

        }
    };
    poistaToimeksiantoById = (e) => {
        e.preventDefault();
        poistaToimeksianto(e.target.value).then((function () {
            this.haekaikki();
        }).bind(this));
    };
    handlaamuokkaus = (e) => {
        this.props.history.push('/muokkaalomake/' + e.target.value);
    };

    vahvistaToimeksianto = (e) => {
        this.props.history.push('/vahvistatoimeksianto/' + e.target.value);
    }

//Alla olevaan mappaukseen on kovakoodattu kouluID 1. Eli IF-lause tsekkaa, onko toimeksiantoon kytketyn koulun ID 1, jos on niin
//näyttää toimeksiannon. Jos ei, niin ei näytä mitään.
    render() {
        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliot = this.state.toimeksiantodata.map((toimeksiantomappi) => {
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
            if (toimeksiantomappi.koulu && toimeksiantomappi.koulu.kouluId === 1) {
                if (toimeksiantomappi.sijainen !== null && toimeksiantomappi.vahvistus === true) {
                    return <Col id="toimeksiannot"
                                sm={8}
                                key={toimeksiantomappi.toimeksiantoId}>
                        {toimeksiantomappi.koulu &&
                        <ListGroupItem>
                            <b id="varatutTeksti">VAHVISTETTU SIJAISUUS</b><br/>
                            <b>Oppiaine:</b> {toimeksiantomappi.oppiaine}<br/>
                            <b>Alkaa:</b> {aikamuutos.toLocaleTimeString("fi", optiot)}<span> </span> <b>Loppuu:</b> {aikamuutos1.toLocaleTimeString("fi", optiot)}<br/>
                            <b>Sijainen:</b> {toimeksiantomappi.sijainen.sijainenNimi}
                        </ListGroupItem>}
                        <Button type="button"
                                bsSize="small"
                                id="nappi1"
                                value={toimeksiantomappi.toimeksiantoId}
                                onClick={this.handlaamuokkaus}>Muokkaa
                        </Button>
                        <Button type="button" bsStyle="danger"
                                value={toimeksiantomappi.toimeksiantoId}
                                bsSize="small"
                                onClick={this.poistaToimeksiantoById}>Poista</Button>
                    </Col>
                }
            }

        });
        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliot2 = this.state.toimeksiantodata.map((toimeksiantomappi) => {
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
            if (toimeksiantomappi.koulu && toimeksiantomappi.koulu.kouluId === 1) {
                if (toimeksiantomappi.sijainen === null && toimeksiantomappi.vahvistus === false) {
                    return <Col id="toimeksiannot"
                                sm={8}
                                key={toimeksiantomappi.toimeksiantoId}>
                        {toimeksiantomappi.koulu &&
                        <ListGroup>
                            <ListGroupItem>
                                <b id="avoimetTeksti">AVOIN SIJAISUUS</b><br/>
                                <b>Oppiaine:</b> {toimeksiantomappi.oppiaine}<br/>
                                <b>Alkaa:</b> {aikamuutos.toLocaleTimeString("fi", optiot)}<span> </span>
                                <b>Loppuu:</b> {aikamuutos1.toLocaleTimeString("fi", optiot)}
                            </ListGroupItem>
                        </ListGroup>}
                        <Button type="button"
                                bsSize="small"
                                id="nappi1"
                                value={toimeksiantomappi.toimeksiantoId}
                                onClick={this.handlaamuokkaus}>Muokkaa
                        </Button>
                        <Button type="button" bsStyle="danger"
                                value={toimeksiantomappi.toimeksiantoId}
                                bsSize="small"
                                onClick={this.poistaToimeksiantoById}>Poista</Button>
                    </Col>
                }
            }
        });

        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliot3 = this.state.toimeksiantodata.map((toimeksiantomappi) => {
            var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
            var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
            if (toimeksiantomappi.koulu && toimeksiantomappi.koulu.kouluId === 1) {
                if (toimeksiantomappi.sijainen !== null && toimeksiantomappi.vahvistus === false) {
                    return <Col id="toimeksiannot"
                                sm={8}
                                key={toimeksiantomappi.toimeksiantoId}>
                        {toimeksiantomappi.koulu &&
                        <ListGroupItem>
                            <b id="vahvistamatonteksti">VAHVISTAMATON SIJAISUUS</b><br/>
                            <b>Oppiaine:</b> {toimeksiantomappi.oppiaine}<br/>
                            <b>Alkaa:</b> {aikamuutos.toLocaleTimeString("fi", optiot)}<span> </span> <b>Loppuu:</b> {aikamuutos1.toLocaleTimeString("fi", optiot)}<br/>
                            <b>Sijainen:</b> {toimeksiantomappi.sijainen.sijainenNimi}
                        </ListGroupItem>}
                        <Button type="button" bsStyle="danger"
                                id="nappi2"
                                value={toimeksiantomappi.toimeksiantoId}
                                bsSize="small"
                                onClick={this.vahvistaToimeksianto}>Tarkastele</Button>
                    </Col>
                }
            }

        });
        return (<div>
                {toimeksiantooliot}
                {toimeksiantooliot2}
                {toimeksiantooliot3}
            </div>
        );
    }
}

const condition = authUser => !!authUser;

export default withAuthorization(condition)(KoulunToimeksiannot);