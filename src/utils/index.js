/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

export const getStore = name => {
  if (!name) return;
  return JSON.parse(window.localStorage.getItem(name));
}

export const removeStore = name => {
  if (!name) return;
  window.localStorage.removeItem(name);
}

export const setCookie = function (name, value) {
  var expires = 1 * 24 * 60 * 60 * 1000;
  var date = new Date(+new Date() + expires);
  document.cookie = name + "=" + value + ";path=/;expires=" + date.toUTCString();
};

export const getCookie = function (name) {
  var arr;
  var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  // eslint-disable-next-line no-cond-assign
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
};

export const delCookie = function (name) {
  setCookie(name, ' ', -1);
};

//数组去重
export const repeatArr = function(arr) {
  let json = {},res=[];
  for(var i = 0; i < arr.length; i++){
    if(!json[arr[i]]){
      res.push(arr[i]);
      json[arr[i]] = 1;
    }
  }
  return res;
}

// 时间格式化
export const formatDate = (date, fmt = 'YYYY-MM-DD HH:mm:ss') => {
  if (!date) {
    return ''
  }
  if (typeof date === 'string') {
    date = new Date(date.replace(/-/g, '/'))
  }
  if (typeof date === 'number') {
    date = new Date(date)
  }
  var o = {
    'M+': date.getMonth() + 1,
    'D+': date.getDate(),
    'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    'S': date.getMilliseconds()
  }
  var week = {
    '0': '\u65e5',
    '1': '\u4e00',
    '2': '\u4e8c',
    '3': '\u4e09',
    '4': '\u56db',
    '5': '\u4e94',
    '6': '\u516d'
  }
  if (/(Y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') + week[date.getDay() + ''])
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
};

// 金钱格式化
export const formatMoney = (val) => {    //金额格式化
  val = val.toString().replace(/[^\d.]/g, ""); //清除"数字"和"."以外的字符
  let val1 = parseFloat(val).toFixed(2);  //保留两位小数
  let val2 = val1.toString();
  let arr = val2.split('.');
  let arr1 = arr[0].split('');
  let str3 = "";
  let arr2 = [];
  for (let i = arr1.length - 1, j = 0; i >= 0; i-- , j++) {
    str3 = '' + arr1[i] + str3;
    if (j % 3 == 2) {
      arr2.unshift(str3)
      str3 = "";
    } else if (i == 0) {
      arr2.unshift(str3)
    }
  }
  let str4 = arr2.join(',');
  let str5 = str4 + '.' + arr[1];
  return str5
}

export const addZero = (n) => {
  return n>=10?n:`0${n}` 
}

export const clones = function(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  // Handle Array
  if (obj instanceof Array) {
    let copy = [];
    for (let i = 0, len = obj.length; i < len; ++i) {
      copy[i] = clones(obj[i]);
    }
    return copy;
  }

  // Handle Object
  if (obj instanceof Object) {
    let copy = {};
    for (let attr in obj) {
      if (obj.hasOwnProperty(attr)) copy[attr] = clones(obj[attr]);
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

// 判断参数是否是其中之一
export const oneOf = function(value, validList) {
  //console.log(validList)
  for (let i = 0; i < validList.length; i++) {
    if (value === validList[i]) {
      return true;
    }
  }
  return false;
}

// 删除数组中的某一项
export const deleteOneofArray = function(value, array) {
  array.forEach((o, i, array) => {
    if (o === value) {
      array.splice(i, 1)
    }
  })
}

// 对比两个数组，返回差异项
export function deArray(a,b) {
  let tar;
  a.forEach(function (o) {
    if(b.indexOf(o)===-1){
      tar=o;
      return
    }
  });
  return tar;
}

//加减乘除四个方法，能确保浮点数运算不丢失精度
export const isInteger = function(obj) {
  return Math.floor(obj) === obj
}
export const toInteger = function(floatNum) {
  var ret = {times: 1, num: 0}
  var isNegative = floatNum < 0
  if (isInteger(floatNum)) {
    ret.num = floatNum
    return ret
  }
  var strfi  = floatNum + ''
  var dotPos = strfi.indexOf('.')
  var len    = strfi.substr(dotPos+1).length
  var times  = Math.pow(10, len)
  var intNum = parseInt(Math.abs(floatNum) * times + 0.5, 10)
  ret.times  = times
  if (isNegative) {
    intNum = -intNum
  }
  ret.num = intNum
  return ret
}
export const operation = function(a, b, digits=2, op) {
  var o1 = toInteger(a)
  var o2 = toInteger(b)
  var n1 = o1.num
  var n2 = o2.num
  var t1 = o1.times
  var t2 = o2.times
  var max = t1 > t2 ? t1 : t2
  var result = null
  switch (op) {
    case 'add':
      if (t1 === t2) { // 两个小数位数相同
        result = n1 + n2
      } else if (t1 > t2) { // o1 小数位 大于 o2
        result = n1 + n2 * (t1 / t2)
      } else { // o1 小数位 小于 o2
        result = n1 * (t2 / t1) + n2
      }
      return (result / max).toFixed(digits)
    case 'subtract':
      if (t1 === t2) {
        result = n1 - n2
      } else if (t1 > t2) {
        result = n1 - n2 * (t1 / t2)
      } else {
        result = n1 * (t2 / t1) - n2
      }
      return (result / max).toFixed(digits)
    case 'multiply':
      result = (n1 * n2) / (t1 * t2)
      return result.toFixed(digits)
    case 'divide':
      result = (n1 / n2) * (t2 / t1)
      return result.toFixed(digits)
  }
}

// 加减乘除的四个接口
export const add = function(a, b, digits) {
  return operation(a, b, digits, 'add')
}
export const subtract = function(a, b, digits) {
  return operation(a, b, digits, 'subtract')
}
export const multiply = function(a, b, digits) {
  return operation(a, b, digits, 'multiply')
}
export const divide = function(a, b, digits) {
  return operation(a, b, digits, 'divide')
}
export const accMul = function(arg1,arg2)
{
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  // eslint-disable-next-line no-empty
  try{m+=s1.split(".")[1].length}catch(e){ }
  // eslint-disable-next-line no-empty
  try{m+=s2.split(".")[1].length}catch(e){}
  return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

/* 
  路由跳转
  @param {url} string
  @param {$router} router实例
*/
export const go = function(url, $router) {
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
  if (useRouter) {
    if (typeof url === 'object' && url.replace === true) {
      $router.replace(url)
    } else {
      url === 'BACK' ? $router.go(-1) : $router.push(url)
    }
  } else {
    window.location.href = url
  }
}
// 返回一个字符串的长度，汉字算2个字符长度
export const strLength = function(str) {
  let a = 0
  for (let i = 0; i < str.length; i++) {
    let count = str.charCodeAt(i) > 255 ? 2 : 1
    a += count
  }
  return a
}

export const IDcode = function(card) {
  //身份证地区
  var areaID = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外"
  };
  //性别
  var sexMap = { 0: "女", 1: "男" };
  /*********************************************
      * 检验身份证格式是否正确
      ********************************************/
  var checkIdCard = function (IDCard) {
    var iSum = 0;
    if (!/^\d{17}(\d|x)$/i.test(IDCard))
      return {
        status: false,
        message: '你输入的身份证长度或格式错误!'
      };
    IDCard = IDCard.replace(/x$/i, "a");
    if (areaID[parseInt(IDCard.substr(0, 2))] == null)
      return {
        status: false,
        message: '你的身份证地区非法!'
      };
    var sBirthday = IDCard.substr(6, 4) + "-" + Number(IDCard.substr(10, 2)) + "-" + Number(IDCard.substr(12, 2));
    var d = new Date(sBirthday.replace(/-/g, "/"));
    if (sBirthday != (d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()))
      return {
        status: false,
        message: '身份证上的出生日期非法!'
      };
    for (var i = 17; i >= 0; i--)
      iSum += (Math.pow(2, i) % 11) * parseInt(IDCard.charAt(17 - i), 11);
    if (iSum % 11 != 1)
      return {
        status: false,
        message: '你输入的身份证号非法!'
      };
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return {
      status: true,
      message: '校验成功！'
    };
  };
  /*********************************************
      * 根据身份证号获取性别
      *********************************************/
  var getSexByIdCard = function (idCard) {
    if (idCard.length == 15) {
      return sexMap[idCard.substring(14, 15) % 2];
    } else if (idCard.length == 18) {
      return sexMap[idCard.substring(14, 17) % 2];
    } else {
      //不是15或者18,null
      return '';
    }
  };
  /*********************************************
      * 根据身份证号获取生日
      *********************************************/
  var getBirthdayByIdCard = function (idCard) {
    var birthStr;
    if (15 == idCard.length) {
      birthStr = idCard.charAt(6) + idCard.charAt(7);
      if (parseInt(birthStr) < 10) {
        birthStr = '20' + birthStr;
      } else {
        birthStr = '19' + birthStr;
      }
      birthStr = birthStr + '-' + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11);
    } else if (18 == idCard.length) {
      birthStr = idCard.charAt(6) + idCard.charAt(7) + idCard.charAt(8) + idCard.charAt(9) + '-' + idCard.charAt(10) + idCard.charAt(11) + '-' + idCard.charAt(12) + idCard.charAt(13);
    }
    return birthStr;
  };
  /*********************************************
      * 根据身份证号获取出生地
      *********************************************/
  var getAreaByIdCard = function (idCard) {
    return areaID[parseInt(idCard.substr(0, 2))];
  };
  /*********************************************
      * 根据身份证号获取年龄
      *********************************************/
  var getAgeByIdCard = function (idCard) {
    var birthStr = getBirthdayByIdCard(idCard);
    var r = birthStr.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
    if (r == null) return '';
    var d = new Date(r[1], r[3] - 1, r[4]);
    if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
      var Y = new Date().getFullYear();
      return (Y - r[1]);
    } else {
      return '';
    }
  };
  let $arr = new Array();
  $arr['Status'] = checkIdCard(card).status;
  $arr['msg'] = checkIdCard(card).message;
  if (checkIdCard(card).status) {
    $arr['Sex'] = getSexByIdCard(card);
    $arr['Date'] = getBirthdayByIdCard(card);
    $arr['Add'] = getAreaByIdCard(card);
    $arr['Age'] = getAgeByIdCard(card);
  }
  return $arr;
}
