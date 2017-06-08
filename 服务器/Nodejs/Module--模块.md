# Node.js Module--模块

### 目录



## module (模块)

Node.js 有一个简单的模块加载系统。 在 Node.js 中，文件和模块是一一对应的（每个文件被视为一个独立的模块）。

例子，假设有一个名为 `foo.js` 的文件：

    const circle = require('./circle.js');
    console.log(`半径为 4 的圆的面积是 ${circle.area(4)}`);