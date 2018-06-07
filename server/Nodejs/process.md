# process--进程

## process.argv--返回数组包含了启动 Node.js 进程时的命令行参数

```
$ node process-args.js one two=three four

返回
[
    "/usr/local/bin/node",
    "/Users/mjr/work/node/process-args.js",
    "one",
    "two=three",
    "four",
] 
```