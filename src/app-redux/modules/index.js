import demo,{
  types as demoTypes,
  actions as demoActions,
  selectors as demoSelectors,
  sagas as demoSagas,
} from "./demo";

export const types = {
  demo: demoTypes
}

export const actions = {
  demo: demoActions
}

export const selectors = {
  demo:demoSelectors
}

export const sagas = [...demoSagas]

export const reducers = {
  demo
}



