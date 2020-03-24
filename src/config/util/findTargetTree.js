export default function findTargetTree(list, farm) {
  const targetList = list.filter(item => item.id === farm)
  if (!targetList.length) return []
  const target = targetList[0]
  const resultList = [target]
  find(target)
  function find(target) {
    const parent = list.filter(item => item.id === target.parent)
    if (parent.length) {
      resultList.push(parent[0])
      find(parent[0])
    }
  }
  return resultList.reverse()
}
