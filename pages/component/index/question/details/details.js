// pages/component/index/dynamicInfo/dynamicInfo.js
//获取应用实例
var WxParse = require('../../../../../wxParse/wxParse.js')
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailId: '',
    showInfo: []
  },
  download: function(e) {
    console.log(e.currentTarget.dataset.banner)
    console.log(e.currentTarget.dataset.current)
    if(app.globalData.user) {
      wx.showModal({
        title: '复制下载链接到下载器下载',
        content: e.currentTarget.dataset.banner,
        confirmText: '复制链接',
        success(res) {
          if (res.confirm) {
            wx.setClipboardData({
              data: e.currentTarget.dataset.banner,
              success: function (res) {
                wx.getClipboardData({
                  success: function (res) {
                    wx.showToast({
                      title: '复制成功',
                      icon: 'success'
                    })
                  }
                })
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '提示',
        content: '请先登录',
        success(res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '../../../../tabbar/tabbar?current=' + e.currentTarget.dataset.current ,
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
   
  },
  // look: function (e) {
  //   console.log(e.currentTarget.dataset.banner)
  //   console.log(e.currentTarget.dataset.current)
  //   if (app.globalData.openid) {
  //     wx.downloadFile({
  //       url: e.currentTarget.dataset.banner, //资源下载链接
  //       success(res) {
  //         wx.showLoading({ //显示 loading 提示框
  //           title: "正在打开",
  //         })
  //         setTimeout(wx.openDocument({
  //           filePath: res.tempFilePath,
  //           success: function (res) {
  //             wx.hideLoading()
  //           },
  //         }), 1000)
  //         // wx.saveFile({
  //         //   tempFilePath: res.tempFilePath,
  //         //   success(res) {
  //         //     wx.showToast({
  //         //       title: '下载',
  //         //       icon: 'success',
  //         //       duration: 2000
  //         //     })
  //         //   }
  //         // })
  //       },
  //     })
  //   } else {
  //     wx.showModal({
  //       title: '提示',
  //       content: '请先登录',
  //       success(res) {
  //         if (res.confirm) {
  //           wx.redirectTo({
  //             url: '../../../../tabbar/tabbar?current=' + e.currentTarget.dataset.current,
  //           })
  //         } else if (res.cancel) {
  //           console.log('用户点击取消')
  //         }
  //       }
  //     })
  //   }

  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    this.setData({
      detailId: options.id
    })
    wx.showLoading({ //显示 loading 提示框
      title: "正在加载",
    })
    //获取动态资讯
    wx.request({
      url: baseUrl + 'subject/' + that.data.detailId + '?flog=true',
      data: {
        // token: '',
        // eid: 1
      },
      success: (res) => {
        wx.hideLoading()
        console.log(res.data.data.text)
        var showInfo1 = res.data.data
        var text = res.data.data.text
        WxParse.wxParse('info', 'html', text, that, 5);
        this.setData({
          showInfo: showInfo1
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