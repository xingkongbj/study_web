# husky--git提交触发

> https://www.npmjs.com/package/husky

## 安装

```
// npm
npm install husky --save-dev
// yarn
yarn add husky --dev
```

## 配置

```
// npm package.json
{
  "scripts": {
    "precommit": "npm test",  // git commit 前执行
    "prepush": "npm test"     // git push 前执行
  }
}
```