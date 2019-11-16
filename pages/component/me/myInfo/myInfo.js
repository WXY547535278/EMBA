// pages/me/myInfo/myInfo.js
// import {parseTime} from "../../../../utils/util"
var Promisify = require('../../../../utils/util') //具体引入路径根据具体情况
var parseTime = Promisify.parseTime
//获取应用实例
const app = getApp()
const uploadImageUrl = app.globalData.uploadImageUrl
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sex: ['男','女'],
    formdata:'',
    UserInfo: {},
    birthday:''
  },
  updateInfo: function(e) {
    // console.log(e.currentTarget.dataset.name)
    wx.redirectTo({
      url: 'updateInfo/updateInfo?name=' + e.currentTarget.dataset.name
    })
  },
  //通过拍照或从手机相册中上传图片
  updateHead: function() {
    wx.chooseImage({
      count: 1,
      sizeType: ['original','compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        var headimg = res.tempFilePaths
        console.log(headimg)
        // tempFilePath可以作为img标签的src属性显示图片
        wx.uploadFile({
          url: uploadImageUrl,
          filePath: headimg[0],
          name: 'file',
          formData: {
          },
          success: (res) => {
            console.log(JSON.parse(res.data))
            if (JSON.parse(res.data).code == 200) {
              wx.request({
                url: baseUrl + 'user',
                data: {
                  openid: app.globalData.openid,
                  headImg: JSON.parse(res.data).data
                },
                method: 'PUT',
                success: (res) => {
                  if(res.data.code == 200) {
                    // wx.request({
                    //   url: app.globalData.baseUrl + 'user?openid=' + app.globalData.openid,
                    //   data: {},
                    //   success: (res) => {
                    //     app.globalData.user = res.data.data[0]
                    //   }
                    // })
                    wx.redirectTo({
                      url: '../myInfo/myInfo',
                    })
                  }
                }
              })
            }
          }
        })
        this.setData({
          formdata: res.tempFilePaths
        })
      },
    })
  },

  // sex
  bindPickerChange: function(e) {
    var that = this
    var sName = e.detail.value
    console.log(sName)
    console.log(that.data.sex[sName])
    wx.request({
      url: baseUrl + 'user',
      data: {
        openid: app.globalData.openid,
        sex: that.data.sex[sName]
      },
      method: 'PUT',
      success: (res) => {
        if (res.data.code == 200) {
          wx.redirectTo({
            url: '../myInfo/myInfo',
          })
        }
      }
    })
  },

  // birthday
  bindDateChange: function(e) {
    console.log(e.detail.value)
    wx.request({
      url: baseUrl + 'user',
      data: {
        openid: app.globalData.openid,
        birthday: e.detail.value
      },
      method: 'PUT',
      success: (res) => {
        if (res.data.code == 200) {
          wx.redirectTo({
            url: '../myInfo/myInfo',
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: baseUrl + 'user/' + app.globalData.openid,
      data:{},
      success: (res) => {
        this.setData({
          UserInfo: res.data.data
        })
        this.setData({
          birthday: parseTime(this.data.UserInfo.birthday)
        })
        // console.log(parseTime(this.data.birthday))
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