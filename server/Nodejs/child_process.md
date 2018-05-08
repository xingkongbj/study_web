# child_process--子进程

## child_process.exec(command[, options][, callback])--异步执行命令

- command string 运行的命令，参数使用空格分隔。
- options Object
    - cwd string 子进程的当前工作目录。
    - env Object 环境变量键值对。
    - encoding string 默认为 'utf8'。
    - shell string 执行命令的 shell。在 UNIX 上默认为 '/bin/sh'，在 Windows 上默认为 process.env.ComSpec。详见Shell的要求与Windows默认的Shell。
    - timeout number 默认为 0。
    - maxBuffer number stdout 或 stderr 允许的最大字节数。默认为 200*1024。如果超过限制，则子进程会被终止。详见 maxBuffer与Unicode。
    - killSignal string | integer 默认为 'SIGTERM'。
    - uid number 设置进程的用户标识。
    - gid number 设置进程的组标识。
    - windowsHide boolean 隐藏子进程的控制台窗口，常用于 Windows 系统。默认为 false。
- callback Function 进程终止时调用。
    - error Error
    - stdout string | Buffer
    - stderr string | Buffer
- 返回: ChildProcess

```
exec('echo "The \\$HOME variable is $HOME"', (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
});
```

## child_process.execSync(command[, options])--同步执行命令

- 返回: Buffer | string 该命令的 stdout。
- child_process.exec 类似，没有 callback，同步操作。