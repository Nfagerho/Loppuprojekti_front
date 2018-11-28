import React from 'react';

import {withFirebase} from '../Firebase';
import {Button} from "react-bootstrap";

const SignOutButton = ({firebase}) => (
    <Button bsStyle="danger" type="button" onClick={firebase.doSignOut}>
        Kirjaudu ulos
    </Button>
);

export default withFirebase(SignOutButton);