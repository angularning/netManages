Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    list: [
      {
        building: '1号楼',
        unit: ['1单元', '2单元', '3单元', '4单元', '5单元'],
        room: ['101', '102', '103','101', '102', '103','101', '102', '103','101', '102', '103','102', '103','101', '102', '103','101', '102', '103','101', '102', '103','102', '103','101', '102', '103','101', '102', '103','101', '102', '103','102', '103','101', '102', '103','101', '102', '103','101', '102', '103','102', '103','101', '102', '103','101', '102', '103','101', '102', '103','102', '103','101', '102', '103','101', '102', '103','101', '102', '103',]
      },
      {
        building: '2号楼',
        unit: ['1单元'],
        room: ['201', '102', '103','101', '102', '103','101', '102', '103','101', '102', '103',]
      },
      {
        building: '3号楼',
        unit: ['1单元'],
        room: ['301',]
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const data = JSON.parse(options.data)
    this.setData({
      data
    })
  },

  onChange(event){
    this.setData({
      activeKey: event.detail
    })
  },
  toHousehold(event){
    const item = event.currentTarget.dataset.item
    console.log(item);
    wx.navigateTo({
      url: `/pages/household/index?data=${JSON.stringify(item)}`,
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