/**
 * @param {array} data 原始数据
 * @param {string} childKeyName 自定义子数据的key名称
 * @param {string} nameKey 作为控件title对应的字段
 */
function toTreeData(data, childKeyName = 'data', nameKey = 'org_name') {
  if(!data || !data.length) return []

  let parent = data.filter(item => item.parent === null)

  if(!parent.length) {
    let leastLevel = 0
    data.forEach((item, idx) => {
      if (idx===0) leastLevel = item.level
      else leastLevel = leastLevel > item.level ? item.level : leastLevel
    })
    parent = data.filter(item => item.level === leastLevel)
  }

  run(parent)
  function run(parent) {
    parent.map((parentItem) => {
      parentItem.value = '' + parentItem.id // 符合 a-select 数据格式
      parentItem.title = parentItem[nameKey]
      const child = data.filter(item => item.parent === parentItem.id)
      if (child.length) {
        parentItem[childKeyName] = child
        run(child)
      }
    })
  }
  return parent
}
export default toTreeData