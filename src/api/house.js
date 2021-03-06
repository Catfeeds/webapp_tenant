import request from '@/utils/request'
// POST
// /queryRoomList
// 查看房源列表
export function queryRoomList (data) {
  // let temp = JSON.parse(JSON.stringify(data))
  // Object.assign(temp, {role: 1})
  return request({
    url: '/queryRoomList',
    method: 'post',
    data
  })
}
// POST
// /common/queryRegion
// 获取区域
/*
id 区域编码
latitude 纬度
level 区域级别,1:省,2:市,3:区,4:街道
longitude 经度
name 区域名称
pid 父级区域编码
rows 展示页
startRow 当前页
*/
export function queryRegion (data) {
  return request({
    url: '/common/queryRegion',
    method: 'post',
    data
  })
}
// GET
// /common/querySubwayLine
// 获取地铁线路
export function querySubwayLine (cityId) {
  return request({
    url: '/common/querySubwayLine',
    method: 'get',
    params: {cityId}
  })
}
// GET
// /common/filterCondition
// 筛选条件
export function filterCondition () {
  return request({
    url: '/common/filterCondition',
    method: 'get'
  })
}
// POST
// /patSubwayLineQueryRoom
// 地铁线路找房
export function patSubwayLineQueryRoom (data) {
  return request({
    url: '/patSubwayLineQueryRoom',
    method: 'post',
    data
  })
}
// POST
// /patSubwayStationQueryRoom
// 地铁站点找房
export function patSubwayStationQueryRoom (data) {
  return request({
    url: '/patSubwayStationQueryRoom',
    method: 'post',
    data
  })
}

// POST
// /patQueryRoom
// 区域找房
export function patQueryRoom (data) {
  return request({
    url: '/patQueryRoom',
    method: 'post',
    data
  })
}
// POST
// /querRoomDetailList
// 查看房间信息
export function querRoomDetailList (roomId) {
  return request({
    url: '/querRoomDetailList',
    method: 'post',
    params: {roomId}
  })
}

// GET
// /saveUsersFavorite
// 用户收藏房源
export function saveUsersFavorite (roomId) {
  return request({
    url: '/saveUsersFavorite',
    method: 'get',
    params: {roomId}
  })
}
// GET
// /delUsersFavorite
// 用户取消收藏
export function delUsersFavorite (roomId) {
  return request({
    url: '/delUsersFavorite',
    method: 'get',
    params: {roomId}
  })
}
// GET
// /queryUsersFavorite
// 查询用户收藏房源列表
export function queryUsersFavorite (startRow, rows) {
  return request({
    url: '/queryUsersFavorite',
    method: 'get',
    params: {startRow, rows}
  })
}
