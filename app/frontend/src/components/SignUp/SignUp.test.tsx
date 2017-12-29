import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SignUp from './SignUp';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignUp title="test"/>, div);
});
