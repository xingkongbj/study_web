// 冒泡排序
function bubbleSort (arr) {
    var i = 0,
        j = 0;
    for (i = 1; i < arr.length; i++) {  // i 记录数组结尾已经排好序的个数，从1开始是因为长度-1才为数组下标
        for (j = 0; j <= arr.length - i; j++) {  // j 数组循环的标记，每次循环排序一个项到数组结尾
            var temp = 0;
            if (arr[j] > arr[j+1]) {  // ">" 从小到大排序 "<" 从大到小排序
                // 位置错误时互换
                temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
            }
        }
    }
    return arr;
}

// 快速排序
function quickSort (arr) {
    if (arr.length <= 1) { return arr; }
    var pivotIndex = Math.floor(arr.length / 2);  // pivotIndex 数组中间序号
    var pivot = arr.splice(pivotIndex, 1)[0];  // 取出中间项并且从数组中剔除
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);  // 小于的放左边
        } else {
            right.push(arr[i]);  // 大于的放右边
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));  // 小于项 + 中间项 + 大于项 小于项和大于项分别递归，直至长度为1。
}

// 二路归并
function merge (left, right) {
    var result = [],
        il = 0,
        ir = 0;
    while (il < left.length && ir < right.length) {
        if (left[il] < right[ir]) {
            result.push(left[il++]);  // left大，插入left，并且序号+1
        } else {
            result.push(right[ir++]);  // right大，插入right，并且序号+1
        }
    }
    // 把剩余的插入
    while (left[il]) {
        result.push(left[il++]);
    }
    while (right[ir]) {
        result.push(right[ir++]);
    }
    return result;
}

// 字符串操作
// 判断回文字符串
function palindrome (str) {
    var re = /[\W_]/g;  // \W匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。
    var lowRegStr = str.toLowerCase().replace(re,'');  // 将字符串变成小写字符,并干掉除字母数字外的字符
    if (lowRegStr.length === 0) return true; // 如果字符串lowRegStr的length长度为0时，字符串即是palindrome
    if (lowRegStr[0] != lowRegStr[lowRegStr.length-1]) return false;  // 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome
    return palindrome(lowRegStr.slice(1,lowRegStr.length-1)); // 去除首尾字符，递归判断
}

// 翻转字符串
function reverseString (str) {
    var tmp = '';
    for (var i = str.length-1; i >= 0; i--) {
        tmp += str[i];
    }
    return tmp;
}

// 生成指定长度随机字符串
function randomString (n) {
    var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var tmp = '';
    for (var i = 0; i < n; i++) {
        tmp += str.charAt(Math.round(Math.random()*str.length));
    }
    return tmp;
}

// 统计字符串中次数最多字母
function findMaxDuplicateChar (str) {
    if (str.length == 1) return str;
    var charObj = {};
    for (var i = 0; i < str.length; i++) {  // 循环字符串，记录次数
        if (!charObj[str.charAt(i)]) {
            charObj[str.charAt(i)] = 1;
        } else {
            charObj[str.charAt(i)] += 1;
        }
    }
    var maxChar = '',
        maxValue = 1;
    for (var k in charObj) {  // 循环记录对象，比较次数最多项
        if (charObj[k] >= maxValue) {
            maxChar = k;
            maxValue = charObj[k];
        }
    }
    return maxChar + '：' + maxValue;
}

// 数组操作
// 数组去重
function unique (arr) {
    var obj = {};
    var result = [];
    for (var i in arr) {
        if (!obj[arr[i]]) {
            obj[arr[i]] = true;
            result.push(arr[i]);
        }
    }
    return result;
}

// 数组中最大差值
function getMaxProfit (arr) {
    var min = arr[0],
        max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    return max - min;
}

// 二分查找
function binary_search (arr, key) {
    var low = 0,
        high = arr.length - 1;
    while (low <= high) {
        var mid = parseInt((high + low) / 2);
        if (key == arr[mid]) {
            return mid;
        } else if (key > arr[mid]) {
            low = mid + 1;
        } else if (key < arr[mid]) {
            high = mid -1;
        }
    }
    return -1;
}

// 阶乘
function factorialize (num) {
    var result = 1;
    if (num < 0) return -1;
    if (num == 0 || num == 1) return 1;
    while (num>1) {
        result *= num--;
    }
    return result;
}

// 获取url参数
function getUrlParam (name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');  // 构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  // 匹配目标参数
    if (r != null) {
        return r[2];
    } else {
        return null; //返回参数值
    }
}

// 生成guid
function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}