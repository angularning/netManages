const app = getApp()
import util from '../../utils/util'
Component({
  properties: {
    // 这里定义了innerText属性，属性值可以在组件使用时指定
    list: {
      type: Array,
      value: [],
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
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
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },
  lifetimes: {
    attached(){
      // 在组件实例进入页面节点树时执行
    
    },
    detached() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  data: {
    active: 1,
    listCopy:[],
    is_login: true,
    more: false,
    pull: {
      isLoading: false,
      pullText: '正在加载'
  },
    push: {
        isLoading: false,
        loading: '../../image/common/pull_refresh.gif',
        pullText: '-上拉加载更多-'
    },
  },
  methods: {
    refresh(e) {
      this.triggerEvent("reloadList");
      this.setData({
          'pull.isLoading': true,
          'pull.pullText': '正在加载',
      })
      setTimeout(() => {
          this.setData({
            'pull.isLoading': false,
            'pull.pullText': '刷新完成'
          })
      }, 800)
  },
  toDownUrl(data){
    const url = data.currentTarget.dataset.url
    util.toViewUrl(url)
  },
  toload(e) {
      this.setData({
          'push.isLoading': true,
          'push.pullText': '正在加载',
      })
  },
    toDetail(item){
      const data = item.currentTarget.dataset.item
      if(data.order_state == 1){
        wx.navigateTo({
          url: "/pages/xqDetail/index?fromData="+JSON.stringify(data)
        })
      } else if(data.order_state == 2) {
        wx.navigateTo({
          url: "/pages/xqDetail1/index?fromData="+JSON.stringify(data)
        })
      } else if(data.order_state == 3||data.order_state == 4||data.order_state == 5||data.order_state == 6||data.order_state == 7||data.order_state == 0) {
        wx.navigateTo({
          url: "/pages/xqDetail2/index?fromData="+JSON.stringify(data)
        })
      }
    },
    toShowMore(){
      this.setData({
        more: true,
      })
    },
    onChange(e) {
      if (app.globalData.is_login) {
        this.setData({
          active: e.detail
        });
        wx.switchTab({
          url: this.data.list[e.detail].pagePath
        });
      } else {
        wx.showToast({
          title: '没有授权无法享受寻源服务~',
          icon: 'none',
          duration: 2000
        })
      }
    }
  }
})