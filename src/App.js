import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Switch, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import SijainenNakyma from './komponentit/sijainenNakyma/SijainenNakyma';
import Etusivu from './komponentit/Etusivu';
import SijainenLogin from './komponentit/login/sijainen/SijainenLogin';
import KouluLogin from './komponentit/login/koulu/KouluLogin';
import Rekisterointi from './komponentit/login/rekisterointi/Rekisterointi';
import KaikkiToimeksiannot from './komponentit/sijainenNakyma/valikko/KaikkiToimeksiannot';
import KoulunTiedot from './komponentit/kouluNakyma/koulu/KoulunTiedot';
import SijaisenTiedot from './komponentit/sijainenNakyma/valikko/SijaisenTiedot';
import SijaisenTietojenMuokkaus from './komponentit/sijainenNakyma/valikko/SijaisenTietojenMuokkaus';
import KoulunTietojenMuokkaus from './komponentit/kouluNakyma/koulu/KoulunTietojenMuokkaus';
import KoulunToimeksiannot from './komponentit/kouluNakyma/koulu/KoulunToimeksiannot';
import SijaisenToimeksiannot from './komponentit/sijainenNakyma/valikko/SijaisenToimeksiannot';
import SivuaEiLoytynyt from './komponentit/SivuaEiLoytynyt';
import Lomake from './komponentit/kouluNakyma/koulu/Lomake';
import KouluNakyma from './komponentit/kouluNakyma/KouluNakyma';

import MuokkaaToimeksiantoa from "./komponentit/kouluNakyma/koulu/MuokkaaToimeksiantoa";
import KouluNakyma from './komponentit/kouluNakyma/KouluNakyma';

import { withAuthentication } from './komponentit/firebase/Session';
import SignInPage from './komponentit/firebase/SignIn';

const App = () => (
    <BrowserRouter>
<<<<<<< HEAD
        <Route>
        <Route exact path='/' component={Etusivu}></Route>
=======
        <Switch>
            <Route exact path='/' component={Etusivu}></Route>
>>>>>>> be64e7fa3cb1b5fe0df2febfbca23b44e50d8d16
            <Route exact path='/sijainen' component={SijainenNakyma}></Route>
            <Route exact path='/sijainenlogin' component={SijainenLogin}></Route>
            <Route exact path='/koululogin' component={KouluLogin}></Route>
            <Route exact path='/rekisterointi' component={Rekisterointi}></Route>
            

            {/* Alla olevat sivut ovat suojattuja (autentikoinnin takana) */}
            <Route exact path='/toimeksiannot' component={KaikkiToimeksiannot}></Route>
            <Route path='/koulunakyma' component={KouluNakyma}></Route>
            <Route exact path='/kouluntiedot' component={KoulunTiedot}></Route>
            <Route exact path='/sijaisentiedot' component={SijaisenTiedot}></Route>
            <Route path='/sijaisenomientietojenmuokkaus/:id' component={SijaisenTietojenMuokkaus}></Route>
            <Route path='/koulunomientietojenmuokkaus/:id' component={KoulunTietojenMuokkaus}></Route>
            <Route exact path='/koulunomattoimeksiannot' component={KoulunToimeksiannot}></Route>
            <Route exact path='/sijaisenomattoimeksiannot' component={SijaisenToimeksiannot}></Route>
            <Route exact path='/lomake' component={Lomake}></Route>
            <Route path='/muokkaalomake/:id' component={MuokkaaToimeksiantoa}></Route>
<<<<<<< HEAD
            <Route path='/testikirjautuminen' component={SignInPage}></Route>
            <Route path='/koulunakyma' component={KouluNakyma}></Route>
            <Route component={SivuaEiLoytynyt} />
        </Route>

=======
            {/* Tätä testikirjautumista käytettiin testailuun. Nyt tarpeeton?
             <Route path='/testikirjautuminen' component={SignInPage}></Route> */}
            <Route component={SivuaEiLoytynyt} />
            {/* HUOM.!!!!!!!!!!! Kun lisäät uuden reitityksen, muista salaus kyseiseen komponenttiin. */}
        </Switch>
>>>>>>> be64e7fa3cb1b5fe0df2febfbca23b44e50d8d16
    </BrowserRouter>    
  );
  
  export default withAuthentication(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

