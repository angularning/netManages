
import api from '../../utils/request'

/** 获取首页数据 */
export async function fetchIndexBanner(param) {
 const { data } = await api.post('/wisdom-community-api/bannerInfo/list', param)
  return data.body
}

// 首页动态模块
export async function fetchHomeList(param) {
  const { data } = await api.post('/wisdom-community-api/modelInfo/list', param)
  return data
}

// 首页通知模块
export async function fetchNotice(param) {
  const { data } = await api.post('/wisdom-community-api/messageInfo/list', param)
  return data
}

// 扫码初始化数据
export async function fetchScanData(param) {
  const { data } = await api.postObj('/wisdom-community-api/userInfoInputModel/populationInputModel', param)
  return data
}

// 扫码保存数据
export async function saveScanData(param) {
  const { data } = await api.post('/wisdom-community-api/messageInfo/list', param)
  return data
}
// 扫码修改数据

export async function patchScanData(param) {
  const { data } = await api.post('/wisdom-community-api/messageInfo/list', param)
  return data
}