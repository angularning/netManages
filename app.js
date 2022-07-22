// app.js
import api from './utils/request'
App({
  onLaunch() {
    // "tabBar": {
    //   "list": [
    //     {
    //       "pagePath": "pages/index/index",
    //       "text": "首页",
    //       "iconPath": "image/m0.png",
    //       "selectedIconPath": "image/m1.png"
    //     },
    //     {
    //       "pagePath": "pages/notes/index",
    //       "text": "日记本",
    //       "iconPath": "image/n0.png",
    //       "selectedIconPath": "image/n1.png"
    //     },
    //     {
    //       "pagePath": "pages/userInfo/userInfo",
    //       "text": "我的",
    //       "iconPath": "image/n0.png",
    //       "selectedIconPath": "image/n1.png"
    //     }
    //   ]
    // },
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // wx.login({
    //   success: temp => {
    //     if(temp.errMsg =='login:ok'){
    //       console.log(temp)
    //       setTimeout(()=>{
    //         const data = {
    //           code: temp.code || this.globalData.code
    //         }
    //         api.post('/miniprogram/user/get_open_id/',data).then(item=>{
    //           const {data} = item
    //           console.log(data)
    //           if(data.error_code == 0){
    //             const result = data.data
    //             this.globalData.open_id = result.open_id
    //             api.post('/miniprogram/user/qr_scan_login/',{open_id:result.open_id}).then(res=>{
    //               this.globalData.is_login = true
    //             })
    //           }
    //         })
    //       },100)
    //     }else{
    //       // wx.showToast({
    //       //   title: '请先授权使用手机号，才能更好的给您提供服务',
    //       //   duration: 5000,
    //       //   icon: 'none'
    //       // })
    //       // app.globalData.is_login = false
    //       // setTimeout(()=>{
    //       //   wx.switchTab({
    //       //     url: '/pages/index/index',
    //       //   })
    //       //  },5000)
    //     }
    //   }
    // })
    // 登录
    wx.checkSession({
      success: (session) => {
        console.log(session)
      },
    })
    // 获取用户信息
    // wx.getSetting({
    //   withSubscriptions: true,
    //   success: res => {
    //     // console.log(res)
    //     // var itemSettings = res.subscriptionsSetting;
    //     // console.log(itemSettings)
    //   // tmplIds: ['uEQxn3xd5L7873UxhzgK7qZsfm9YhTfaQoDNFRLaQJ8','-We0oyfpxLqJpT_TfnKIEggcIOK4zovjkaEcZzxVVjE'],
    //     // if (itemSettings) {
    //     //   if (itemSettings['uEQxn3xd5L7873UxhzgK7qZsfm9YhTfaQoDNFRLaQJ8']=='accept') {
    //     //     console.log(1)
    //     //   }else{
    //     //     console.log(2)
    //     //   }
    //     // }
    //   }
    // })
  },
  showLoginBox: function(){
    wx.showModal({
      title: '登录提示',
      content: '未授权无法享受相应的服务',
      confirmText: '登录',
      success: res=> {
        if (res.confirm) {
          wx.navigateTo({
            url: '/pages/login/index'
          })
        } else if (res.cancel) {
        }
      }
    })
  },
  globalData: {
    is_login: false, // 用户是否授权
    code: null,
    userInfo: null,
    isLogin: null,
    token:'',
    baseurlTest: 'https://caigou.ezhongbiao.com/v1/api'
  }
})