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
    payClass: [],
    allClass: [],
    hasMoreData: true, //上拉时是否继续请求数据，即是否还有更多数据
    pageIndex: 0,
    pageSize: 6
  },
  freeClass: function(e) {
    wx.navigateTo({
      url: './classDetail/classDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  nonpay: function() {
    wx.navigateTo({
      url: './Nonpayment/Nonpayment',
    })
  },
  getClass: function(message) {
    var openId = app.globalData.openid 
    var that = this;
    var free = []
    var nonepay = []
    var pay = []
    wx.showNavigationBarLoading() //在当前页面显示导航条加载动画
    wx.showLoading({ //显示 loading 提示框
      title: message,
    })
    if (app.globalData.user) {
      wx.request({
        url: baseUrl + 'curriculum?openid=' + app.globalData.openid + '&pageIndex=' + that.data.pageIndex + '&pageSize=' + that.data.pageSize,
        data: {},
        success: (res) => {
          var allclass = that.data.allClass
          console.log(res.data.data.length)
          if (res.data.data.length >= 0) {//必须是res.data.data.length >= 0文不是res.data.data.length >0
            wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
            wx.hideLoading() //隐藏 loading 提示框
            if (that.data.pageIndex == 0) {
              allclass = []
            }
            var classlist = res.data.data;
            console.log(classlist.length)
            if (classlist.length < that.data.pageSize) {
              that.setData({
                allClass: allclass.concat(classlist),
                hasMoreData: false
              })
            } else {
              that.setData({
                allClass: allclass.concat(classlist),
                hasMoreData: true,
                pageIndex: that.data.pageIndex + 1
              })
            }
          }
          for (var i = 0; i < that.data.allClass.length; i++) {
            if (that.data.allClass[i].free == "a") {
              free.push(that.data.allClass[i])
            } else if (that.data.allClass[i].free == "c") {
              nonepay.push(that.data.allClass[i])
            } else {
              pay.push(that.data.allClass[i])
            }
          }
          this.setData({
            freeClass: free,
            nonepayClass: nonepay,
            payClass: pay
          })
          console.log(that.data.allClass)
          console.log(that.data.freeClass)
          console.log(that.data.nonepayClass)
          console.log(that.data.payClass)
        }
      })
    }else {
      wx.request({
        url: baseUrl + 'curriculum?pageIndex=' + that.data.pageIndex + '&pageSize=' + that.data.pageSize,
        data: {},
        success: (res) => {
          var allclass = that.data.allClass
          console.log(res.data.data.length)
          if (res.data.data.length >= 0) {//必须是res.data.data.length >= 0文不是res.data.data.length >0
            wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
            wx.hideLoading() //隐藏 loading 提示框
            if (that.data.pageIndex == 0) {
              allclass = []
            }
            var classlist = res.data.data;
            console.log(classlist.length)
            if (classlist.length < that.data.pageSize) {
              that.setData({
                allClass: allclass.concat(classlist),
                hasMoreData: false
              })
            } else {
              that.setData({
                allClass: allclass.concat(classlist),
                hasMoreData: true,
                pageIndex: that.data.pageIndex + 1
              })
            }
          }
          for (var i = 0; i < that.data.allClass.length; i++) {
            if (that.data.allClass[i].price == "0") {
              free.push(that.data.allClass[i])
            }else{
              nonepay.push(that.data.allClass[i])
            }
          }
          this.setData({
            freeClass: free,
            nonepayClass: nonepay,
          })
          console.log(that.data.allClass)
          console.log(that.data.freeClass)
          console.log(that.data.nonepayClass)
        }
      })
    }    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    that.getClass('正在加载数据...')
    console.log(app.globalData.openid)
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
  onPullDownRefresh: function () {
    console.log("下拉")
    this.data.pageIndex = 0
    this.getClass('正在刷新数据')
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    console.log("上拉" + this.data.hasMoreData)
    if (this.data.hasMoreData) {
      this.getClass('加载更多数据')
    } else {
      wx.showToast({
        title: '没有更多数据',
      })
    }
  }, 
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})