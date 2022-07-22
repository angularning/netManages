const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}
const formateXyTime = date =>{
  if (!date) {
    return
  }
  const nowDate = (new Date()).getTime()
  const times = (new Date(date)).getTime()
  console.log(times - nowDate)
  return times - nowDate
  // const t = date.split('T')
  // return t[0] + ' ' + t[1].split('.')[0]
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
const debounce = function (fn, wait){
  let timer = null;
  return () =>{
    clearTimeout(timer)
    timer = setTimeout(()=>{
       fn.call(this, arguments)
    },wait)
  }
}
const toViewUrl = (url)=>{
  console.log(url)
  const fileName = url.substring(url.indexOf('cn/')+3,url.length)
  wx.downloadFile({
    url: url,
    filePath: wx.env.USER_DATA_PATH + "/" + fileName,
    success: function (res) {
      const filePath = res.filePath
      wx.openDocument({
        showMenu: true,
        filePath: filePath,
        success: function (res) {
          console.log('打开文档成功', res)
        },
        fail: function (res) {
          wx.showToast({title: '打开文档失败', icon: 'none', duration: 2000})
        },
      })
    }
  })
  // wx.downloadFile({
  //   url: url, 
  //   filePath: wx.env.USER_DATA_PATH + "/" + fileName,
  //   success (ress) {
  //     console.log(ress)
  //     var filePath = ress.tempFilePath;
  //           wx.openDocument({
  //             showMenu: true,
  //               filePath: filePath,
  //               success: function(res) {
  //               },
  //               fail: function(res) {
  //                   console.log(res);
  //               },
  //               complete: function(res) {
  //                   console.log(res);
  //               }
  //           })
  //   }
  //   })
}
module.exports = {
  formatTime,
  formateXyTime,
  debounce,
  toViewUrl
}
