import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {compose} from 'recompose';
import '../../../login/login.css'
import {withFirebase} from '../index.js';

import {lahetaSijainen} from '../../../../restpalvelu';

const SignUpPage = () => (
    <div>
        <h1>Rekisteröidy:</h1>
        <SignUpForm/>
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    sijainenNimi: '',
    sijainenOsoite: '',
    sijainenPuhelinnumero: '',
    sijainenSahkoposti: ''
};

class SignUpFormBase extends Component {
    constructor(props) {
        super(props);

        this.state = {...INITIAL_STATE};
    }

    onSubmit = event => {

        const {username, email, passwordOne} = this.state;

        this.props.firebase
            .doCreateUserWithEmailAndPassword(email, passwordOne)
            .then(authUser => {

                // Create a user in your Firebase realtime database (EI TOIMI!!!!!!!!!!)
                // this.props.firebase
                // .user(authUser.user.uid)
                // .set({
                //   username,
                //   email,
                // })
                // .then(() => {
                //   this.setState({ ...INITIAL_STATE });
                //   this.props.history.push('/sijainen');
                // })
                // .catch(error => {
                //   this.setState({ error });
                // });
                // // -------------------------------------

                this.setState({...INITIAL_STATE});
                this.props.history.push('/sijainen');
            })
            .catch(error => {
                this.setState({error});
            });

        event.preventDefault();

        // Lähetetään sijaisen tiedot postgreSQL-tietokantaan:
        lahetaSijainen({
            sijainenNimi: this.state.username,
            sijainenOsoite: this.state.sijainenOsoite,
            sijainenPuhelinnumero: this.state.sijainenPuhelinnumero,
            sijainenSahkoposti: this.state.email
        });

    }

    // Tapahtumankäsittely nimi-, email- ja salasana-kentille
    onChange = event => {
        this.setState({[event.target.name]: event.target.value});
    };

    // Tapahtumankäsittelyt postgreSQL-tietokantaa varten
    handlaaSijainenOsoite = (e) => {
        this.setState({sijainenOsoite: e.target.value});
    };

    handlaaSijainenPuhelinnumero = (e) => {
        this.setState({sijainenPuhelinnumero: e.target.value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
            sijainenOsoite,
            sijainenPuhelinnumero,
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            !email.includes('@') ||
            sijainenOsoite === '' ||
            sijainenPuhelinnumero === '' ||
            username === '';

        return (
            <form onSubmit={this.onSubmit}>
                <input
                    name="username"
                    value={username}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Nimi"
                />
                &nbsp;
                <input type="text" placeholder="Osoite"
                       value={this.state.sijainenOsoite}
                       onChange={this.handlaaSijainenOsoite}/><br/>
                <br/>
                <input type="text" placeholder="Puhelinnumero"
                       value={this.state.sijainenPuhelinnumero}
                       onChange={this.handlaaSijainenPuhelinnumero}/>
                &nbsp;
                <input
                    name="email"
                    value={email}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Sähköposti"
                /><br/><br/>
                <input
                    name="passwordOne"
                    value={passwordOne}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Salasana"
                />
                &nbsp;
                <input
                    name="passwordTwo"
                    value={passwordTwo}
                    onChange={this.onChange}
                    type="password"
                    placeholder="Salasana uudelleen"
                /><br/><br/>
                <button className="SignIn" disabled={isInvalid} type="submit">Rekisteröidy</button>

                {error && <p>{error.message}</p>}
            </form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Ei vielä käyttäjätiliä? <Link to={'/rekisterointi'}>Rekisteröidy</Link>
    </p>
);

const SignUpForm = compose(
    withRouter,
    withFirebase,
)(SignUpFormBase);

export default SignUpPage;

export {SignUpForm, SignUpLink};