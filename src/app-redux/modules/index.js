import demo, {
  types as demoTypes,
  actions as demoActions,
  selectors as demoSelectors,
  sagas as demoSagas,
} from "./demo";

import auth, {
  types as authTypes,
  actions as authActions,
  selectors as authSelectors,
  sagas as authSagas,
} from "./auth";

export const types = {
  demo: demoTypes,
  auth: authTypes
}

export const actions = {
  demo: demoActions,
  auth: authActions
}

export const selectors = {
  demo: demoSelectors,
  auth: authSelectors
}

export const sagas = [...demoSagas, ...authSagas]

export const reducers = {
  demo,
  auth
}



