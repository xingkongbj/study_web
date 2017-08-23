// 冒泡排序
function bubbleSort(arr) {
    var i = 0,
        j = 0;
    for (i = 1; i < arr.length; i++) {  // i 记录数组结尾已经排好序的个数，从1开始是因为长度-1才为数组下标
        for (j = 0; j <= arr.length - i; j++) {  // j 数组循环的标记，每次循环排序一个项到数组结尾
            var temp = 0;
            if (arr[j] > arr[j + 1]) {  // ">" 从小到大排序 "<" 从大到小排序
                // 位置错误时互换
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    return arr;
}

// 快速排序
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    var pivotIndex = Math.floor(arr.length / 2);  // pivotIndex 数组中间序号
    var pivot = arr.splice(pivotIndex, 1)[0];  // 取出中间项并且从数组中剔除
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);  // 小于的放左边
        } else {
            right.push(arr[i]);  // 大于的放右边
        }
    }
    return quickSort(left).concat([pivot], quickSort(right));  // 小于项 + 中间项 + 大于项 小于项和大于项分别递归，直至长度为1。
}

// 二路归并
function merge(left, right) {
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
function palindrome(str) {
    var re = /[\W_]/g;  // \W匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。
    var lowRegStr = str.toLowerCase().replace(re, '');  // 将字符串变成小写字符,并干掉除字母数字外的字符
    if (lowRegStr.length === 0) return true; // 如果字符串lowRegStr的length长度为0时，字符串即是palindrome
    if (lowRegStr[0] != lowRegStr[lowRegStr.length - 1]) return false;  // 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome
    return palindrome(lowRegStr.slice(1, lowRegStr.length - 1)); // 去除首尾字符，递归判断
}

// 翻转字符串
function reverseString(str) {
    var tmp = '';
    for (var i = str.length - 1; i >= 0; i--) {
        tmp += str[i];
    }
    return tmp;
}

function reverseString(str) {
    str.split('').reverse().join('');
}

// 生成指定长度随机字符串
function randomString(n) {
    var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var tmp = '';
    for (var i = 0; i < n; i++) {
        tmp += str.charAt(Math.round(Math.random() * str.length));
    }
    return tmp;
}

// 统计字符串中次数最多字母
function findMaxDuplicateChar(str) {
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
function unique(arr) {
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
function getMaxProfit(arr) {
    var min = arr[0],
        max = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] < min) min = arr[i];
        if (arr[i] > max) max = arr[i];
    }
    return max - min;
}

// 二分查找
// 非递归实现
function binary_search(arr, key) {
    var low = 0,
        high = arr.length - 1;
    while (low <= high) {
        var mid = parseInt((high + low) / 2);
        if (key == arr[mid]) {
            return mid;
        } else if (key > arr[mid]) {
            low = mid + 1;
        } else if (key < arr[mid]) {
            high = mid - 1;
        }
    }
    return -1;
}

// 递归实现
function binary_search2(arr, low, high, key) {
    if (low > high) return -1;
    var mid = parseInt((low + high) / 2);
    if (key == arr[mid]) {
        return mid;
    } else if (key > arr[mid]) {
        return binary_search2(arr, mid + 1, high, key);
    } else if (key < arr[mid]) {
        return binary_search2(arr, low, mid - 1, key);
    }
}

// 阶乘
// 非递归实现
function factorialize(num) {
    var result = 1;
    if (num < 0) return -1;
    if (num == 0 || num == 1) return 1;
    while (num > 1) {
        result *= num--;
    }
    return result;
}

// 递归实现
function factorialize(num) {
    if (num < 0) return -1;
    if (num == 0 || num == 1) return 1;
    if (num > 1) return num * factorialize(num - 1);
}

