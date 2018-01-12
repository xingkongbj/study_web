# yarn 简单教程

## 安装

    brew install yarn

## 初始化新项目

    yarn init

## 添加依赖包

    yarn add [package]
    yarn add [package]@[version]
    yarn add [package]@[tag]

## 将依赖项添加到不同依赖项类别

    // 分别添加到 devDependencies、peerDependencies 和 optionalDependencies
    yarn add [package] --dev
    yarn add [package] --peer
    yarn add [package] --optional

## 升级依赖包

    yarn upgrade [package]
    yarn upgrade [package]@[version]
    yarn upgrade [package]@[tag]

## 移除依赖包

    yarn remove [package]

## 安装项目的全部依赖

    yarn
    // 或
    yarn install
