import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Firebase, { FirebaseContext } from './komponentit/firebase/Firebase';


ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <App />
    </FirebaseContext.Provider>, 
document.getElementById('root'));