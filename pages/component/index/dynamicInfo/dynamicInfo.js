// pages/component/index/dynamicInfo/dynamicInfo.js
//获取应用实例
var WxParse = require('../../../../wxParse/wxParse.js');
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailId: '',
    showInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 测试
    // var detail_content = "<div>我是HTML代码</div>";
    // WxParse.wxParse('info', 'html', showInfo, that, 5);
    this.setData({
      detailId: options.id
    })
    wx.showLoading({ //显示 loading 提示框
      title: "正在加载",
    })
    //获取动态资讯
    wx.request({
      url: baseUrl + 'information/' + that.data.detailId+ '?flog=true' ,
      data: {
        // token: '',
        // eid: 1
      },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data.data.text)
        var showInfo1 = res.data.data
        WxParse.wxParse('info', 'html', res.data.data.text, that, 5);
        this.setData({
          showInfo: showInfo1
        })
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