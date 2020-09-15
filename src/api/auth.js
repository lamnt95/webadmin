import _ from "lodash"
import api from "./api"

function login(username, password, accessToken) {
  const url = "/restaurant-cake-api/v1/auth/signin";
  return api.post(url, { username, password }).then(res => ({
    accessToken: _.get(res, "data.type") + " " + _.get(res, "data.token"),
    username: _.get(res, "data.username")
  }))
}

function logout(accessToken) {
  return Promise.resolve({});
}

export default {
  login,
  logout
}