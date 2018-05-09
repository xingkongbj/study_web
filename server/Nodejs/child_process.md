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

## child_process.execFile(file[, args][, options][, callback])--异步执行文件

- file string 要运行的可执行文件的名称或路径。
- args string[] 字符串参数列表。
- options Object
    - cwd string 子进程的当前工作目录。
    - env Object 环境变量键值对。
    - encoding string 默认为 'utf8'。
    - timeout number 默认为 0。
    - maxBuffer number stdout 或 stderr 允许的最大字节数。默认为 200*1024。如果超过限制，则子进程会被终止。详见 maxBuffer与Unicode。
    - killSignal string | integer 默认为 'SIGTERM'。
    - uid number 设置进程的用户标识。
    - gid number 设置进程的组标识。
    - windowsHide boolean 隐藏子进程的控制台窗口，常用于 Windows 系统。默认为 false。
    - windowsVerbatimArguments boolean 决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略，当指令 shell 存在的时该属性将自动被设置为true。默认为: false。
- callback Function 进程终止时调用。
    - error Error
    - stdout string | Buffer
    - stderr string | Buffer
- 返回: ChildProcess

```
execFile('node', ['--version'], (error, stdout, stderr) => {
  if (error) {
    throw error;
  }
  console.log(stdout);
  console.log(stderr);
});
```

## child_process.execFileSync(file[, args][, options])--同步执行文件

- 返回: Buffer | string 该命令的 stdout。
- child_process.exec 类似，没有 callback，同步操作。

## child_process.spawn(command[, args][, options])--子进程异步执行命令

- command string 要运行的命令。
- args Array 字符串参数列表。
    - cwd string 子进程的当前工作目录。
    - env Object 环境变量键值对。
    - argv0 string 显式地设置要发给子进程的 argv[0] 的值。 如果未指定，则设为 command。
    - stdio Array | string 子进程的 stdio 配置。
    - detached boolean 准备将子进程独立于父进程运行。 具体行为取决于平台。
    - uid number 设置进程的用户标识。
    - gid number 设置进程的组标识。
    - shell boolean | string 如果为 true，则在一个 shell 中运行 command。 在 UNIX 上使用 '/bin/sh'，在 Windows 上使用 process.env.ComSpec。 一个不同的 shell 可以被指定为字符串。 See [Shell Requirements][] and [Default Windows Shell][]. 默认为 false（没有 shell）。
    - windowsVerbatimArguments boolean 决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略，当指令 shell 存在的时该属性将自动被设置为true。默认为: false。
    - windowsHide boolean 隐藏子进程的控制台窗口，常用于 Windows 系统。默认为 false。
- 返回: ChildProcess

```
const { spawn } = require('child_process');
const ls = spawn('ls', ['-lh', '/usr']);

ls.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

ls.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});
```

## child_process.spawnSync(command[, args][, options])--子进程同步执行命令

- 返回: Object
    - pid number 子进程的 pid。
    - output Array stdio 输出返回的结果数组。
    - stdout Buffer | string output[1] 的内容。
    - stderr Buffer | string output[2] 的内容。
    - status number 子进程的退出码。
    - signal string 用于杀死子进程的信号。
    - error Error 如果子进程失败或超时产生的错误对象。
- child_process.spawn 类似，没有 callback，同步操作。

## child_process.fork(modulePath[, args][, options])--子进程异步执行文件

- modulePath string 要在子进程中运行的模块。
- args Array 字符串参数列表。
- options Object
    - cwd string 子进程的当前工作目录。
    - env Object 环境变量键值对。
    - execPath string 用来创建子进程的执行路径。
    - execArgv Array 要传给执行路径的字符串参数列表。默认为 process.execArgv。
    - silent boolean 如果为 true，则子进程中的 stdin、 stdout 和 stderr 会被导流到父进程中，否则它们会继承自父进程，详见 [child_process.spawn()] 的 [stdio] 中的 'pipe' 和 'inherit' 选项。 默认: false。
    - stdio Array | string 详见 [child_process.spawn()] 的 [stdio]。 当提供了该选项，则它会覆盖 silent。 如果使用了数组变量，则该数组必须包含一个值为 'ipc' 的子项，否则会抛出错误。 例如 [0, 1, 2, 'ipc']。
    - windowsVerbatimArguments boolean 决定在Windows系统下是否使用转义参数。 在Linux平台下会自动忽略。默认值: false。
    - uid number 设置该进程的用户标识。
    - gid number 设置该进程的组标识。
- 返回: ChildProcess

```
const { spawn } = require('child_process');
const watch = spawn('./watch.js', ['-all']);

watch.stdout.on('data', (data) => {
  console.log(`stdout: ${data}`);
});

watch.stderr.on('data', (data) => {
  console.log(`stderr: ${data}`);
});

watch.on('close', (code) => {
  console.log(`子进程退出码：${code}`);
});
```