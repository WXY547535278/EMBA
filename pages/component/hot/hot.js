// pages/hot/hot.js
const app = getApp()
const baseUrl = app.globalData.baseUrl
var Promisify = require('../../../utils/util.js') //具体引入路径根据具体情况
var request = Promisify.wxPromisify(wx.request); //ajax请求
var login = Promisify.wxPromisify(wx.login); //login请求
Component({
  /**
   * 组件的初始数据
   */
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
      if (!(user && user.openid)) {
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
      } else {
        that.getClass()
      } 
      //获取轮播图
      wx.request({
        url: baseUrl + 'flashView',
        data: {
          // token: '111',
          // eid: 1
        },
        success: (res) => {
          var flashType1 = []
          // console.log(res)
          //判断轮播图类型
          for (var i = 0; i < res.data.data.length; i++) {
            if (res.data.data[i].type == '2') {
              flashType1.push(res.data.data[i])
            }
          }
          this.setData({
            showFlash: flashType1
          })
          const showFlashImg = this.data.showFlash
          // console.log(showFlashImg)
          // console.log(res.data.data[5].img)
        }
      })
      //获取课程信息
      // setTimeout(() => {
      //   wx.request({
      //     url: baseUrl + 'curriculum?openid=' + app.globalData.openid,
      //     data: {},
      //     success: (res) => {
      //       console.log("热门页获取到的视频列表", res.data.data)
      //       var showCurriculum1 = []
      //       for (var i = 0; i < 6; i++) {
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
  },
  /* 组件的初始数据 */
  data: {
    //轮播图
    interval: 3000,
    duration: 1500,
    showFlash: [],
    showCurriculum: [],
    img: {
      swiperImg: [
        "../../../images/hot/lunbo.png",
      ],
      vedioImg: [
        "../../../images/video.png",
        "../../../images/video.png",
        "../../../images/video.png",
        "../../../images/video.png",
        "../../../images/video.png",
        "../../../images/video.png"
      ]
    }
  },
  /* 组件的方法列表 */
  methods: {
    // 获取课程视频
    getClass1: function () {
      wx.request({
        url: baseUrl + 'curriculum',
        data: {},
        success: (res) => {
          // console.log(1)
          console.log('热门页获取到的课程信息', res.data)
          var showCurriculum1 = []
          for (var i = 0; i < 6; i++) {
            showCurriculum1.push(res.data.data[i])
          }
          this.setData({
            showCurriculum: showCurriculum1
          })
        }
      })
    },
    // 根据id获取课程视频
    getClass: function() {
      wx.request({
        url: baseUrl + 'curriculum?openid=' + app.globalData.openid,
        data: {},
        success: (res) => {
          console.log("热门页获取到的视频列表", res.data.data)
          var showCurriculum1 = []
          for (var i = 0; i < 6; i++) {
            showCurriculum1.push(res.data.data[i])
          }
          this.setData({
            showCurriculum: showCurriculum1
          })
        }
      })
    },
    classDetail: function(e) {
      if (e.currentTarget.dataset.free == 'a' || e.currentTarget.dataset.free == 'b'
        ||e.currentTarget.dataset.free == '1') {
        wx.navigateTo({
          url: '../component/index/tutorClass/classDetail/classDetail?id=' + e.currentTarget.dataset.id,
        })
      } else {
        wx.navigateTo({
          url: '../component/index/tutorClass/Nonpayment/Nonpayment'
        })
      }
    }
  }
})