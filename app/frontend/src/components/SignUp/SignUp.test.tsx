import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SignUp from './SignUp';
import {BrowserRouter} from 'react-router-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><SignUp title="test"/></BrowserRouter>, div);
});
