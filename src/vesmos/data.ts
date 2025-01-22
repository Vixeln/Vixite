// import type { GraphingCalculatorState } from "./desmos/desmos"
import type * as Schema from "json-schema"
import type { CalculatorState } from "./desmos/desmos"

import pendulumState from "@/data/desmosGraphs/pendulum.json" with {type: "json"}
import threeDRendererState from "@/data/desmosGraphs/threeDRenderer.json" with {type: "json"}
import collisionsState from "@/data/desmosGraphs/collisions.json" with {type: "json"}

export type CalculatorData = {
  name: string
  url: URL
  type: CalculatorType
  path: Path
  state: CalculatorState
}

// type Values<Type> = Type[keyof Type]

// type ToNumber<
//   Count extends number,
//   Accumulant extends number = never,
//   Arr extends null[] = []
// > =
//   Arr["length"] extends Count ?
//     Accumulant | Count
//     : ToNumber<
//       Count,
//       Accumulant | Arr["length"],
//       [...Arr, null]
//     >
// type Range<
//   Start extends number,
//   End extends number,
//   InclusiveStart extends boolean = true,
//   InclusiveEnd extends boolean = true
// > =
//   Exclude<
//     Exclude<
//       ToNumber<End>,
//       ToNumber<Start>
//     > | (InclusiveStart extends true ? Start : never),
//     InclusiveEnd extends false ? End : never
//   >

// type B = Range<22, 65, false, false>

export const calculatorTypes = {
  fourFunction: "fourFunction",
  scientific: "scientific",
  geometryGraph: "geometryGraph",
  graph2d: "graph2D",
  graph3d: "graph3D"
} as const

// type CalculatorType = Values<typeof calculatorTypes>
export type CalculatorType = (typeof calculatorTypes)[keyof typeof calculatorTypes]

// export type CalculatorType = "fourFunction" | "scientific" | "geometryGraph" | "2DGraph" | "3DGraph"

type Path = string;

const calculatorDataJSON: Schema.JSONSchema4Object[] = [
  {
    name: "Pendulum",
    url: 'https://www.desmos.com/calculator/taapoqspsc', //links to original remote graph
    type: calculatorTypes.graph2d,
    path: "@/data/desmosGraphs/pendulum.json", // can't be used yet
    state: pendulumState as unknown as Schema.JSONSchema4Object
  },
  {
    name: "3D Renderer",
    url: 'https://www.desmos.com/calculator/mhwcxkr2mx',
    type: calculatorTypes.graph2d,
    path: "@/data/desmosGraphs/threeDRenderer.json",
    state: threeDRendererState as unknown as Schema.JSONSchema4Object

  },
  {
    name: "Collisions",
    url: 'https://www.desmos.com/3d/5f52e44619',
    type: calculatorTypes.graph3d,
    path: "@/data/desmosGraphs/threeDRenderer.json",
    state: collisionsState as unknown as Schema.JSONSchema4Object
  }
] as const

function parseInputData(input: Schema.JSONSchema4Object): CalculatorData {
  const { name, url, path, type, state } = input

  const outputUrl = URL.parse(url?.toString() ?? "") as URL
  if (outputUrl === null) throw new Error("Invalid URL");

  const outputType = type as CalculatorType

  return {
    name: name?.toString() ?? "",
    url: outputUrl,
    type: outputType,
    path: path?.toString() ?? "",
    state: state as unknown as CalculatorState
  }
}



export default calculatorDataJSON.map(graphDatum => parseInputData(graphDatum))
