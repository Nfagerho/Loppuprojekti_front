import React from 'react';

import {withFirebase} from '../Firebase';
import {Button} from "react-bootstrap";

const SignOutButton = ({firebase}) => (
    <Button bsStyle="danger" type="button" onClick={firebase.doSignOut}>
        <h1>Kirjaudu ulos</h1>
    </Button>
);

export default withFirebase(SignOutButton);