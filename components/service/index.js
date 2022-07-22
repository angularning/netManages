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
  },
  methods: {
    toTel(){
      wx.makePhoneCall({
        phoneNumber: '13795474866',
      })
    },
  },
})