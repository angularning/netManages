
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyMap : {
      a: '物业单位名称',
      b: '所属社区',
      c: '物业管理情况',
      d: '是否失管',
      e: '是否引入停车场管理',
      f: '物管会联系人',
      g: '小区名称',
      h: '层数',
      i: '单元数',
      j: '人数',
      k: '建设年代',
      l: '产权单位',
      m: '单位性质',
    },
    houseData: {
      a: '北京市望京物业',
      b: '望京社区',
      c: '物业管理情况目前良好，有一大批人物业管理情况目前良好，有一大批人',
      d: '否',
      e: '是',
      f: '张希',
    },
    extralData: {
      g: '望京西园四区',
      h: '13',
      i: '2',
      j: '256',
      k: '22003',
      l: '产权单位',
      m: '单位性质',
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const data = JSON.parse(options.data)
    wx.setNavigationBarTitle({
      title: data
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