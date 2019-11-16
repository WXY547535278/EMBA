// pages/information/information.js
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showTeacher: [],
    pageIndex: 0,
    pageSize: 4,
    hasMoreData: true
  },
  assessment: function(e) {
    if (!app.globalData.user) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
    } else {
    wx.navigateTo({
      url: './assessment/assessment?id=' + e.currentTarget.dataset.id,
    })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    // 获取教师信息列表
    that.getTeacher()
    // wx.request({
    //   url: baseUrl + 'teacher?pageIndex=' + that.data.pageIndex + '&pageSize=' + that.data.pageSize,
    //   data: {
    //     // token: '121321',
    //     // eid: 1
    //   },
    //   success: (res) => {
    //     console.log(res)
    //     this.setData({
    //       showTeacher: res.data.data
    //     })
    //     // console.log(this.data.showTeacher)
    //   }
    // })
  },

  getTeacher() {
    wx.showLoading({ //显示 loading 提示框
      title: "正在加载",
    })
    var that = this
    // 获取教师信息列表
    wx.request({
      url: baseUrl + 'teacher?pageIndex=' + that.data.pageIndex + '&pageSize=' + that.data.pageSize,
      data: {
      },
      success: (res) => {
        wx.hideLoading()
        var teacher = that.data.showTeacher
        console.log(res.data.data.length)
        if (res.data.data.length >= 0) {//必须是res.data.data.length >= 0文不是res.data.data.length >0
          wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
          wx.hideLoading() //隐藏 loading 提示框
          if (that.data.pageIndex == 0) {
            teacher = []
          }
          var teachers = res.data.data;
          console.log(teachers.length)
          if (teachers.length < that.data.pageSize) {
            that.setData({
              showTeacher: teacher.concat(teachers),
              hasMoreData: false
            })
          } else {
            that.setData({
              showTeacher: teacher.concat(teachers),
              hasMoreData: true,
              pageIndex: that.data.pageIndex + 1
            })
          }
        }
      }
    })
  },
  phone(e) {
    console.log(e.currentTarget.dataset.tel)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.tel,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
  * 页面相关事件处理函数--监听用户下拉动作
  */
  onPullDownRefresh: function () {
    console.log("下拉")
    this.data.pageIndex = 0
    this.getTeacher('正在刷新数据')
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    console.log("上拉" + this.data.hasMoreData)
    if (this.data.hasMoreData) {
      this.getTeacher('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  }, 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})