import _ from "lodash";
import Immutable from "seamless-immutable";
import { put, takeLatest } from "redux-saga/effects";

export const types = {
  DEMO_START: "DEMO/DEMO_START",
  DEMO_SUCCESS: "DEMO/DEMO_SUCCESS",
  DEMO_FAIL: "DEMO/DEMO_FAIL",
};

export const actions = {
  demoStart: (payload, meta) => ({
    type: types.DEMO_START,
    payload,
    meta,
  }),
  demoSuccess: (payload, meta) => ({
    type: types.DEMO_SUCCESS,
    payload,
    meta,
  }),
  demoFail: (error, meta) => ({
    type: types.DEMO_FAIL,
    error,
    meta,
  }),
};

const getDemo = (state) => _.get(state, "demo");

export const selectors = {
  getDemo,
};

export const initState = {
};

export default function (state = initState, action) {
  const { type, payload, meta } = action;
  const { demo } = payload || {};
  if (_.isUndefined(demo) || _.isNull(demo)) return state;
  const { clear } = meta || {};
  if (clear) return Immutable.from(demo);
  return Immutable.merge(state, demo, { deep: true });
}

function* demoSaga() {
  yield takeLatest(types.DEMO_START, function* (
    action
  ) {
    try {
      yield put(actions.demoSuccess({ demo: "success" }));
    } catch (error) {
      yield put(actions.demoFail(error));
    }
  });
}

export const sagas = [demoSaga];
