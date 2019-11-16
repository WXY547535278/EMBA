//index.js
//获取应用实例
var Promisify = require('../../../utils/util.js') //具体引入路径根据具体情况
var request = Promisify.wxPromisify(wx.request); //ajax请求
var login = Promisify.wxPromisify(wx.login); //login请求
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
      value: 'Car'
    }
  },
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
      var that = this;
      var user = app.globalData.user;
      if (!(user&&user.openid)) {
        //invalid user  
        login().then(app.getOpenid).then(app.getUser)
          .then(res => {
            console.log(res)
            if (res.user) {
              that.getClass()
            }
            if (res.user == undefined) {
              that.getClass1()
            }
          });
      }else if(user) {
        that.getClass()
      } 
      //获取轮播图
      wx.request({
        url: baseUrl + 'flashView',
        data: {
          // token: '121321',
          // eid: 1
        },
        success: (res) => {
          var flashType1 = []
          //判断轮播图类型
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].type == '1') {
              flashType1.push(res.data.data[i])
            }
          }
          console.log("获取到的首页轮播图", flashType1)
          this.setData({
            showFlash: flashType1
          })
        }
      })
      //获取动态资讯
      wx.request({
        url: baseUrl + 'information',
        data: {
          // token: '121321',
          // eid: 1
        },
        success: (res) => {
          // console.log(1)
          // console.log(res)
          var showInfo1 = []
          for (var i = 0; i < 4; i++) {
            showInfo1.push(res.data.data[i])
          }
          this.setData({
            showInfo: showInfo1
          })
        }
      })
      //获取课程信息,为了获取到openid，所以需要延迟执行
      // setTimeout(() => {
      //   wx.request({
      //     url: baseUrl + 'curriculum?openid=' + app.globalData.openid,
      //     data: {},
      //     success: (res) => {
      //       // console.log(1)
      //       console.log('获取到的课程信息', res.data)
      //       var showCurriculum1 = []
      //       for (var i = 0; i < 4; i++) {
      //         showCurriculum1.push(res.data.data[i])
      //       }
      //       this.setData({
      //         showCurriculum: showCurriculum1
      //       })
      //     }
      //   })
      // },800)
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
    ready: function() {
    }
  },
  data: {
    // hasUserInfo: true,
    interval: 3000,
    duration: 1500,
    showFlash: [], //轮播图
    showInfo: [], //动态资讯
    showCurriculum: [], //课程
    phone: '',
    img: {
      vedioImg: [
        "../../../images/video.png",
        "../../../images/video.png",
        "../../../images/video.png",
        "../../../images/video.png"
      ]
    }
  },
  /* 组件的方法列表 */
  methods: {
    // 通过id获取课程视频
    getClass: function () {
      wx.request({
        url: baseUrl + 'curriculum?openid=' + app.globalData.openid,
        data: {},
        success: (res) => {
          // console.log(1)
          console.log('获取到的课程信息', res.data)
          var showCurriculum1 = []
          for (var i = 0; i < 4; i++) {
            showCurriculum1.push(res.data.data[i])
          }
          this.setData({
            showCurriculum: showCurriculum1
          })
        }
      })
    },
    // 获取课程视频
    getClass1: function () {
      wx.request({
        url: baseUrl + 'curriculum',
        data: {},
        success: (res) => {
          // console.log(1)
          console.log('获取到的课程信息', res.data)
          var showCurriculum1 = []
          for (var i = 0; i < 4; i++) {
            showCurriculum1.push(res.data.data[i])
          }
          this.setData({
            showCurriculum: showCurriculum1
          })
        }
      })
    },
    // 跳转到相应文章
    toArticle:function(e) {
      console.log(e.currentTarget.dataset.link)
      wx.navigateTo({
        url: e.currentTarget.dataset.link,
      })
      // ../component/index/dynamicInfo/dynamicInfo?id=121243075700001
      // 面试../component/index/information/subject/subject?id=121111282100001'
      // 笔试../component/index/information1/subject/subject?id=121106472600001
    },
    allTutorClass: function() {
      wx.navigateTo({
        url: '../component/index/tutorClass/tutorClass'
      })
    },
    information: function() {
      wx.navigateTo({
        url: '../component/index/entrance/entrance',
      })
    },
    dynamicInfo: function(e) {
      wx.navigateTo({
        url: '../component/index/dynamicInfo/dynamicInfo?id=' + e.currentTarget.dataset.id,
      })
    },
    vedioDetail: function(e) {
      // console.log(e.currentTarget.dataset.free)
      // console.log(e.currentTarget.dataset.id)
      if (e.currentTarget.dataset.free == 'a' || e.currentTarget.dataset.free == 'b'||
        e.currentTarget.dataset.free == '1') {
        wx.navigateTo({
          url: '../component/index/tutorClass/classDetail/classDetail?id=' + e.currentTarget.dataset.id,
        })
      } else {
        wx.navigateTo({
          url: '../component/index/tutorClass/Nonpayment/Nonpayment'
        })
      }

    },
    // 跳转到面试
    allInfo: function() {
      wx.navigateTo({
        url: '../component/index/information/information',
      })
    },
    // 跳转到笔试
    allInfo1: function () {
      wx.navigateTo({
        url: '../component/index/information1/information1',
      })
    },
    service: function() {
      wx.navigateTo({
        url: '../component/index/service/service',
      })
    },
    // 客服电话
    tel: function() {
      wx.request({
        url: baseUrl +'material?type=1',
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
    question:function() {
      wx.navigateTo({
        url: '../component/index/question/question',
      })
    }
  }
})