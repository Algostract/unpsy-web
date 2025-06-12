import { CountScale, PairScale, AverageScale, SumScale, ShiftScale, SingleScale, SingleWeightedScale } from './factory'
import { CompositeFunctions, Scales } from './type'

// "JEPQ" | "DSMD"
export type ScaleName = 'MACI' | 'MCMI-3' | 'TCI' | 'MPQ' | 'EPQ' | 'JTCI' | 'EPQ-R' | 'MMPI-RF' | 'SCL-90R' | 'DSMD-C' | 'DSMD-A'
// | "DSMD-C"

export type ScaleType = 'binary' | 'pentanary'

function BinaryCalculate(scale: ScaleName, data: { index: number; value: boolean }[]) {
  const result: { name: string; score: number }[] = []

  for (const SubScaleName in Scales[scale]) {
    try {
      // @ts-expect-error scale name selected
      const SubScaleMeta = Scales[scale][SubScaleName]
      let SubScale: SingleScale | SingleWeightedScale | PairScale | ShiftScale | CountScale

      switch (SubScaleMeta.type) {
        case 'single':
          SubScale = new SingleScale(SubScaleMeta.items.T, SubScaleMeta.items.F)
          break
        case 'single-weighted':
          SubScale = new SingleWeightedScale(SubScaleMeta.items)
          break
        case 'pair':
          SubScale = new PairScale({ ...SubScaleMeta.items }, SubScaleMeta.bias)
          break
        case 'shift':
          SubScale = new ShiftScale()
          break
        case 'count':
          SubScale = new CountScale(SubScaleMeta.start, SubScaleMeta.count)
          break
        default:
          SubScale = new SingleScale(SubScaleMeta.items.T, SubScaleMeta.items.F)
      }

      result.push({ name: SubScaleName, score: SubScale.score(data) })
    } catch (error) {
      console.error(`Error in Scale ${scale}, Subscale ${SubScaleName}`, error)
    }
  }

  return result.reduce((a, v) => ({ ...a, [v.name]: v.score }), {})
}

function PentanaryCalculate(scale: ScaleName, data: { index: number; value: number }[]) {
  const result: { name: string; score: number }[] = []

  for (const SubScaleName in Scales[scale]) {
    // @ts-expect-error scale name selected
    const SubScaleMeta = Scales[scale][SubScaleName]
    let SubScale: AverageScale | SumScale | CountScale

    switch (SubScaleMeta.type) {
      case 'average':
        if (typeof SubScaleMeta.weight === 'number') SubScale = new AverageScale(SubScaleMeta.items, SubScaleMeta.weight)
        else SubScale = new AverageScale(SubScaleMeta.items, result.find((scale) => scale === SubScaleMeta.weight)?.score ?? 0)
        break
      case 'sum':
        SubScale = new SumScale(SubScaleMeta.items)
        break
      case 'count':
        SubScale = new CountScale(SubScaleMeta.start, SubScaleMeta.count, SubScaleMeta.label, SubScaleMeta.inverse)
        break
      default:
        SubScale = new CountScale(SubScaleMeta.start, SubScaleMeta.count, SubScaleMeta.label, SubScaleMeta.inverse)
    }

    result.push({ name: SubScaleName, score: SubScale.score(data) })
  }

  if (scale in CompositeFunctions) {
    const composite = CompositeFunctions as Record<ScaleName, (result: { name: string; score: number }[]) => { name: string; score: number }[]>
    result.push(...composite[scale]!(result))
  }
  return result.reduce((a, v) => ({ ...a, [v.name]: v.score }), {})
}

export { BinaryCalculate, PentanaryCalculate }
