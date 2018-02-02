## 格式

rmdir [选项] 目录

## 参数

- p 递归删除目录dirname，当子目录删除后其父目录为空时，也一同被删除。如果整个路径被删除或者由于某种原因保留部分路径，则系统在标准输出上显示相应的信息。 

-v, --verbose  显示指令执行过程 

## 示例

### 例一：rmdir 不能删除非空目录

#### 命令：rmdir doc

#### 输出：

[root@localhost scf]# tree

.

|-- bin

|-- doc

|   |-- info

|   `-- product

|-- lib

|-- logs

|   |-- info

|   `-- product

`-- service

    `-- deploy

        |-- info

        `-- product

 

12 directories, 0 files

[root@localhost scf]# rmdir doc

rmdir: doc: 目录非空

[root@localhost scf]# rmdir doc/info

[root@localhost scf]# rmdir doc/product

[root@localhost scf]# tree

.

|-- bin

|-- doc

|-- lib

|-- logs

|   |-- info

|   `-- product

`-- service

    `-- deploy

        |-- info

        `-- product

 

10 directories, 0 files

说明：

rmdir 目录名 命令不能直接删除非空目录

### 例二：rmdir -p 当子目录被删除后使它也成为空目录的话，则顺便一并删除 

#### 命令：rmdir -p logs

#### 输出：

[root@localhost scf]# tree

.

|-- bin

|-- doc

|-- lib

|-- logs

|   `-- product

`-- service

    `-- deploy

        |-- info

        `-- product

 

10 directories, 0 files

[root@localhost scf]# rmdir -p logs

rmdir: logs: 目录非空

[root@localhost scf]# tree

.

|-- bin

|-- doc

|-- lib

|-- logs

|   `-- product

`-- service

    `-- deploy

        |-- info

        `-- product

 

9 directories, 0 files

[root@localhost scf]# rmdir -p logs/product

[root@localhost scf]# tree

.

|-- bin

|-- doc

|-- lib

`-- service

`-- deploy

        |-- info

        `-- product

 

7 directories, 0 files
