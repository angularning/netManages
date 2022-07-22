// pages/user/index.js
import api from '../../utils/request'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email:'',
    company: '',
    cellphone: '',
    name: '',
    head_img_url: '',
    is_login: true,
    showMakePhone: false,
  },

   // 控制电话
   showMakePhone() {
    this.setData({
      showMakePhone : !this.data.showMakePhone
    })
  },
  // 关闭
  onClose() {
    this.setData({
      showMakePhone : !this.data.showMakePhone
    })
  },
  clear() {
    wx.clearStorage({
      success: (res) => {
        wx.showToast({
          title: '清理成功',
          icon: 'none'
        })
      },
    })
  },
  toUserInfo() {
    wx.navigateTo({
      url: '/pages/user/userInfo/index',
    })
  },
  toXy() {
    wx.navigateTo({
      url: '/pages/user/xy/index',
    })
  },
  call() {
    wx.makePhoneCall({
      phoneNumber: '15811111111',
    })
  },

  toSubmit(){
    wx.navigateTo({
      url: '/pages/submit/index'
    })
  },
  
  toService(){
    wx.navigateTo({
      url: '/pages/xy/index'
    })
  },
  toXyXq(){
    wx.navigateTo({
      url: '/pages/xyxq/index'
    })
  },
  toYs(){
    wx.navigateTo({
      url: '/pages/ys/index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    api.get('/user/me/',{token:app.globalData.token}).then(item=>{
      const user = item.data.data
      this.setData({
        email: user.email,
        cellphone: user.cellphone,
        company: user.company,
        name: user.name,
        head_img_url: user.head_img_url
      })
    })
  },
  logout(){
    this.setData({
      is_login: false
    })
    wx.setStorage({
      key: "is_login",
      data: false
    })
    app.globalData.is_login = false
    app.globalData.token = ''
    wx.setStorageSync('token', '')
    app.showLoginBox()
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
    this.getTabBar().init();
    wx.getStorage({
      key: 'is_login',
      success: item=>{
        if(item.data){
          this.setData({
            is_login: true
          })
        } else {
          this.setData({
            is_login: false
          })
        }
      }
    })
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