/**
 * 微前端配置
 * @attribute { string } name[必填] 该项目名称
 * @attribute { boolean } http 是否需要网络请求模块
 * @attribute { boolean } store 是否需要公共 store 模块
 * @attribute { string } prefix 路由前缀
 * @attribute { string | string[] } path 路由
 * @attribute { string } main 入口文件，将在打包时自动填充
 */
module.exports = {
  name: '{{projectName}}',
  http: true,
  store: true,
  prefix: '/micro'
}
