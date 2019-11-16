// pages/me/me.js
var Promisify = require('../../../utils/util.js') //具体引入路径根据具体情况
var getSystemInfo = Promisify.wxPromisify(wx.getSystemInfo); //获取系统信息
var getUserInfo = Promisify.wxPromisify(wx.getUserInfo); //获取用户信息
var request = Promisify.wxPromisify(wx.request); //ajax请求
var login = Promisify.wxPromisify(wx.login); //login请求
var getSetting = Promisify.wxPromisify(wx.getSetting); //getSetting请求

//获取应用实例
const app = getApp()
const baseUrl = app.globalData.baseUrl
Component({
  /* 开启全局样式设置 */
  options: {
    addGlobalClass: true,
  },

  /* 组件的属性列表 */
  properties: {
    name: {
      type: String,
      value: 'Index'
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    User: {},
    phone: '',
    loginShow: '',
    hasUserInfo: ''
  },
  // 生命周期
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function() {
      var that = this;
      var user = app.globalData.user;
      if (!(user && user.openid)) {
        //invalid user  
        login().then(app.getOpenid).then(app.getUser)
          .then(res => {
            console.log(res)
            if (res.user) {
              that.getUser()
            } else {
              // app.getOpenid().then(app.getUser).then(that.getUser())

              console.log('button显示')
              that.setData({
                hasUserInfo: false,
                loginShow: true
              })
            }
          });
      } else if (!app.globalData.openid) {

        console.log('button显示')
        this.setData({
          loginShow: true
        })
      }
    },
    ready: function() {},
    detached: function() {},
  },
  /* 组件的方法列表 */
  methods: {
    // 获取用户信息
    getUser: function() {
      var that = this;
      var openid = app.globalData.openid;
      console.log(openid)
      if (!openid) {
        //测试时需要 
        request({
          url: app.globalData.baseUrl + 'user/' + openid,
          method: 'GET'
        }).then(res => {
          console.log(res.data.data)
          console.log("openid" + openid)
          app.globalData.user = res.data.data;
          app.globalData.openid = res.data.data.openid;
        })
      } else {
        console.log("有用户了")
        var user = app.globalData.user;
        // console.log(user)
        console.log('button隐藏')
        that.setData({
          User: user,
          loginShow: false
        })
        // console.log(app.globalData.user)
      }
    },
    // 获取用户信息
    getUser1: function() {

      var that = this;
      var openid = app.globalData.openid;
      console.log(openid)
      if (!openid) {
        //测试时需要 
        request({
          url: app.globalData.baseUrl + 'user/' + openid,
          method: 'GET'
        }).then(res => {
          console.log(res.data.data)
          console.log("openid" + openid)
          app.globalData.user = res.data.data;
          app.globalData.openid = res.data.data.openid;
        })
      } else {
        console.log("有用户了")
        var user = app.globalData.user;
        console.log(user)
        that.setData({
          User: user,
          loginShow: false
        })
        console.log("00000000000000" + app.globalData.user)
        wx.redirectTo({
          url: '../../../../tabbar/tabbar'
        })
      }
    },
    // 购买课程
    payClass: function() {
      if (!app.globalData.user) {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
      } else {
      wx.navigateTo({
        url: '../component/me/payClass/payClass'
      })
      }
    },
    myInfo: function() {
      if (!app.globalData.user) {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
      } else {
      wx.navigateTo({
        url: '../component/me/myInfo/myInfo',
      })
      }
    },
    tel: function() {
      wx.request({
        url: baseUrl + 'material?type=1',
        success: (res) => {
          console.log(res.data.data[0].text)
          this.setData({
            phone: res.data.data[0].text
          })
          wx.makePhoneCall({
            phoneNumber: this.data.phone,
          })
        }
      })
    },
    classRecord: function() {
      console.log(app.globalData.user)
      if(!app.globalData.user) {
        wx.showToast({
          title: '请先登录',
          icon: 'none'
        })
      }else {
        wx.navigateTo({
          url: '../component/me/classRecord/classRecord',
        })
      } 
    },
    // 登录
    login: function() {
      var that = this;
      var user = app.globalData.user;
      console.log("me初始化用户")
      wx.showModal({
        title: '微信授权登录',
        content: '是否确认登录',
        success(res) {
          if (res.confirm) {
            if (!(user && user.openid)) {
              //invalid user  
              login().then(app.getOpenid).then(app.getUser).then(app.getSetting)
                .then(res => {
                  app.getOpenid().then(app.getUser).then(that.getUser1())
                  that.setData({
                    hasUserInfo: false,
                    loginShow: false
                  })
                });
            }
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },
    // 授权登录
    getMyUserInfo: function(res) {
      var that = this;
      var user = app.globalData.user;
      console.log("me初始化用户")
      if (!(user && user.openid)) {
        //invalid user  
        login().then(res => {
          app.getOpenid(res).then(res => {
            app.getUser(res).then(res => {
              app.getSetting(res).then(res => {
                that.getUser1()
                console.log('button隐藏')
                that.setData({
                  hasUserInfo: false,
                  loginShow: false
                })
              });
            })
          })
        })
      }
    }
  },

  // 组件所在页面的生命周期
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.setData({
        User: app.globalData.user
      })
      // console.log(this.data.User)
      // console.log('show')
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})