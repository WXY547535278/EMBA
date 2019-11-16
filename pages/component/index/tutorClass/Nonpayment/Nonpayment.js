// pages/index/tutorClass/classDetail/classDetail.js
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    phone: null,
    phone1: null,
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: baseUrl + 'material?type=1',
      success: (res) => {
        console.log(res.data.data[0].text)
        this.setData({
          phone: res.data.data[0].text,
          phone1: res.data.data[1].text
        })
      }
    })
  },
  tel: function() {
    wx.makePhoneCall({
      phoneNumber: this.data.phone,
    })
  },
  tel1: function () {
    wx.makePhoneCall({
      phoneNumber: this.data.phone1,
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