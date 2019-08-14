import React from 'react';
import { render } from 'react-dom';
import out from './out';
import '../css/common';
import '../css/index2.css';

const element = (
    <h1>{out}</h1>
);

render(
    element,
    document.getElementById('pageContent')
);
