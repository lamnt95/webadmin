import _ from "lodash";
import { all, spawn } from "redux-saga/effects";
import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import { sagas, reducers, actions, selectors } from "./modules";
import middlewares from "./middlewares";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

function* rootSaga() {
  yield all(_.map(sagas, (saga) => spawn(saga)));
}

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers(reducers)
);

export function makeStore() {
  const initialState = {};
  const sagaMiddleware = createSagaMiddleware();
  const middlewareList = [...middlewares, sagaMiddleware];
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewareList))
  );
  let persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  store.persistor = persistor;
  return store;
}

export { actions, selectors };
