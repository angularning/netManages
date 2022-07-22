// pages/personApprove/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: false,
    personData: {
      name: {
        name: '姓名',
        value: '王小龙龙'
      },
      idcard: {
        name: '身份证',
        value: '4127211****22012'
      },
      address: {
        name: '地址',
        value: '北京市朝阳区望京西园102号楼'
      },
      phone: {
        name: '电话',
        value: 1677223123
      },
      status: {
        name: '状态',
        value: '未审核'
      }
    },
    list: [
      {
        name: '王小龙龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王龙',
        idcard: '4127211****22012',
        status: '已审核'
      },
      {
        name: '王小',
        idcard: '4127211****22012',
        status: '已审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
      {
        name: '王小龙',
        idcard: '4127211****22012',
        status: '未审核'
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  // 关闭
  onClose() {
    this.setData({
      show : false
    })
  },
  check() {
    this.setData({
      show : !this.data.show
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})