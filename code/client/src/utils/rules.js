var QQV = (rule, value, callback) => {
    debugger
    if (value === '') {
      callback(new Error('输入QQ号'))
    } else if (/^[1-9][0-9]{4,10}$/.test(value)) {
      callback()
    } else {
      callback(new Error('输入正确的QQ号'))
    }
  }
  
  // 类似金钱,首位不为0,最多2位小数
  export function checkNumPot2(rule, value, callback) {
    const reg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
    if (!value) {
      return callback(new Error('请填写数字'))
    } else if (!reg.test(value)) {
      return callback(new Error('请填写数字,最多2位小数'))
    } else {
      callback()
    }
  }
  
  // 整数
  export function checkInterNum(rule, value, callback) {
    const reg = /^[0-9]*[1-9][0-9]*$/
    if (!value) {
      return callback(new Error('请填写整数'))
    } else if (!reg.test(value)) {
      return callback(new Error('请输入整数'))
    } else {
      callback()
    }
  }
  
  export default {
    QQ: [{ required: true, validator: QQV, trigger: 'blur' }],
    phone: [{ required: true, pattern: /^1[34578]\d{9}$/, message: '目前只支持中国大陆的手机号码', trigger: 'blur' }],
    numPot2: [{ required: true, validator: checkNumPot2, trigger: 'blur' }],
    InterNum: [{ required: true, validator: checkInterNum, trigger: 'blur' }],
    IdNum: [{ required: true, validator: checkIdNum, trigger: 'blur' }]
  }
  
  
  var checkProv = function(val) {
    var pattern = /^[1-9][0-9]/;
    var provs = {
        11: "北京",
        12: "天津",
        13: "河北",
        14: "山西",
        15: "内蒙古",
        21: "辽宁",
        22: "吉林",
        23: "黑龙江 ",
        31: "上海",
        32: "江苏",
        33: "浙江",
        34: "安徽",
        35: "福建",
        36: "江西",
        37: "山东",
        41: "河南",
        42: "湖北 ",
        43: "湖南",
        44: "广东",
        45: "广西",
        46: "海南",
        50: "重庆",
        51: "四川",
        52: "贵州",
        53: "云南",
        54: "西藏 ",
        61: "陕西",
        62: "甘肃",
        63: "青海",
        64: "宁夏",
        65: "新疆",
        71: "台湾",
        81: "香港",
        82: "澳门"
    };
    if (pattern.test(val)) {
        if (provs[val]) {
            return true;
        }
    }
    return false;
  }
  
  var checkDate = function(val) {
    var pattern = /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
        var year = val.toString().substring(0, 4);
        var month = val.toString().substring(4, 6);
        var date = val.toString().substring(6, 8);
        var date2 = new Date(year + "-" + month + "-" + date);
        if (date2 && date2.getMonth() == (parseInt(month) - 1)) {
            return true;
        }
    }
    return false;
  }
  
  // 校验码校验
  var checkCode = function(val) {
    var p = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var code = val.toString().substring(17);
    if (p.test(val)) {
        var sum = 0;
        for (var i = 0; i < 17; i++) {
            sum += val[i] * factor[i];
        }
        if (parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
  }
  
  export function checkID(rule, val, callback) {
    // console.log("reach 136");
    // console.log(val);
    // console.log(typeof(val));
    if (checkCode(val)) {
        // console.log("reach 137");
        // console.log(val);
        // console.log(typeof(val));
        var date = val.toString().substring(6, 14);
        if (checkDate(date)) {
            // console.log("reach 140");

            if (checkProv(val.toString().substring(0, 2))) {
                callback();
            }
        }
    }
    callback(new Error('不通过正则'));
  }