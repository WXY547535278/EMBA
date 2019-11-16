// pages/index/entrance/assessment/assessment.js
//获取应用实例
const app = getApp()
const baseUrl = app.globalData.baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacherId: ''
  },

  // 表单提交
  formSubmit: function(e) {
    var that = this
    e.detail.value.teacherId = that.data.teacherId
    // e.detail.value.name = app.globalData.user.nickName
    e.detail.value.openid = app.globalData.openid
     
    //  e.detail.value.company == '' ||
    //   e.detail.value.duties == '' || e.detail.value.education == '' || e.detail.value.name == '' ||
    //   e.detail.value.phone == '' || e.detail.value.problem == '' || e.detail.value.workingYears == '') 
    if (e.detail.value.name == ''){
      wx.showToast({
        title: '姓名不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.phone == '') {
      wx.showToast({
        title: '手机号码不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.education == '') {
      wx.showToast({
        title: '教育背景不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.age == '') {
      wx.showToast({
        title: '年龄不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.duties == '') {
      wx.showToast({
        title: '职务不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.workingYears == '') {
      wx.showToast({
        title: '工龄不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.company == '') {
      wx.showToast({
        title: '单位不能为空',
        icon: 'none',
        duration: 1000
      })
    } else if (e.detail.value.problem == '') {
      wx.showToast({
        title: '问题不能为空',
        icon: 'none',
        duration: 1000
      })
    }else{
      wx.request({
        url: app.globalData.baseUrl + 'consultation',
        data: e.detail.value,
        method: 'POST',
        success: (res) => {
          if (res.data.code == 200) {
            wx.showToast({
              title: "提交成功",
              icon: "success",
              duration: 1000
            });
            setTimeout(function() {
              wx.navigateBack({});
            }, 1000);
          }
        }
      })
    }
    console.log(e.detail.value)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      teacherId: options.id
    })
    console.log(this.data.teacherId)
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