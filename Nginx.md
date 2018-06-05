# Nginx

## 安装

### 基础包

ububtu

```
apt-get install build-essential
apt-get install libtool
```

centos

```
yum -y install gcc automake autoconf libtool make
yum install gcc gcc-c++
```

进入安装目录

```
cd /usr/local/src
```

安装 PCRE 支持正则表达 使 Nginx 支持 Rewrite 功能

```
wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.42.tar.gz
tar -zxvf pcre-8.42.tar.gz
cd pcre-8.42
./configure
make
make install 
```

安装 zlib 支持数据压缩

```
wget http://zlib.net/zlib-1.2.11.tar.gz
tar -zxvf zlib-1.2.11.tar.gz
cd zlib-1.2.11
./configure
make
make install
```

安装 openssl 支持 https

```
wget https://www.openssl.org/source/openssl-1.1.1-pre7.tar.gz
tar -zxvf openssl-1.1.1-pre7.tar.gz
cd openssl-1.1.1-pre7
./configure
make
make install
```

### Nginx

```
wget http://nginx.org/download/nginx-1.14.0.tar.gz
tar -zxvf nginx-1.14.0.tar.gz
cd nginx-1.14.0
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module
make
make install
```

## 配置

配置文件地址

```
/usr/local/nginx/conf/nginx.conf
```

## 使用

命令

```
/usr/local/nginx/sbin/nginx                      # 启动 Nginx
/usr/local/nginx/sbin/nginx -t                   # 检查 Nginx 配置文件正确性
/usr/local/nginx/sbin/nginx -s reload            # 重新载入配置文件
/usr/local/nginx/sbin/nginx -s reopen            # 重启 Nginx
/usr/local/nginx/sbin/nginx -s stop              # 停止 Nginx
```

进程关闭

```
# 查看进程号
ps -ef|grep nginx

# 正常退出
kill -QUIT 进程号

# 快速停止
kill -TERM 进程号
kill -INT 进程号

# 强制退出
kill -KILL nginx
```

## 生成 cer 证书支持 https

### 生成 cer 证书

```
# 进入存放证书的目录
/usr/local/nginx/conf/ssl

# 创建服务器证书密钥文件 server.key 私钥
openssl genrsa -des3 -out server.key 1024
# 输入密码，确认密码，后面会使用

# 创建签名请求的证书（CSR）
openssl req -new -key server.key -out server.csr
# 输出内容为：
# Enter pass phrase for root.key: ← 输入前面创建的密码 
# Country Name (2 letter code) [AU]:CN ← 国家代号，中国输入CN
# State or Province Name (full name) [Some-State]:BeiJing ← 省的全名，拼音
# Locality Name (eg, city) []:BeiJing ← 市的全名，拼音
# Organization Name (eg, company) [Internet Widgits Pty Ltd]:MyCompany Corp. ← 公司英文名
# Organizational Unit Name (eg, section) []: ← 可以不输入
# Common Name (eg, YOUR name) []: ← 此时不输入
# Email Address []:admin@mycompany.com ← 电子邮箱，可随意填
# Please enter the following ‘extra’ attributes
# to be sent with your certificate request
# A challenge password []: ← 可以不输入
# An optional company name []: ← 可以不输入

# 备份服务器密钥文件
cp server.key server.key.org

# 去除文件口令，生成公钥
openssl rsa -in server.key.org -out server.key
# Enter pass phrase for server.key.org: ← 输入前面创建的密码

# 生成证书文件 server.crt
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

### 配置 https

```
# /usr/local/nginx/conf/nginx.conf

#
# HTTPS server configuration
#
server {
    listen       443 ssl;  # ssl 端口
    server_name  www.xingkongbj.com xingkongbj.com;  # 域名

    ssl                  on;  # 开启 ssl
    ssl_certificate      ssl/server.crt;
    ssl_certificate_key  ssl/server.key;

    ssl_session_timeout  5m;

#    ssl_protocols  SSLv2 SSLv3 TLSv1;
#    ssl_ciphers  ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
#    ssl_prefer_server_ciphers   on;

    location / {
     proxy_redirect off;  # 禁止跳转
     proxy_set_header Host $host;
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
     proxy_pass http://98.142.138.177/;
    }
}
```

```
# nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module in /usr/local/nginx/conf/nginx.conf
# 原因是nginx缺少http_ssl_module模块，编译安装时带上--with-http_ssl_module配置就可以了

# 切换到nginx源码包
cd cd /usr/local/src/nginx-1.14.0/

# 查看 ngixn 原有的模块
/usr/local/nginx/sbin/nginx -V

# 重新配置
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module

# 重新编译，不需要 make  install 安装。否则会覆盖
make

# 备份原有已经安装好的 nginx
cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
cp /usr/local/nginx/conf/nginx.conf /usr/local/nginx.conf

# 将刚刚编译好的 nginx 覆盖掉原来的 nginx(ngixn必须停止)
cp ./objs/nginx /usr/local/nginx/sbin/ 
# 这时，会提示是否覆盖，请输入yes，直接回车默认不覆盖

# 启动 nginx，查看 nginx 模块，发现已经添加
/usr/local/nginx/sbin/nginx -V
/usr/local/nginx/sbin/nginx -t
/usr/local/nginx/sbin/nginx
```