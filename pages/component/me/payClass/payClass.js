// pages/index/tutorClass/tutorClass.js
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freeClass: [],
    nonepayClass: [],
    payClass: []
  },
  freeClass: function (e) {
    wx.navigateTo({
      url: '../../index/tutorClass/classDetail/classDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  nonpay: function () {
    wx.navigateTo({
      url: '../../index/tutorClass/Nonpayment/Nonpayment',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
    var free = []
    var nonepay = []
    var pay = []
    wx.showLoading({ //显示 loading 提示框
      title: "正在加载",
    })
    wx.request({
      url: baseUrl + 'curriculum?openid=' + app.globalData.openid,
      data: {},
      success: (res) => {
        wx.hideLoading() //隐藏 loading 提示框
        for (var i = 0; i < res.data.data.length; i++) {
          if (res.data.data[i].free == "a") {
            free.push(res.data.data[i])
          } else if (res.data.data[i].free == "c") {
            nonepay.push(res.data.data[i])
          } else {
            pay.push(res.data.data[i])
          }
        }
        this.setData({
          freeClass: free,
          nonepayClass: nonepay,
          payClass: pay
        })
        console.log(res.data.data)
        console.log(this.data.freeClass)
        console.log(this.data.nonepayClass)
        console.log(this.data.payClass)
      }
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})