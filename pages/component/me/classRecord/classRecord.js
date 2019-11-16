// pages/index/tutorClass/tutorClass.js
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    freeClass: [],
    record: [],
    pageIndex: 0,
    pageSize: 6,
    hasMoreData: true
  },
  freeClass: function (e) {
    wx.navigateTo({
      url: '../../index/tutorClass/classDetail/classDetail?id=' + e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.globalData.openid)
    this.getRecord()
  },

  getRecord: function() {
    wx.showLoading({ //显示 loading 提示框
      title: "正在加载",
    })
    wx.request({
      url: baseUrl + 'studyFlow?openid=' + app.globalData.openid + '&pageIndex=' + this.data.pageIndex + '&pageSize=' + this.data.pageSize,
      data: {},
      success: (res) => {
        wx.hideLoading() //隐藏 loading 提示框
        var classRecord = this.data.record
        if (res.data.data.length >= 0) {//必须是res.data.data.length >= 0文不是res.data.data.length >0
          wx.hideNavigationBarLoading() //在当前页面隐藏导航条加载动画
          wx.hideLoading() //隐藏 loading 提示框
          if (this.data.pageIndex == 0) {
            classRecord = []
          }
          var records = res.data.data;
          if (records.length < this.data.pageSize) {
            this.setData({
              record: classRecord.concat(records),
              hasMoreData: false
            })
          } else {
            this.setData({
              record: classRecord.concat(records),
              hasMoreData: true,
              pageIndex: this.data.pageIndex + 1
            })
          }
        }
      },
    })
  },

  deleteRecord:function(e) {
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: baseUrl + 'studyFlow/' + e.currentTarget.dataset.id,
      method: 'DELETE',
      success: (res) => {
        if(res.data.code == 200){
          wx.showToast({
            title: "删除成功",
            icon: "success",
            duration: 1000
          });
          setTimeout(function () {
            wx.redirectTo({
              url: '../../me/classRecord/classRecord',
            })
          }, 1000);
        }
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
    console.log("下拉")
    this.data.pageIndex = 0
    this.getRecord('正在刷新数据')
  },

  /**
  * 页面上拉触底事件的处理函数
  */
  onReachBottom: function () {
    console.log("上拉" + this.data.hasMoreData)
    if (this.data.hasMoreData) {
      this.getRecord('加载更多数据')
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