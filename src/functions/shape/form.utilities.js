import { joinPath, disectionGrouper } from "./shape.utilities"
export { create3DForm }

function create3DForm(vertices) {
  const perpendicularAxes = ["z-axis", "y-axis", "x-axis"]
  const disectedFacesGroups = perpendicularAxes.map((perpendicularAxis) => {
    const faces = Object.values(disectionGrouper(vertices, perpendicularAxis))
    return faces.map((face) => joinPath(face, perpendicularAxis))
  })
  return disectedFacesGroups.flat()
}
