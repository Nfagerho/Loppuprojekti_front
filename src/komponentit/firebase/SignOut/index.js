import React from 'react';

import { withFirebase } from '../Firebase';

const SignOutButton = ({ firebase }) => (
  <button className="logout" type="button" onClick={firebase.doSignOut}>
    Kirjaudu ulos
  </button>
);

export default withFirebase(SignOutButton);