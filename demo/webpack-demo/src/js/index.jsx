import React from 'react';
import { render } from 'react-dom';

import '../css/common';
import '../css/index.css';


document.title = process.env.NODE_ENV;
const element = () => (
    <h1>是大幅度发</h1>
);

render(
    <h1>Hello, world2!</h1>,
    document.getElementById('pageContent')
);
