// pages/community/index.js
const testData2 = [
  {
    name: '天通苑社区',
    people: 988212,
    phone: '0987-6826334',
    concat: '齐文天',
    num1: '10002',
    num2: '877433',
  },
  {
    name: '天通苑社区天通苑社区天通苑社区',
    people: 988212,
    phone: '0987-6826334',
    concat: '齐文天',
    num1: '1111',
    num2: '999999',
  },
]
const testData1 = [
  {
    name: '南湖中园',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
  {
    name: '22',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
  {
    name: '333',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
  {
    name: '444',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
  {
    name: '555',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
  {
    name: '南湖中园',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
  {
    name: '南湖中园',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
  {
    name: '南湖中园',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
  {
    name: '南湖中园',
    people: 10009,
    phone: '1581123111',
    concat: '小张',
    num1: '990',
    num2: '3000',
  },
]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    communityList: [
      {
        name: '望京社区',
        concat: '张老师',
        phone: 1581123433,
        time: '早9：00~晚18：00',
      },
      {
        name: '溪流社区',
        concat: '张老师',
        phone: 1581122333,
        time: '早9：00~晚18：00',
      },
      {
        name: '望京社区3',
        concat: '张老师',
        phone: 158112333,
        time: '早9：00~晚18：00',
      },
    ],
    housingList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  // 社区滚动
  changeSwiper(event){
    this.setData({
      loading: true
    })
    if(event.detail.source === 'touch' && event.detail.current === 1){
      setTimeout(() => {
        this.setData({
          housingList: testData2,
          loading: false
        })
      }, 500)
    } else {
      setTimeout(() => {
        this.setData({
          housingList: testData1,
          loading: false
        })
      }, 500)
    }
  },

  // toBuilding 跳转小区
  toBuilding(item) {
    console.log('item', item);
    const data = item.currentTarget.dataset.item
    wx.navigateTo({
      url: `/pages/building/index?data=${JSON.stringify(data)}`,
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
    this.setData({
      housingList: testData1
    })
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