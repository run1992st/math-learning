import { joinPath } from "./path.utilities.js"
import { AXIS_ENUM } from "../constants.json"

export { disectionGrouper, joinPath }

function disectionGrouper(points, axisName) {
  return points.reduce(disectedGrouper(axisName), {})
}

function disectedGrouper(axisName) {
  const faceDisectIndex = AXIS_ENUM[axisName]
  return faceGrouper
  function faceGrouper(grouped, point) {
    grouped[point[faceDisectIndex]] = grouped[point[faceDisectIndex]]
      ? grouped[point[faceDisectIndex]].concat([point])
      : [point]
    return grouped
  }
}
