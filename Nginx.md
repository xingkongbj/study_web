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

安装 openssl 支持远程登录

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
./configure
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