import { standardLogger } from "@/functions/commons/commons-utilities.logger.js"
export { getInteratable, elementGrouper, standardLogger }

function getInteratable(size) {
  return Array.from({ length: size }, (v, i) => i)
}

function elementGrouper(groupNameGetter) {
  return (grouped, element) => {
    const groupName = groupNameGetter(element)
    grouped[groupName] = grouped[groupName]
      ? grouped[groupName].concat([element])
      : [element]
    return grouped
  }
}
