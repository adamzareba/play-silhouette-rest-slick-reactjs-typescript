import * as React from 'react';
import './BadPassword.css';

export interface BadPasswordProperties {
    value: string;
}

export default ({value}: BadPasswordProperties) => (
    <div>
        {localStorage.getItem('token') &&
        <p className="lead">You should not use {value} as your password!</p>
        }
    </div>
);
