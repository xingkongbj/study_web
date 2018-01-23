# Unicode和UTF编码

> 编码转换 http://www.qqxiuzi.cn/bianma/Unicode-UTF.php
> 
> 介绍 https://www.jianshu.com/p/2d4ad873b39f
> 
> 介绍 https://www.jianshu.com/p/07b578adfbf8

目录

- [编码介绍](#编码介绍)
- [字节序](#字节序)
- [UTF-8 编码](#utf-8-编码)
- [UTF-16 编码](#utf-16-编码)
- [UTF-32 编码](#utf-32-编码)

## 编码介绍

- **Unicode** 是容纳世界所有文字符号的国标标准编码，使用四个字节为每个字符编码。
- **UTF** 是英文 Unicode Transformation Format 的缩写，意为把 Unicode 字符转换为某种格式。UTF 系列编码方案（UTF-8、UTF-16、UTF-32）均是由 Unicode 编码方案衍变而来，以适应不同的数据存储或传递，它们都可以完全表示 Unicode 标准中的所有字符。目前，这些衍变方案中 UTF-8 被广泛使用，而 UTF-16 和 UTF-32 则很少被使用。
- **UTF-8** 使用一至四个字节为每个字符编码，其中大部分汉字采用三个字节编码，少量不常用汉字采用四个字节编码。因为 UTF-8 是可变长度的编码方式，相对于 Unicode 编码可以减少存储占用的空间，所以被广泛使用。
- **UTF-16** 使用二或四个字节为每个字符编码，其中大部分汉字采用两个字节编码，少量不常用汉字采用四个字节编码。
- **UTF-32** 使用四个字节为每个字符编码，使得 UTF-32 占用空间通常会是其它编码的二到四倍。

## 字节序

Unicode 标准建议用 BOM（Byte Order Mark）来区分字节序，即在传输字节流前，先传输被作为 BOM 的字符"零宽无中断空格"。文档中第一个字符传入 BOM 标志，表示文档的字节序。BE 先存放高位字节，再存放低位字节。LE 先存放低位字节，再存放高位字节。单元字节长度跟编码方式有关，UTF-16 为 FF FF 二字节，UTF-32 为 FF FF FF FF 四字节。

UTF-8 不需要 BOM 来表明字节顺序，但可以用 BOM 来表明编码方式，传输 EF BB BF。

UTF-16BE 以 FE FF 代表，UTF-16LE 以 FF FE 代表。

UTF-32BE 以 00 00 FE FF 代表，UTF-32LE 以 FF FE 00 00 代表。


Unicode 编码 | UTF-16LE | UTF-16BE | UTF32-LE | UTF32-BE  
--- | --- | ---| --- | ---
0x006C49 | 49 6C | 6C 49 | 49 6C 00 00 | 00 00 6C 49  
0x020C30 | **43 D8** *30 DC* | **D8 43** *DC 30* | 30 0C 02 00 | 00 02 0C 30

## UTF-8 编码

把 Unicode 编码的二进制数，一次填入对应的 x 中，从右侧匹配，无值默认匹配 0。

Unicode 编码 (16 进制 ) | UTF-8 字节流 ( 二进制 )
:--- | :---
000000 - 00007F | 0xxxxxxx
000080 - 0007FF | 110xxxxx 10xxxxxx
000800 - 00FFFF | 1110xxxx 10xxxxxx 10xxxxxx
010000 - 10FFFF | 11110xxx 10xxxxxx 10xxxxxx 10xxxxxx

## UTF-16 编码

Unicode 编码 <= FF FF ，UTF-16 编码 与 Unicode 编码保持一致。

否则，把 Unicode 编码 - 0x10000（十六进制）转换成二进制形式，yyyy yyyy yyxx xxxx xxxx，UTF-16 字节流 ( 二进制 ) 为 110110yyyyyyyyyy 110111xxxxxxxxxx。

## UTF-32 编码

UTF-32 编码与 Unicode 编码保持一致。