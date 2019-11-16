/*时间格式化 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/* 时间高位补0 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//转为get形式
const formatTimeToGet = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  console.log("**" + hour);

  var fomateDate = year + "-" + formatNumber(month) + "-" + formatNumber(day) + '%20' + formatNumber(hour) + ":" + formatNumber(minute) + ":" + formatNumber(second);

  return fomateDate;
}//2019-07-31 21:20:47

/** 异步操作的最终完成或者失败 */
const wxPromisify = fn => {

  return (obj = {}) => {
    return new Promise((resolve, reject) => {
      obj.success = res => {
        resolve(res)
      }
      obj.fail = res => {
        reject(res)
      }
      fn(obj)//执行函数，obj为传入函数的参数
    })
  }
}


/**无效验证 */
const invalid = value => {
  if (!value) {
    return true;
  } else if (value == '') {
    return true;
  } else {
    return false;
  }
}

/**文件上传 */
const uploadImage = function (pics, result, i, fun) {
  if (pics.length == 0) { fun(result); return; }
  if (pics[i].indexOf("http://tmp") == -1 && pics[i].indexOf("wxfile") == -1) {
    //如果包含https就不用上传了
    result[result.length] = pics[i]; i++;
    if (i < pics.length) { uploadImage(pics, result, i, fun); }
    else { fun(result); }
  } else {
    wx.uploadFile({
      url: getApp().globalData.uploadImageUrl,
      header: { 'content-type': 'application/json' },
      method: "POST",
      filePath: pics[i],
      name: 'file',
      success: function (res) {
        var data = JSON.parse(res.data);
        var imgUrl = data.data;
        result[result.length] = imgUrl;
      },
      complete() {
        i++;
        if (i < pics.length) { uploadImage(pics, result, i, fun); }
        else { fun(result); }
      }
    })
  }
}
// 格式化时间
const parseTime = function (time, cFormat) {
  if (!time) {
    return
  }
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}
module.exports = {
  formatTime: formatTime,
  wxPromisify: wxPromisify,
  invalid: invalid,
  formatTimeToGet: formatTimeToGet,
  uploadImage: uploadImage,
  parseTime: parseTime
}

