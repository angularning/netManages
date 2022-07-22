// pages/scan/index.js
const app = getApp();
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min');
var qqmapsdk;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formData: [
      {
        id: 'name',
        label: '姓名',
        type: 'input',
        isRequire: true,
        placeholder: '请输入姓名',
        visible: false,
        value: '小王',
        reg: /^[1][3,4,5,7,8][0-9]{9}$/,
        max: 10,
        min: 2
      },
      {
        id: 'phone',
        label: '联系方式',
        type: 'input',
        limitType: 'digit',
        isRequire: true,
        placeholder: '请输入11位有效手机号',
        value: '1581123888',
        reg: /^[1][3,4,5,7,8][0-9]{9}$/,
        max: 11,
        min: 2
      },
      {
        id: 'idcard',
        label: '身份证类型',
        type: 'select',
        isRequire: true,
        visible: false,
        placeholder: '',
        children: [
          {
            id: '1',
            label: '身份证',
            value: '身份证'
          },
          {
            id: '2',
            label: '驾驶证',
            value: '驾驶证'
          },
          {
            id: '3',
            key: '港澳台通行证',
            value: '港澳台通行证'
          },
        ],
        value: '身份证',
        reg: '',
        max: 20,
        min: 2
      },
      {
        id:"cardnum",
        label: '证件号码',
        type: 'input',
        isRequire: true,
        placeholder: '请输入证件号码',
        value: '',
        reg: '',
        max: 20,
        min: 2
      },
      {
        id: 'home',
        label: '出入类型',
        type: 'radio',
        isRequire: true,
        placeholder: '请输入证件号码',
        value: '常驻',
        reg: '',
        children: [
          {
            id: '1',
            label: '常驻',
            value: '常驻',
          },
          {
            id: '2',
            label: '租住',
            value: '租住',
          },
        ],
        max: 20,
        min: 2
      },
      {
        id: 'gender',
        label: '性别',
        type: 'radio',
        isRequire: true,
        placeholder: '请选择性别',
        value: '男',
        reg: '',
        children: [
          {
            id: '1',
            label: '男',
            value: '男',
          },
          {
            id: '2',
            label: '女',
            value: '女',
          },
        ],
        max: 20,
        min: 2
      },
      {
        id: 'idaddress',
        label: '户籍',
        type: 'radio',
        isRequire: true,
        placeholder: '请选择户籍',
        value: '户籍人口',
        reg: '',
        children: [
          {
            id: '1',
            label: '户籍人口',
            value: '户籍人口',
          },
          {
            id: '2',
            label: '非户籍人口',
            value: '非户籍人口',
          },
        ],
        max: 20,
        min: 2
      },
      {
        id: 'location',
        label: '现居住地址',
        type: 'input',
        isRequire: true,
        placeholder: '请输入地址',
        useLocation: true,
        hasIcon: true,
        iconName: 'location-o',
        single: false, // 默认多行，主要区分与子节点是否单行
        children: [
          {
            id: 'building',
            label: '楼号',
            type: 'input',
            isRequire: true,
            placeholder: '楼号',
            value: '',
            reg: '',
            max: 20,
            min: 2
          },
          {
            id: 'unit',
            label: '单元',
            type: 'input',
            isRequire: false,
            placeholder: '单元',
            value: '',
            reg: '',
            max: 20,
            min: 2
          },
          {
            id: 'room',
            label: '室',
            type: 'input',
            isRequire: false,
            placeholder: '室',
            value: '',
            reg: '',
            max: 20,
            min: 2
          },
        ],
        value: '',
        reg: '',
        max: 20,
        min: 2
      },
      {
        id: 'community',
        label: '所属社区',
        type: 'input',
        isRequire: true,
        placeholder: '请输入社区名称',
        value: '',
        reg: '',
        max: 20,
        min: 2
      },
    ],
    // 存储页面的状态
    pageData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 使用定位
    qqmapsdk = new QQMapWX({
      key: 'VCQBZ-DW6WU-CLUVW-BMDPH-EESX3-GIBO5'
    });
  },

  /**
   * 
   * 点击获取定位
   */
  
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        console.log('res', res)
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        console.log(JSON.stringify(res));
        let province = res.result.ad_info.province
        let city = res.result.ad_info.city
        vm.setData({
          province: province,
          city: city,
          address: res.result.address,
          latitude: latitude,
          longitude: longitude
        })
        const formData = vm.data.formData
        formData.forEach(item => {
          if(item.id === 'location'){
            item.value = res.result.address
          }
        })
        vm.setData({
          formData
        })
        console.log('formData', formData);
 
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },

  /**
   * 点击Picker，通过不同的id区分点击哪个，做控制显示隐藏
   */
  changePickerPopup(data) {
    const item = data.currentTarget.dataset.item
    const pageData = this.data.pageData
    console.log('pageData', pageData);
    pageData[item.id].visible = !pageData[item.id].visible
    this.setData({
      pageData
    })
  },
  /**
   * 关闭操作 select，通过不同的id区分点击哪个，做控制显示隐藏
   */
  onCloseSelect(data) {
    const item = data.currentTarget.dataset.item
    const pageData = this.data.pageData
    pageData[item.id]['visible'] = !pageData[item.id]['visible']
    this.setData({
      pageData
    })
  },
  /**
   * 确定 select，通过不同的id区分点击哪个
   * 设置选中值，关闭pop框
   */
  onConfirmSelect(data) {
    const { value } = data.detail;
    const item = data.currentTarget.dataset.item
    const pageData = this.data.pageData
    pageData[item.id]['visible'] = !pageData[item.id]['visible']
    pageData[item.id]['value'] = value
    this.setData({
      pageData
    })
  },

  
  /**
   * 确定 radio值，通过不同的id区分点击哪个
   * 设置选中值，关闭pop框
   */
  onChangeRadio(data) {
    const item = data.currentTarget.dataset.item
    if(item.type === 'radio'){
      const pageData = this.data.pageData
      console.log('pageData', pageData);
      pageData[item.id]['value'] = data.detail
      console.log('this,pageData', this.data.pageData);
      this.setData({
        pageData
      })
    }
  },
  /**
   * data: 子元素
   * 处理返回值的类型
   */
  filterChildren(data, type) {
    if(type === 'select'){
      return data && data.map(item => item.value)
    } else {
      return data
    }
  },

  /**
   * 提交表单
   */
  submitForm(data){
    // 修改之后值
    const changeData = data.detail.value
    // 绑定的值
    // console.log('changeValue', data.detail.value);
    // console.log('pageData', this.data.pageData);
    const pageData = this.data.pageData
    for(let key in pageData){
      if(changeData.hasOwnProperty(key)){
        pageData[key] = changeData[key]
      }
      if(typeof pageData[key] !== 'object'){
        pageData[key] = {
          value: pageData[key],
          visibel: true
        }
      }
    }
    console.log('修改之后', pageData);
    // 必填校验
    this.data.formData.forEach(item => {
      if(item.isRequire){
        if(!pageData[item.id]['value']){
          wx.showToast({
            title: `请填写${item.label}`,
            icon: 'none'
          })
          return
        }
      }
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
    // 获取定位
    // this.getUserLocation()
    // 控制picker的值
    const pageData = {}
    this.data.formData.map(item => {
      pageData[item.id] = {
        visible: false,
        value: item.value
      }
      if(item.children && item.children.length > 0 && item.type === 'input'){
         item.children.map(it => {
          pageData[it.id] = {
            visible: false,
            value: it.value
          }
         })
      }
    })
    this.setData({
      pageData
    })
    console.log('show::pageData', pageData);
    // 处理formData
    const formData = this.data.formData.map(item => {
      return {
        ...item,
        children: this.filterChildren(item.children,item.type )
      }
    })
    this.setData({
      formData
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