import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import Substidudes2 from "../../substidudes2.png";
import SignInPage from '../../firebase/SignIn';
import MDspinner from "react-md-spinner";


class SijainenLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showME: true
        };
    }

    componentWillMount() {
        setTimeout(() => {
            this.setState({
                showME: false
            })
        }, 1000)
    }

    render() {
        return (
            <div>{this.state.showME ?
                <div id="spinneri"><MDspinner singleColor="#e42226"/></div>
                :
                <div>
                    <div className="logo">
                        <a href='/'>
                            <img src={Substidudes2} alt="Substidudes-logo"/></a>
                    </div>
                    <br/><br/><br/><br/><br/>
                    <div className="sijainenSignIn">
                        <SignInPage/><br/>
                    </div>
                    <nav className="button-menu">
                        <NavLink className="button2" to='/rekisterointi'><span
                            className="buttontext3">REKISTERÖIDY</span></NavLink>
                    </nav>
                </div>
            }
            </div>
        );
    }
}

export default SijainenLogin;