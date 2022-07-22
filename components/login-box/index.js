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
  data: {
    active: 1,
    listCopy:[]
  },
  methods: {
    toDetail(item){
      const data = item.currentTarget.dataset.item
      wx.navigateTo({
        url: "/pages/xqDetail3/index?fromData="+JSON.stringify(data)
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