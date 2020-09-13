import _ from "lodash"
import api from "./api"

function queryPostIntro(params = {}) {
  const { page = 0, size = 20, checkedStatus = "APPROVE" } = params;
  const url = `/restaurant-cake-api/v1/admin/post-intro?checkedStatus=${checkedStatus}&page=${page}&size=${size}`
  return api.get(url).then(({ data }) => data)
}

function createPostIntro(body) {
  const url = `/restaurant-cake-api/v1/admin/post-intro`
  return api.post(url, body).then(({ data }) => data)
}

function checkPostIntro(id) {
  const url = `/restaurant-cake-api/v1/admin/post-intro/check/${id}`
  return api.put(url).then(({ data }) => data)
}

function rejectPostIntro(id) {
  const url = `/restaurant-cake-api/v1/admin/post-intro/reject/${id}`
  return api.put(url).then(({ data }) => data)
}

function updatePostIntro(postIntro = {}) {
  const { id } = postIntro;
  const url = `/restaurant-cake-api/v1/admin/post-intro/${id}`
  return queryPostIntro().then(postIntroLatest => {
    const body = { ...postIntroLatest, ...postIntro };
    return api.put(url, body).then(({ data }) => data)
  })
}


export default {
  queryPostIntro,
  createPostIntro,
  checkPostIntro,
  rejectPostIntro,
  updatePostIntro,
}

