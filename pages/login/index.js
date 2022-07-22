// pages/login/index.js
import api from '../../utils/request'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: true,
    show: false,
  },
  bindGetUserInfo: function (e) {
    this.setData({
      userNicheng: e.detail.userInfo.nickName,
      hid1: true,
      hid2: false
    })
  },
  // 获取手机号信息完成登录
  getPhoneNumber: function (e) {
    console.log('显示当前的手机号', e)
    wx.login({
      success: res => {
        console.log('获取微信code', res)
        if (e.detail.errMsg !== 'getPhoneNumber:fail user deny') {
          const data = {
            code: res.code || app.globalData.code,
            iv: e.detail.iv,
            encryptedData: e.detail.encryptedData
          }
          api.postObj('/miniprogram/user/get_open_id/', data).then(item => {
            console.log('获取get_open_id', item)
            const {
              data
            } = item
            if (data.error_code == 0) {
              const result = data.data
              app.globalData.open_id = result.open_id
              api.postObj('/miniprogram/user/qr_scan_login/', {
                open_id: result.open_id
              }).then(login => {
                app.globalData.token = login.data.data.token
                app.globalData.is_login = true
                wx.setStorage({
                  key: "is_login",
                  data: true
                })
                wx.setStorageSync('token', login.data.data.token)
                wx.setStorageSync('open_id', result.open_id)
                this.setData({
                  show: true,
                })
                 setTimeout(()=>{
                  wx.switchTab({
                    url: '../index/index',
                  })
                 },100)
              })
            }
          })
          // wx.showModal({
          //   title: '我们需要使用',
          //   content: '请允许服务通知，方便我们给您更好的提供服务',
          //   success: message=> { 
          //     wx.requestSubscribeMessage({
          //       tmplIds: ['uEQxn3xd5L7873UxhzgK7qZsfm9YhTfaQoDNFRLaQJ8','-We0oyfpxLqJpT_TfnKIEggcIOK4zovjkaEcZzxVVjE'],
          //       success: sub=>{
          //       }
          //     })
          //   }
          // })
        } else {
          wx.showToast({
            title: '请先授权使用手机号，才能更好的给您提供服务',
            duration: 5000,
            icon: 'none'
          })
          wx.setStorage({
            key: "is_login",
            data: false
          })
          app.globalData.is_login = false
          setTimeout(() => {
            wx.switchTab({
              url: '../index/index',
            })
          }, 5000)
        }
      }
    })
  },
  getUserInfo(userInfo) {
    console.log(userInfo)
  },
  // 游客登录
  toLoginYk() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  // 订阅消息
  // message() {
  //   wx.requestSubscribeMessage({
  //     tmplIds: ['uEQxn3xd5L7873UxhzgK7qZsfm9YhTfaQoDNFRLaQJ8', '-We0oyfpxLqJpT_TfnKIEggcIOK4zovjkaEcZzxVVjE'],
  //     success(res) {
  //       console.log(res)
  //       if (res) {
  //         wx.switchTab({
  //           url: '../index/index',
  //         })
  //       }
  //     }
  //   })
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    // 获取用户信息
    wx.getStorage({
      key: 'is_login',
      success: loginState => {
        if (loginState.data) {
          wx.showLoading({
            title: '加载中...',
            icon: 'none'
          })
          this.setData({
            isShow: false
          })
          wx.login({
            success: temp => {
              if (temp.errMsg == 'login:ok') {
                setTimeout(() => {
                  const data = {
                    code: temp.code || app.globalData.code
                  }
                  api.post('/miniprogram/user/get_open_id/', data).then(item => {
                    const {
                      data
                    } = item
                    console.log(data)
                    if (data.error_code == 0) {
                      const result = data.data
                      app.globalData.open_id = result.open_id
                      api.post('/miniprogram/user/qr_scan_login/', {
                        open_id: result.open_id
                      }).then(login => {
                        this.setData({
                          isShow: false
                        })
                        app.globalData.is_login = true
                        app.globalData.token = login.data.data.token
                        wx.setStorage({
                          key: "is_login",
                          data: true
                        })
                        wx.setStorageSync('token', login.data.data.token)
                        wx.setStorageSync('open_id', result.open_id)
                        wx.switchTab({
                          url: '../index/index',
                        })
                      })
                    }
                  })
                })
              } else {
                // wx.showToast({
                //   title: '请先授权使用手机号，才能更好的给您提供服务',
                //   duration: 5000,
                //   icon: 'none'
                // })
                // app.globalData.is_login = false
                // setTimeout(()=>{
                //   wx.switchTab({
                //     url: '/pages/index/index',
                //   })
                //  },5000)
              }
            }
          })
        }
      },
      fail: fail => {
        console.log(fail)
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
  onLoad: function () {

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