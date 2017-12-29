import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ColorMessage from './ColorMessage';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ColorMessage name="red"/>, div);
});
