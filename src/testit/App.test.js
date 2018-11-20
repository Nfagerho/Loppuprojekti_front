import React from 'react';
import ReactDOM from 'react-dom';
import Etusivu from '../komponentit/etusivu/Etusivu';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Etusivu />, div);
  ReactDOM.unmountComponentAtNode(div);
});
