import React, { Component } from 'react';
import { haeKaikkiToimeksiannot } from '../../../../restpalvelu' ;

//Täällä näytetään kaikki mahdolliset toimeksiannot. Koodiin ei ole vielä lisätty ominaisuutta, joka blokkaisi ne toimeksiannot, jotka
//on jo kytketty johonkin sijaiseen
class KaikkiToimeksiannot extends Component {

constructor(props) {
    super(props);
    this.state = {toimeksiantodata: []};
}
componentDidMount () {
    this.haekaikki();
}
haekaikki() {
    haeKaikkiToimeksiannot(this.kaikkihaettu);
}
kaikkihaettu = (haettudata, virhe) => {
    if(virhe) {
        alert("virhe");
    } else {
        this.setState({toimeksiantodata: haettudata});
        console.log(this.state.toimeksiantodata);
    }
};
//Datan mappaus
render() {
    var optiot = {day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'};
    var toimeksiantooliot = this.state.toimeksiantodata.map(function(toimeksiantomappi){
        var aikamuutos = new Date(toimeksiantomappi.toimeksiantoAlkuaika);
        return <li key={toimeksiantomappi.toimeksiantoId}>{toimeksiantomappi.oppiaine}<li>Alkaa: {aikamuutos.toLocaleTimeString("fi", optiot)} Loppuu: {aikamuutos.toLocaleTimeString("fi", optiot)}</li>
        {toimeksiantomappi.koulu &&
                 <li>Koulu:{toimeksiantomappi.koulu.kouluNimi} Osoite: {toimeksiantomappi.koulu.kouluOsoite} Yhteyshenkilö:{toimeksiantomappi.koulu.kouluYhteyshenkilo}</li>}</li>
       
    })
//Datan näyttö sivustolla:
    return (    
        <ul>
            {toimeksiantooliot}
        </ul>
    );
    
}
}

export default KaikkiToimeksiannot;