// 获取url参数
function getUrlParam(name) {
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
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// 类型判断
function typeString(param) {
    let str = Object.prototype.toString.call(param);
    if (str === '[object Object]') return 'Object';
    if (str === '[object Function]') return 'Function';
    if (str === '[object Boolean]') return 'Boolean';
    if (str === '[object Number]') return 'Number';
    if (str === '[object String]') return 'String';
    if (str === '[object RegExp]') return 'RegExp';
    if (str === '[object Math]') return 'Math';
    if (str === '[object Date]') return 'Date';
    if (str === '[object Array]') return 'Array';
    if (str === '[object Null]') return 'Null';
    if (str === '[object Undefined]') return 'Undefined';
    return str;
}

// Vue 合并对象：对象深入合并，数组通过t判断是否深入合并，true深入合并，false替换合并
function vueMerge(t, obj1, obj2) {
    let typeString = function (param) {
        let str = Object.prototype.toString.call(param);
        if (str === '[object Object]') return 'Object';
        if (str === '[object Function]') return 'Function';
        if (str === '[object Boolean]') return 'Boolean';
        if (str === '[object Number]') return 'Number';
        if (str === '[object String]') return 'String';
        if (str === '[object RegExp]') return 'RegExp';
        if (str === '[object Math]') return 'Math';
        if (str === '[object Date]') return 'Date';
        if (str === '[object Array]') return 'Array';
        if (str === '[object Null]') return 'Null';
        if (str === '[object Undefined]') return 'Undefined';
        return str;
    };
    let mergeNew = function (tStr) {
        switch (tStr) {
            case 'Object':
                return {};
            case 'Array':
                return [];
            case 'Boolean':
                return false;
            case 'Number':
                return 0;
            case 'String':
                return '';
            default:
                throw new Error('vueMerge type not suport');
                break;
        }
    };
    let mergeCom = ['Boolean', 'Number', 'String', 'Null', 'Undefined'];
    let merge = function (t, obj1, obj2) {
        // 两者类型不一致，报错
        if (typeString(obj1) !== typeString(obj2)) {
            throw new Error('vueMerge type not same');
        }
        // 对象类型合并
        let mergeObject = function (t, obj1, obj2) {
            for (let k in obj2) {
                if (typeString(obj2[k]) === 'Undefined') {
                    continue;
                }
                // 一般类型合并
                if (mergeCom.indexOf(typeString(obj2[k])) !== -1) {
                    obj1[k] = obj2[k];
                    continue;
                }
                if (typeString(obj1[k]) === 'Undefined') {
                    // 属性不存在
                    obj1[k] = mergeNew(typeString(obj2[k]));
                }
                merge(t, obj1[k], obj2[k]);
            }
        };
        // 数组类型合并
        let mergeArray = function (t, obj1, obj2) {
            let insert = function (obj, i, val) {
                if (i < obj.length) {
                    obj.splice(i, 1, val);
                } else {
                    obj.push(val);
                }
            };
            if (!t) {
                // 替换合并前，先清空
                obj1.splice(0);
            }
            for (let i = 0; i < obj2.length; i++) {
                if (t && typeString(obj2[i]) === 'Undefined') {
                    // 深入合并过滤,替换合并不过滤
                    continue;
                }
                // 一般类型合并
                if (mergeCom.indexOf(typeString(obj2[i])) !== -1) {
                    insert(obj1, i, obj2[i]);
                    continue;
                }
                if (typeString(obj1[i]) === 'Undefined') {
                    // 属性不存在
                    // 替换合并都是Undefined，必执行
                    insert(obj1, i, mergeNew(typeString(obj2[i])));
                }
                merge(t, obj1[i], obj2[i]);
            }
        };
        let mergeSwitch = function (t, obj1, obj2) {
            switch (typeString(obj1)) {
                case 'Object':
                    mergeObject(t, obj1, obj2);
                    break;
                case 'Array':
                    mergeArray(t, obj1, obj2);
                    break;
                default:
                    throw new Error('vueMerge type not suport');
                    break;
            }
        };
        mergeSwitch(t, obj1, obj2);
    };
    // 一般类型合并
    if (mergeCom.indexOf(typeString(obj1)) !== -1) {
        return obj2;
    }
    merge(t, obj1, obj2);
    return obj1;
}

// Vue 判断两个变量是否内容一致
function vueComp(obj1, obj2) {
    let type = true;
    let typeString = function (param) {
        let str = Object.prototype.toString.call(param);
        if (str === '[object Object]') return 'Object';
        if (str === '[object Function]') return 'Function';
        if (str === '[object Boolean]') return 'Boolean';
        if (str === '[object Number]') return 'Number';
        if (str === '[object String]') return 'String';
        if (str === '[object RegExp]') return 'RegExp';
        if (str === '[object Math]') return 'Math';
        if (str === '[object Date]') return 'Date';
        if (str === '[object Array]') return 'Array';
        if (str === '[object Null]') return 'Null';
        if (str === '[object Undefined]') return 'Undefined';
        return str;
    };
    let compaNew = function (tStr) {
        switch (tStr) {
            case 'Object':
                return {};
            case 'Array':
                return [];
            case 'Boolean':
                return false;
            case 'Number':
                return 0;
            case 'String':
                return '';
            default:
                throw new Error('vueMerge type not suport');
                break;
        }
    };
    let compaCom = ['Boolean', 'Number', 'String', 'Null', 'Undefined'];
    let compa = function (obj1, obj2) {
        // 两者类型不一致
        if (typeString(obj1) !== typeString(obj2)) {
            type = false;
            return;
        }
        // 对象类型比较
        let compaObject = function (obj1, obj2) {
            for (let k in obj1) {
                // 一般类型比较
                if (compaCom.indexOf(typeString(obj1[k])) !== -1) {
                    if (typeString(obj1[k]) === typeString(obj2[k]) && obj1[k] === obj2[k]) {
                        continue;
                    } else {
                        type = false;
                        return;
                    }
                }
                compa(obj1[k], obj2[k]);
            }
            for (let k in obj2) {
                // 一般类型比较
                if (compaCom.indexOf(typeString(obj2[k])) !== -1) {
                    if (typeString(obj1[k]) === typeString(obj2[k]) && obj1[k] === obj2[k]) {
                        continue;
                    } else {
                        type = false;
                        return;
                    }
                }
                compa(obj1[k], obj2[k]);
            }
        };
        // 数组类型合并
        let compaArray = function (obj1, obj2) {
            if (obj1.length !== obj2.length){
                type = false;
                return;
            }
            for (let i = 0; i < obj2.length; i++) {
                // 一般类型比较
                if (compaCom.indexOf(typeString(obj2[i])) !== -1) {
                    if (typeString(obj1[i]) === typeString(obj2[i]) && obj1[i] === obj2[i]) {
                        continue;
                    } else {
                        type = false;
                        return;
                    }
                }
                compa(obj1[i], obj2[i]);
            }
        };
        let compaSwitch = function (obj1, obj2) {
            switch (typeString(obj1)) {
                case 'Object':
                    compaObject(obj1, obj2);
                    break;
                case 'Array':
                    compaArray(obj1, obj2);
                    break;
                default:
                    throw new Error('vueMerge type not suport');
                    break;
            }
        };
        compaSwitch(obj1, obj2);
    };
    // 一般类型比对
    if (compaCom.indexOf(typeString(obj1)) !== -1) {
        if (typeString(obj1) === typeString(obj2) && obj1 === obj2) {
            return true;
        } else {
            return false;
        }
    }
    compa(obj1, obj2);
    return type;
}

// 判断浏览器是否支持某个 css 属性
function supportCss3(style) {
    var prefix = ['webkit', 'Moz', 'ms', 'o'],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function (string) {
            return string.replace(/-(\w)/g, function ($0, $1) {
                return $1.toUpperCase();
            });
        };

    for (i in prefix)
        humpString.push(_toHumb(prefix[i] + '-' + style));

    humpString.push(_toHumb(style));

    for (i in humpString)
        if (humpString[i] in htmlStyle) return true;

    return false;
}
