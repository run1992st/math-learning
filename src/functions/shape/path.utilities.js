import { elementGrouper } from "@/functions/commons-utilities.js"
import { AXIS_JOINER_ENUM } from "../constants.json"

export { joinPath }

function joinPath(face, axisName) {
  const pathBuilder = createPathBuilder({
    pierceThroughAxis: axisName,
  })
  return pathBuilder(face)
}

function createPathBuilder(
  { pierceThroughAxis } = { pierceThroughAxis: "x-axis" }
) {
  return (points) => {
    const pointGrouper = elementGrouper(getPointGroupName(pierceThroughAxis))
    const subPaths = points.reduce(pointGrouper, {})
    const path = subPathFlatJoin(subPaths, AXIS_JOINER_ENUM[pierceThroughAxis])
    return path
  }
}

function subPathFlatJoin(subPaths, pierceAxisindex) {
  const pathsGroups = Object.values(subPaths)
  const sortedInner = pathsGroups.map((group, groupIndex, allGroup) => {
    const sorter = pathSorterBuilder(
      pierceAxisindex,
      groupIndex > 0 ? allGroup[groupIndex - 1] : null
    )
    return group.sort(sorter)
  })
  const flattedPath = sortedInner.flat()
  return flattedPath
}

function pathSorterBuilder(pierceAxisindex, referencePath) {
  return pathSorter
  function pathSorter(pointA, pointB) {
    return (
      (referencePath
        ? referencePath[referencePath.length - 1][pierceAxisindex]
        : 0) -
      pointA[pierceAxisindex] -
      pointB[pierceAxisindex]
    )
  }
}

function getPointGroupName(axisName) {
  return (element) => element[AXIS_JOINER_ENUM[axisName]]
}
