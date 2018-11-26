import React, {Component} from 'react';
import {haeKaikkiToimeksiannot} from '../../restpalvelu' ;
import {Button, ListGroup, ListGroupItem} from "react-bootstrap";

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
    }

    render() {

        var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
        var toimeksiantooliot = this.state.toimeksiantodata.map(function (toimeksiantomappi) {
                var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
                var aikamuutos1 = new Date(toimeksiantomappi.toimeksiantoLoppuaika);
                // Tähän tulostus avoimista ja varatuista toimeksiannoista. Tee if lause niin että jos sijaista ei ole niin toimeksianto näkyy avoimena. tjsp
                return <ListGroup>
                    <ListGroupItem
                        href="#link1">{aikamuutos.toLocaleTimeString("fi", optiot)} - {aikamuutos1.toLocaleTimeString("fi", optiot)} || Oppiaine: {toimeksiantomappi.oppiaine} || Sijainen: {toimeksiantomappi.sijainen} ||
                        Toimeksiannon ID: {toimeksiantomappi.toimeksiantoId} || <Button type="submit" bsStyle="danger">Poista</Button>
                    </ListGroupItem>
                </ListGroup>

            }
        )

        return (

            <p>
                <p id="tuleva">Avoimet toimeksiannot:</p>
                {toimeksiantooliot}
            </p>
        )
            ;
    }
}

export default KoulunToimeksiannot;
