# os--操作系统

## os.cpus()--返回 cpu 信息

- 返回: Array
- model string
    - speed number (兆赫兹为单位)
    - times Object
    - user number CPU花费在用户模式下的毫秒时间数.
    - nice number CPU花费在良好模式下的毫秒时间数.
    - sys number CPU花费在系统模式下的毫秒时间数.
    - idle number CPU花费在空闲模式下的毫秒时间数.
    - irq number CPU花费在中断请求模式下的毫秒时间数.
