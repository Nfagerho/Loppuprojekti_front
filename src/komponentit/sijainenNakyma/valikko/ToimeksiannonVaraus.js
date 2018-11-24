import React, { Component } from 'react';
import { haeYksittainenToimeksianto, muokkaaToimeksianto } from '../../../restpalvelu' ;

class ToimeksiannonVaraus extends Component {
    state = {
        toimeksiantoId: '',
        oppiaine: '',
        toimeksiantoAlkuaika: '',
        toimeksiantoLoppuaika: '',
        koulu: '',
        sijainen: 1
    };



    componentDidMount () {
         this.haeyksitoimeksianto();
     }

     haeyksitoimeksianto() {
        haeYksittainenToimeksianto(this.yksihaettu, this.props.id);
    }
    yksihaettu = (haettudata, virhe) => {
        if (virhe) {
            alert("virhe");
        } else {
            this.setState({toimeksiantoId: haettudata.toimeksiantoId, oppiaine: haettudata.oppiaine, toimeksiantoAlkuaika: haettudata.toimeksiantoAlkuaika, toimeksiantoLoppuaika: haettudata.toimeksiantoLoppuaika, koulu: haettudata.koulu.kouluId, kouluNimi: haettudata.koulu.kouluNimi, kouluOsoite: haettudata.koulu.kouluOsoite, kouluYhteyshenkilo: haettudata.koulu.kouluYhteyshenkilo
                  });
                
                
            
        }
    }
   
    muokkaatietoja = (e) => {
        e.preventDefault();
        muokkaaToimeksianto(this.state.toimeksiantoId, this.state)
        this.props.varaus();
       
    };

    render() {
        console.log("Muokkaa, render", this.state);
        return (
            <div>   
                    <input type="text" value={this.state.oppiaine}/><br/> 

                    <input type="datetime-local" value={this.state.toimeksiantoAlkuaika}/><br/>
                    
                    <input type="datetime-local" value={this.state.toimeksiantoLoppuaika}/><br/>
                   
                    <input type="text" value={this.state.kouluNimi}/><br/>

                    <input type="text" value={this.state.kouluOsoite}/><br/>

                    <input type="text" value={this.state.kouluYhteyshenkilo}/><br/>

                    <button type="submit" onClick={this.muokkaatietoja}>Vahvista varaus</button>
               
            </div>
        );
    }

  


}



export default ToimeksiannonVaraus;