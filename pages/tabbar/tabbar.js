//index.js
var Promisify = require('../../utils/util.js') //具体引入路径根据具体情况
var request = Promisify.wxPromisify(wx.request); //ajax请求
var login = Promisify.wxPromisify(wx.login); //login请求
let app = getApp()

Page({
  data: {
    // hasUserInfo: true,
    currentTab: 0,
    items: [
      {
        "text": "首页",
        "selectedtxt": "#006CFF",
        "txt": "#A9A9A9",
        "iconPath": "../../images/tabbar-icon/index-n@2x.png",
        "selectedIconPath": "../../images/tabbar-icon/index@2x.png"
      },
      {
        "text": "资讯",
        "selectedtxt": "#006CFF",
        "txt": "#A9A9A9",
        "iconPath": "../../images/tabbar-icon/a.png",
        "selectedIconPath": "../../images/tabbar-icon/info-o.png"
      },
      {
        "text": "热门",
        "selectedtxt": "#006CFF",
        "txt": "#A9A9A9",
        "iconPath": "../../images/tabbar-icon/hot@2x.png",
        "selectedIconPath": "../../images/tabbar-icon/hot-old@2x.png"
      },
      {
        "text": "我的",
        "selectedtxt": "#006CFF",
        "txt": "#A9A9A9",
        "iconPath": "../../images/tabbar-icon/me-new@2x.png",
        "selectedIconPath": "../../images/tabbar-icon/me-old@2x.png"
      }
    ]
  },
  swichNav: function (e) {
    // console.log(e.target.dataset.current)
    let that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // /**初始化用户 */
  // initUser: function () {
  //   var that = this;
  //   var user = app.globalData.user;
  //   if (!(user && user.openid)) {
  //     //invalid user  
  //     login().then(app.getOpenid).then(app.getUser).then(app.getSetting)
  //       .then(res => {
  //         if (res && res.openid) { } else {
  //           that.setData({
  //             hasUserInfo: false
  //           })
  //         }
  //       });
  //   }
  // },
  onLoad: function (option) {
    // console.log(option.current)
    var that = this
    that.setData({
      currentTab: option.current
    })
    //初始化用户数据
    // that.initUser()
  }
})
