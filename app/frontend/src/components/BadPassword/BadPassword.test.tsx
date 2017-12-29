import * as React from 'react';
import * as ReactDOM from 'react-dom';
import BadPassword from './BadPassword';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BadPassword value="test"/>, div);
});
