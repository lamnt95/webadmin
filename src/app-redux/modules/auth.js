import _ from "lodash";
import Immutable from "seamless-immutable";
import { put, takeLatest, select } from "redux-saga/effects";
import api from "../../api"

export const types = {
  LOGIN_START: "AUTH/LOGIN_START",
  LOGIN_SUCCESS: "AUTH/LOGIN_SUCCESS",
  LOGIN_FAIL: "AUTH/LOGIN_FAIL",

  LOGOUT_START: "AUTH/LOGOUT_START",
  LOGOUT_SUCCESS: "AUTH/LOGOUT_SUCCESS",
  LOGOUT_FAIL: "AUTH/LOGOUT_FAIL",
};

export const actions = {
  loginStart: (payload, meta) => ({
    type: types.LOGIN_START,
    payload,
    meta,
  }),
  loginSuccess: (payload, meta) => ({
    type: types.LOGIN_SUCCESS,
    payload,
    meta,
  }),
  loginFail: (error, meta) => ({
    type: types.LOGIN_FAIL,
    error,
    meta,
  }),

  logoutStart: (payload, meta) => ({
    type: types.LOGOUT_START,
    payload,
    meta,
  }),
  logoutSuccess: (payload, meta) => ({
    type: types.LOGOUT_SUCCESS,
    payload,
    meta,
  }),
  logoutFail: (error, meta) => ({
    type: types.LOGOUT_FAIL,
    error,
    meta,
  }),
};

const getAuth = (state) => _.get(state, "auth");
const getAccessToken = (state) => _.get(state, "auth.accessToken");
const getAccessUser = (state) => _.get(state, "auth.username");

export const selectors = {
  getAuth,
  getAccessToken,
  getAccessUser
};

export const initState = {
  accessToken: undefined,
  username: undefined
};

export default function (state = initState, action) {
  const { type, payload, meta } = action;
  const { auth } = payload || {};
  if (_.isUndefined(auth) || _.isNull(auth)) return state;
  const { clear } = meta || {};
  if (clear) return Immutable.from(auth);
  return Immutable.merge(state, auth, { deep: true });
}

function* loginSaga() {
  yield takeLatest(types.LOGIN_START, function* (
    action
  ) {
    const { payload, meta } = action || {}
    const { onSuccess } = meta || {}
    const { username, password, accessToken } = payload || {}
    try {
      const auth = yield api.login(username, password, accessToken);
      yield put(actions.loginSuccess({ auth }));
      onSuccess({ auth });
    } catch (error) {
      yield put(actions.loginFail(error));
    }
  });
}

function* logoutSaga() {
  yield takeLatest(types.LOGOUT_START, function* (
    action
  ) {
    const { payload, meta } = action || {}
    const { onSuccess } = meta || {}
    try {
      const state = yield select();
      const accessToken = getAccessToken(state);
      yield api.logout(accessToken);
      yield put(actions.logoutSuccess({ auth: {} }, { clear: true }));
      onSuccess();
    } catch (error) {
      yield put(actions.logoutFail(error));
    }
  });
}

export const sagas = [loginSaga, logoutSaga];
