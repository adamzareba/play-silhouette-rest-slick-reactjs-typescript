import * as React from 'react';
import './BadPassword.css';
import { authenticationService } from '../../services/authenticationService';

export interface BadPasswordProperties {
    value: string;
}

export default ({value}: BadPasswordProperties) => (
    <div>
        {authenticationService.isAuthenticated() &&
        <p className="lead">You should not use {value} as your password!</p>
        }
    </div>
);
