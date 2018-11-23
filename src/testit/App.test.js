import React from 'react';
import ReactDOM from 'react-dom';
import SijainenNakyma from '../komponentit/sijainenNakyma/SijainenNakyma';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SijainenNakyma />, div);
  ReactDOM.unmountComponentAtNode(div);
});
