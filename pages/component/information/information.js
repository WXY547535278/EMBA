// pages/information/information.js
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
  lifetimes: {
    attached: function() {
      this.getDeviceInfo()
      var write = []
      var interview = []
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
          this.setData({
            showInfo: res.data.data
          })
        }
      })
      //获取面试/笔试
      wx.request({
        url: baseUrl + 'subject',
        data: {
          // token: '121321',
          // eid: 1
        },
        success: (res) => {
          // console.log("获取面试笔试")
          // console.log(res.data.data)
          for(var i=0; i<res.data.data.length; i++) {
            if(res.data.data[i].type == 1) {
              interview.push(res.data.data[i]) 
            } else if (res.data.data[i].type == 2) {
              write.push(res.data.data[i])
            } 
          }
          this.setData({
            showWrite: write
          })
          this.setData({
            showInterview: interview
          })
          // console.log(this.data.showWrite)
          // console.log(this.data.showInterview)
        }
      })
    },
    detached: function() {

    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    showWrite: [],
    showInterview: [],
    showInfo: [], //动态资讯
    showCurriculum: [], //课程
    img: {
      vedioImg: [
        '../../../images/video.png',
        '../../../images/video.png',
        '../../../images/video.png',
        '../../../images/video.png',
        '../../../images/video.png',
        '../../../images/video.png'
      ],
      videoPlay: [
        '../../../images/information/video-play.png',
        '../../../images/information/video-play.png'
      ]
    },
    swipertab: [{
      name: '资讯',
      index: 0
    }, {
      name: '笔试',
      index: 1
    }, {
      name: '面试',
      index: 2
    }],
  },
  /* 组件的方法列表 */
  methods: {
    /**
     * @Explain：选项卡点击切换
     */
    tabSwitch: function(e) {
      var that = this
      if (this.data.currtab === e.target.dataset.current) {
        return false
      } else {
        that.setData({
          currtab: e.target.dataset.current
        })
      }
    },
    tabChange: function(e) {
      this.setData({
        currtab: e.detail.current
      })
    },
    details: function(e) {
      wx.navigateTo({
        url: '../component/index/tutorClass/classDetail/classDetail?id=' + e.currentTarget.dataset.id,
      })
    },
    // 获取系统宽高
    getDeviceInfo: function() {
      let that = this
      wx.getSystemInfo({
        success: function(res) {
          that.setData({
            deviceW: res.windowWidth,
            deviceH: res.windowHeight - 160
          })
        }
      })
    },
    dynamicInfo: function(e) {
      wx.navigateTo({
        url: '../component/index/dynamicInfo/dynamicInfo?id=' + e.currentTarget.dataset.id
      })
    },
    subject: function(e) {
      wx.navigateTo({
        url: '../component/information/subject/subject?id=' + e.currentTarget.dataset.id
      })
    }
  }
})