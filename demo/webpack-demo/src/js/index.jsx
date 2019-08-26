import React from 'react';
import { render } from 'react-dom';
import '../css/common.css';
import '../css/index.css';

document.title = process.env.NODE_ENV;

render(
    <h1>Hello, world!</h1>,
    document.getElementById('pageContent')
);

// 模块热加载，不刷新加载
if (module.hot) {
    module.hot.accept();
}
