//app.js
var Promisify = require('utils/util.js') //具体引入路径根据具体情况
var getSystemInfo = Promisify.wxPromisify(wx.getSystemInfo); //获取系统信息
var getUserInfo = Promisify.wxPromisify(wx.getUserInfo); //获取用户信息
var request = Promisify.wxPromisify(wx.request); //ajax请求
var login = Promisify.wxPromisify(wx.login); //login请求
var getSetting = Promisify.wxPromisify(wx.getSetting); //getSetting请求
App({
  globalData: {
    openid: '',
    session_key: '',
    userInfo: null,
    // uploadImageUrl: 'http://cloud.weiwochina.com/zuul/emba/', //文件上传地址
    uploadImageUrl: 'https://cloud.weiwochina.com/emba/upload/picUpload',
    baseUrl: 'https://cloud.weiwochina.com/emba/',
    userId: '',
    user: null, //缓存用户信息
    productName: "EMBA", //项目名
    phoneTime: null
  },
  onLaunch: function() {
  },
  /** 获取openid   */
  getOpenid: function (params) {
    console.log(params)
    var that = this;
    if (that.globalData.openid) {
      // console.log(111)
      return new Promise((resolve, reject) => {
        resolve({
          openid: that.globalData.openid
        })
      });
    } else {
      return new Promise((resolve, reject) => {
        request({
          url: that.globalData.baseUrl + 'samll/getOpenId/' + params.code,
          method: 'POST',
        }).then(res => {
          that.globalData.openid = res.data.data;
          // console.log(that.globalData.openid)
          // that.globalData.session_key = res.data.data.session_key;
          resolve({
            openid: res.data.data
          })
        })
      });
    }
  },

  /**获取用户从后台 */
  getUser: function (params) {
    console.log(params)
    var that = this;
    var user = that.globalData.user;
    if (user && user.openid) {
      return new Promise((resolve, reject) => {
        resolve({
          user: that.globalData.user
        })
      });
    } else {
      return new Promise((resolve, reject) => {
        console.log(params.openid)
        request({
          url: that.globalData.baseUrl + 'user/' + params.openid,
          method: 'GET'
        }).then(res => {
          console.log(res.data)
          that.globalData.user = res.data.data;
          resolve({
            user: res.data.data
          })
        })
      });
    }
  },

  /** 后台查用户后调用一次 没有用户的话就看之前拿过授权没 有授权就直接获取用户info 未有的话就开界面 */
  getSetting: function (user) {
    var that = this;
    user = user.user;

    return new Promise((resolve, reject) => {
      if (user && user.openid) {
        console.log("getSetting")
        // return user;
        resolve(user)
      } else {
        getSetting().then(res => {
          if (res.authSetting['scope.userInfo']) {
            getUserInfo().then(res => {
              console.log("***" + res);
              console.log(res.userInfo);
              that.globalData.userInfo = res.userInfo
              resolve(that.initUser(res.userInfo))
            })
          }
        });
      }
    })
    
  },

  /**初始化用户 */
  initUser: function (userInfo) {
    console.log("初始化用户")
    var that = this;

    //用户不存在就要新增
    if (!that.globalData.user) {

      request({
        url: that.globalData.baseUrl + 'user',
        data: {
          nickName: userInfo.nickName,
          headImg: userInfo.avatarUrl,
          openid: that.globalData.openid,
          name: '',
          sex:'',
          birthday: 0,
          phone: '',
          industry: '',
          company: '',
          position: '',
          address: ''
        },
        method: 'POST'
      }).then(res=> {
        if (res.data.code == '200') {
          var user = res.data.data;
          that.globalData.user = user;
          return user;
        }
      })

    }
  },

  /**修改用户 地址或手机号 */
  updateUser: function (user) {
    var that = this;
    wx.request({
      url: that.globalData.baseUrl + 'user',
      data: user,
      method: "PUT",
      success: function (result) {
        if (result.data.code === '200') {

        }
      }
    })
  },
})