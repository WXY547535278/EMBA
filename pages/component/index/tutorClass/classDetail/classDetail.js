// pages/index/tutorClass/classDetail/classDetail.js
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailId: '',
    currtab: 0,
    showCurriculum: [],
    showCurriculums: [],
    showChapter: [],
    video: '',
    // 下拉菜单
    start: "起始地",
    slist: [
      { id: 1, name: "第一类" },
      { id: 1, name: "第二类" },
      { id: 1, name: "第三类" },
      { id: 1, name: "第四类" },
      { id: 1, name: "第五类" },
    ],
    // isstart: false,
    openimg: "/images/list/list.png",
    offimg: "/images/list/list1.png",
    img: {
      vedioImg: [
        '../../../../../images/video.png',
        '../../../../../images/video.png',
        '../../../../../images/video.png',
        '../../../../../images/video.png'
      ]
    },
    swipertab: [{
      name: '课程简介',
      index: 0
    }, {
      name: '课程目录',
      index: 1
    }, {
      name: '相关课程',
      index: 2
    }],
  },
  // 下拉菜单
  opens: function (e) {
    // data:{
    //   isstart: false
    // }
    console.log(this.data)
    switch (e.currentTarget.dataset.item) {
      case "1":
        if (this.data.isstart) {
          this.setData({
            isstart: false,
          });
        }
        else {
          this.setData({
            isstart: true,
          });
        }
        break;
    }
  },
  onclicks1: function (e) {
    var index = e.currentTarget.dataset.index;
    let name = this.data.slist[index].name;
    this.setData({
      isstart: false,
      isfinish: false,
      isdates: false,
      start: this.data.slist[index].name,
      finish: "目的地"
    })
  },
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
  // 根据id获取课程视频
  getClass: function () {
    wx.showLoading({ //显示 loading 提示框
      title: "正在加载",
    })
    wx.request({
      url: baseUrl + 'curriculum?openid=' + app.globalData.openid,
      data: {},
      success: (res) => {
        wx.hideLoading()
        console.log("热门页获取到的视频列表", res.data.data)
        var showCurriculum1 = []
        for (var i = 0; i < 4; i++) {
          showCurriculum1.push(res.data.data[i])
        }
        this.setData({
          showCurriculums: showCurriculum1
        })
      }
    })
  },
  // 跳转到课程详情页面
  details: function(e) {
    // console.log(e.currentTarget.dataset.id)
    if (e.currentTarget.dataset.free == 'a' || e.currentTarget.dataset.free == 'b'
      || e.currentTarget.dataset.free == '1') {
      wx.navigateTo({
        url: 'classDetail?id=' + e.currentTarget.dataset.id,
      })
    } else {
      wx.navigateTo({
        url: '../Nonpayment/Nonpayment'
      })
    }
  },
  // 点击观看视频
  watch:function(e) {
    wx.showLoading({ //显示 loading 提示框
      title: "正在加载视频",
    })
    console.log(e.currentTarget.dataset.id)
    console.log(e.currentTarget.dataset.curriculumid)
    wx.request({
      url: baseUrl + 'samll/curriculum?openid=' + app.globalData.openid + '&curriculumId=' + e.currentTarget.dataset.curriculumid + '&needChapter=true&skuId=' + e.currentTarget.dataset.id,
      success: (res) => {
        console.log(res)
      }
    })
    wx.request({
      url: baseUrl + 'sku?id=' + e.currentTarget.dataset.id,
      success:(res) => {
        // console.log(res.data)
        console.log("获取到的视频地址",res.data.data[0])
        this.setData({
          video: res.data.data[0].video
        })
        wx.hideLoading() //隐藏 loading 提示框
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    // 获取课程列表
    that.getClass()
    this.setData({
      detailId: options.id
    })
    // console.log(that.data.id)
    //获取课程简介信息
    wx.request({
      url: baseUrl + 'curriculum?id=' + that.data.detailId,
      data: {},
      success: (res) => {
        console.log('课程简介信息')
        console.log(res.data.data)
        this.setData({
          showCurriculum: res.data.data
        })
      }
    })
    //获取课程目录信息（课程章节）
    wx.request({
      url: baseUrl + 'samll/curriculum?curriculumId=' + that.data.detailId + '&openid=' + app.globalData.openid + '&needChapter=true',
      data: {},
      success: (res) => {
        var chapterId = []
        console.log("获取课程章节信息")
        console.log(res.data.data.ChapterList)
        this.setData({
          showChapter: res.data.data.ChapterList,
        })
      }
    })
    //获取相关课程信息
    // wx.request({
    //   url: baseUrl + 'samll/relevant/' + that.data.detailId,
    //   data: {
    //     // token: '121321',
    //     // eid: 1
    //   },
    //   success: (res) => {
    //     console.log("获取相关课程信息")
    //     console.log(res.data.data)
    //     this.setData({
    //       showCurriculums: res.data.data
    //     })
    //   }
    // })

    // 获取视频信息
    wx.request({
      url: baseUrl + 'samll/curriculum?curriculumId=' + that.data.detailId + '&openid=' + app.globalData.openid + '&needChapter=true',
      success: (res) => {
        console.log("获取视频信息")
        console.log(res.data.data.ChapterList[0].skuList[0].video)
        this.setData({
          video: res.data.data.ChapterList[0].skuList[0].video
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})