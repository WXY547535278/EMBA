// pages/information/detail/detail.js
Page({

  /**
  * 页面的初始数据
  */
  data: {
    currtab: 2,
    img: {
      vedioImg: [
        '../../../../images/video.png',
        '../../../../images/video.png',
        '../../../../images/video.png',
        '../../../../images/video.png'
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
  /**
   * @Explain：选项卡点击切换
   */
  tabSwitch: function (e) {
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
  onLoad: function (options) {

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