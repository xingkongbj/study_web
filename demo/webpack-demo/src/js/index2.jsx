import React from 'react';
import { render } from 'react-dom';
import out from './out';
import '../css/common.css';
import '../css/index2.css';

function Welcome(props) {
    return <h1>Hello, {props.name},{ out }</h1>;
}

const element = <Welcome name="Sara" />;

render(
    element,
    document.getElementById('pageContent')
);

// 模块热加载，不刷新加载
if (module.hot) {
    module.hot.accept();
}
