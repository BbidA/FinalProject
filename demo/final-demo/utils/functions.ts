interface GroundTruthFunction {
  domain: [number, number]
  range: [number, number]

  func(x: number): number
  dfFunc(x: number): number
}

export const quarticFunc1 = {
  domain: [-4.0, 4.0],
  range: [-50.0, 150.0],
  func: (x: number) => (x ** 2 - x * 4 + 4) * (x ** 2 + x * 4 + 2),
  dfFunc: (x: number) => 4 * (x - 2) * (x + 1 + Math.sqrt(2)) * (x + 1 - Math.sqrt(2))
} as GroundTruthFunction

export const quadraticFunc1 = {
  domain: [-4.0, 4.0],
  range: [-10, 20],
  func: (x: number) => x ** 2,
  dfFunc: (x: number) => 2 * x
} as GroundTruthFunction

export function gradientDescent(
  startX: number,
  startY: number,
  targetFunc: GroundTruthFunction,
  stepSize: number = 0.001,
  stopCondition: number = 0.0001
) {
  let [currX, currY] = [startX, startY]
  let lastStep = Infinity
  const path: [[number, number]] = [[currX, currY]]

  do {
    const deltaX = -targetFunc.dfFunc(currX) * stepSize

    currX += deltaX
    currY = targetFunc.func(currX)
    path.push([currX, currY])

    lastStep = Math.abs(deltaX)
  } while (lastStep > stopCondition)

  return path
}
