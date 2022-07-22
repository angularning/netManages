import {
  fetchIndexBanner
} from '../../services/index/index';
const app = getApp()
Page({
  externalClasses: ['home-class'],
  data: {
    // 公告是否显示
    hasMes: true,
    // 公告滚动
    marquee: { speed: 50, loop: -1, delay: 0 },
    imgSrcs: [],
    tabList: [],
    pageLoading: false,
    current: 1,
    autoplay: true,
    duration: 500,
    interval: 5000,
    navigation: {
      type: 'dots-bar'
    },
    // 首页功能icon
    homeIconList: [
      {
        icon: '../../images/indexIcon_03.png',
        name: '人员审批'
      },
      {
        icon: '../../images/indexIcon_07.png',
        name: '爬楼图管理'
      },
      {
        icon: '../../images/indexIcon_10.png',
        name: '其他功能'
      }
    ],
    // 资讯列表
    newsList: [
      {
        title: '以党建引领社区发展，红色文化共创精神',
        date: '2022-07-06',
        view: 100
      },
      {
        title: '物业好坏可以直接影响居民生活质量”这个问题再认可不过',
        date: '2022-07-06',
        view: 100
      },
      {
        title: '物业信息管理系统（bvpmis），为物业主管部门、物业服务企业、房',
        date: '2022-07-06',
        view: 100
      },
      {
        title: 'xxxx',
        date: '2022-07-06',
        view: 100
      },
    ]
  },
  onShow() {
    this.getTabBar().init();
    this.getUserInfo()
  },

  onLoad() {
    this.init();
  },

  init() {
    this.loadHomePage();
  },
  // 路由跳转
  toPages(e) {
    if (!app.globalData.userInfo) {
      wx.showModal({
        cancelColor: 'cancelColor',
        content: '请先完成登录吧',
        confirmText: '确定',
        success (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
      return
    }
    if(e.currentTarget.dataset.index === 1){
      wx.navigateTo({
        url: '/pages/community/index',
      })
    } else if(e.currentTarget.dataset.index === 0){
      wx.navigateTo({
        url: '/pages/personApprove/index',
      })
    } else if(e.currentTarget.dataset.index === 2){
      wx.showToast({
        title: '暂未开放',
        icon: 'none'
      })
    }
  },

  // 获取用户是否登录
  getUserInfo(e) {
    const that = this;
    if (app.globalData.userInfo) {
      return
    }
    // 查看是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              console.log(res)
              that.setData({
                globalData: res.userInfo,
              })
              app.globalData.userInfo = res.userInfo
              // wx.setStorageSync("allData",res.result)
            }
          })
        } else {
          console.log("拒绝")
        }
      }
    })
  },
  // 去资讯详情

  toInfo(data){
    const item = data.currentTarget.dataset.item
    wx.navigateTo({
      url: `./infoDetail/index?data=${JSON.stringify(item)}`,
    })
  },
  
  loadHomePage() {
    this.setData({
      pageLoading: true,
    });
    fetchIndexBanner().then(({
      swiper,
    }) => {
      this.setData({
        imgSrcs: swiper,
      });
    });
  },
});