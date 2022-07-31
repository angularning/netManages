const app = getApp()
Component({
  data: { 
    active: 1,
    list: [
      {
        pagePath: "/pages/index/index",
        text: "首页",
        normal: '/images/home.png',
        active: '/images/homed.png'
      },
      {
        pagePath: "/pages/scan/index",
        text: "扫码",
        normal: '/images/scan.png',
        active: '/images/scan.png'
      },
      {
        pagePath: "/pages/user/index",
        text: "个人中心",
        normal: '/images/user.png',
        active: '/images/userd.png'
      }
    ]
  },
  methods: {
    onChange(e) {
      const that = this
      that.setData({ active: e.detail });
      if(e.detail === 1){
        wx.scanCode({
          success (res) {
            console.log(res)
            if(res.errMsg === 'scanCode:ok' && res.result){
              app.globalData.scanData = res.result
              wx.switchTab({
                url: that.data.list[e.detail].pagePath
              });
            }
          }
        })
      } else {
        wx.switchTab({
          url: this.data.list[e.detail].pagePath
        });
      }
        // wx.switchTab({
        //   url: this.data.list[e.detail].pagePath
        // });
        wx.getStorage({
          key: 'is_login',
          success: login=>{
            if(!login.data){
              app.showLoginBox()
            }
          },
          fail: fail=>{
            app.showLoginBox()
          }
        })
      // if(app.globalData.is_login){
        
      // }else{
      //   wx.showToast({
      //     title: '没有授权无法享受寻源服务~',
      //     icon: 'none',
      //     duration: 2000
      //   })
      // }
    },
    init() {
        const page = getCurrentPages().pop();
        this.setData({
          active: this.data.list.findIndex(item => item.pagePath === `/${page.route}`)
        });
       }
    }
})