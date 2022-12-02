import { ARROW_HEAD_TIP, ARROW_HEAD_BASE } from "@/functions/constants.json"

export { axisGuide, arrowHead, guidelineBoxes }

function axisGuide() {
  const base = [0, 0, 0]
  const xGuide = [base, [3, 0, 0]]
  const yGuide = [base, [0, 3, 0]]
  const zGuide = [base, [0, 0, 3]]

  const elements = [xGuide, yGuide, zGuide]
  return elements
}

function arrowHead() {
  const base = ARROW_HEAD_BASE
  const tip = ARROW_HEAD_TIP
  const arrowSide_1 = [base[0], base[1], tip]
  const arrowSide_2 = [base[1], base[2], tip]
  const arrowSide_3 = [base[2], base[3], tip]
  const arrowSide_4 = [base[3], base[0], tip]

  const elements = [base, arrowSide_1, arrowSide_2, arrowSide_3, arrowSide_4]
  return elements
}

function guidelineBoxes([x, y, z]) {
  const xyGuide = [
    [x, 0, 0],
    [x, y, 0],
    [x, y, z],
    [x, y, 0],
    [0, y, 0],
  ]
  const xyzGuide = [
    [0, 0, z],
    [0, y, z],
    [x, y, z],
    [0, y, z],
    [0, y, 0],
  ]
  return [xyGuide, xyzGuide]
}
