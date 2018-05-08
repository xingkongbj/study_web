# path--路径

## path.dirname(path)--返回上一级目录

```
path.dirname('/foo/bar/baz/asdf/quux');
// 返回: '/foo/bar/baz/asdf'
```

## path.join([...paths])--拼接路径

```
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..');
// 返回: '/foo/bar/baz/asdf'
```

## path.sep--系统目录分隔符

```
// POSIX
'foo/bar/baz'.split(path.sep);
// 返回: ['foo', 'bar', 'baz']

// Windows
'foo\\bar\\baz'.split(path.sep);
// 返回: ['foo', 'bar', 'baz']
```