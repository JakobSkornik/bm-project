import { State } from '.'

export type GlobalContextType = {
  state: State
  actions: (
    field: string,
    val?: any
  ) => void
}
