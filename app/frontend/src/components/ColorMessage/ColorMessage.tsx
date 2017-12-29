import * as React from 'react';
import './ColorMessage.css';

interface ColorMessageProperties {
    name: string;
}

export default ({name}: ColorMessageProperties) => (
    <b>{name}, </b>
);
