import request from "./request";
//登录接口
export function getUsersApi(data) {
  return request({
    url: "/login",
    method: "post",
    data,
  });
}
//侧边栏
export function getCenianlanApi() {
  return request({
    url: "/menus",
    method: "get",
  });
}
//请求用户接口
export function getListApi(params) {
  return request({
    url: "/users",
    method: "GET",
    params,
  });
}
//请求添加用户接口
export function getuserslist(data) {
  return request({
    url: "/users",
    method: "POST",
    data,
  });
}
// 获取用户编辑接口
export function getbjApi(id, data) {
  return request({
    url: `users/${id}`,
    method: "PUT",
    data,
  });
}
//获取删除接口
export function getdelApi(id) {
  console.log(id);
  return request({
    url: `users/${id}`,
    method: "delete",
  });
}
//获取分配权限
export function getfpqxApi() {
  return request({
    url: "roles",
    method: "get",
  });
}
export function getqxApi(rid, id) {
  return request({
    url: `users/${id}/role`,
    method: "PUT",
    data: { rid },
  });
}
//修改状态
export function getxgApi(id, mg_state) {
  return request({
    url: `users/${id}/state/${mg_state}`,
    method: "PUT",
  });
}
//获取角色列表
export function getallApi() {
  return request({
    url: "roles",
    method: "GET",
  });
}
//获取添加接口
export function getlisApi(data) {
  return request({
    url: "roles",
    method: "post",
    data,
  });
}
//编辑角色接口请求
export function getjkApi(id, data) {
  return request({
    url: `roles/${id}`,
    method: "put",
    data,
  });
}
//获取角色删除接口
export function getdelelApi(id) {
  return request({
    url: `roles/${id}`,
    method: "delete",
  });
}
//获取权限接口
export function getqxsxApi(){
    return request({
        url:`rights/list`,
        method:"get"
    })
}
export function getqxsxsApi(){
    return request({
        url:`rights/tree`,
        method:"get"
    })
}
// 权限的分配管理
export function getsdfApi(rids,id){
    return request({
        url:`roles/${id}/rights`,
        method:"post",
        data:{rids}
    })
}
//删除分配权限管理
export function getdelsApi(roleId,rightId){
  console.log(roleId,rightId);
  return request({
    url:`roles/${roleId}/rights/${rightId}`,
    method:"delete",
  })
}
// 商品请求接口
export function getspApi(params){
  return request({
    url:"goods",
    method:"get",
    params
  })
}

export function getsjldApi(params){
  return request({
    url:"categories",
    method:"get",
    params
  })
}

export function getsssdApi(cat_id,sel){
  console.log(sel);
  return request({
    url:`categories/${cat_id}/attributes`,
    method:"GET",
    params:{sel}
  })
}
export function getimgdApi(){
  return request({
    url:"upload",
    method:"post",
  })
}
// 商品添加
export function getaddApi(data){
  console.log(data);
  return request({
    url:"goods",
    method:"post",
    data
  })
}
// 商品删除
export function getdelssApi(id){
  console.log(id);
  return request({
    url:`goods/${id}`,
    method:"delete",
  })
}
//商品分类
export function getflsApi(params){
  return request({
    url:"categories",
    method:"get",
    params
  })
}
//编辑
export function getbjsApi(id,data){
  return request({
    url:`categories/${id}`,
    method:"put",
    data
  })
}
export function getapApi(params){
  return request({
    url:`/categories`,
    method:"get",
    params
  })
}
export function getaipApi(data){
  return request({
    url:`/categories`,
    method:"post",
    data
  })
}
export function getgelscApi(id){
  return request({
    url:`categories/${id}`,
    method:"delete",
  })
}
// 编辑提交参数
export function getinputApi(id,attrId,data){
  return request({
    url:`categories/${id}/attributes/${attrId}`,
    method:"put",
    data
  })
}
// 删除参数
export function getdelinputApi(id,attrId){
  console.log(id,attrId);
  return request({
    url:`categories/${id}/attributes/${attrId}`,
    method:"delete",
  })
}
// 添加动态参数
export function getaddcsApi(id,data){
  return request({
    url:`categories/${id}/attributes`,
    method:"post",
    data
  })
}
export function getordersApi(params){
  return request({
    url:"orders",
    method:"get",
    params
  })
}
export function getreportsApi(){
  return request({
    url:"reports/type/1",
    method:"get",
  })
}