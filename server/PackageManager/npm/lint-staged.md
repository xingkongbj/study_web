# lint-staged--lint检测git下暂存文件

> https://www.npmjs.com/package/lint-staged

## 安装

```
// npm
npm install --save-dev lint-staged
```

## 配置

两种方式选择一种

```
// package.json
{
  "scripts": {
    "precommit": "lint-staged",
  },
  "lint-staged": {
    "*": "your-cmd"
  }
}

// .lintstagedrc
{
  "*": "your-cmd"
}
```

路径识别

```
{
  // 项目中所有.js文件
  "*.js": "eslint",
  // 项目中所有.js文件
  "**/*.js": "eslint",
  // src目录下的.js文件
  "src/*.js": "eslint",
  // src目录下及其递归目录下的.js文件
  "src/**/*.js": "eslint",
}
```

支持同时执行多条语句，按先后顺序执行

```
{
  "*.js": ["eslint --fix", "git add"]
}
```

支持多后缀同时识别

```
{
  "*.{js,jsx}": "eslint"
}
```