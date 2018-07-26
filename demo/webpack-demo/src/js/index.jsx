import React from 'react';
import { render } from 'react-dom';
import out from './out';
import '../css/common';
import '../css/index.css';
console.info(121);

document.title = process.env.NODE_ENV;
const element = (
    <h1>{out}</h1>
);

render(
    element,
    document.getElementById('pageContent'),
);
