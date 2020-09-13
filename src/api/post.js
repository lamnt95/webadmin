import _ from "lodash"
import api from "./api"

function queryPost(params = {}) {
  const { page = 0, size = 20, checkedStatus = "APPROVE" } = params;
  const url = `/restaurant-cake-api/v1/admin/useful-information?checkedStatus=${checkedStatus}&page=${page}&size=${size}`
  return api.get(url).then(({ data }) => data)
}

function createPost(body) {
  const url = `/restaurant-cake-api/v1/admin/useful-information`
  return api.post(url, body).then(({ data }) => data)
}

function checkPost(id) {
  const url = `/restaurant-cake-api/v1/admin/useful-information/check/${id}`
  return api.put(url).then(({ data }) => data)
}

function rejectPost(id) {
  const url = `/restaurant-cake-api/v1/admin/useful-information/reject/${id}`
  return api.put(url).then(({ data }) => data)
}

function deletePost(id) {
  const url = `/restaurant-cake-api/v1/admin/useful-information/${id}`
  return api.delete(url)
}

function updatePost(postIntro = {}) {
  const { id } = postIntro;
  const url = `/restaurant-cake-api/v1/admin/useful-information/${id}`
  return queryPost().then(({ content }) => _.head(_.filter(content, i => i.id == id) || []) || {}).then(postIntroLatest => {
    const body = { ...postIntroLatest, ...postIntro };
    return api.put(url, body).then(({ data }) => data)
  })
}


export default {
  queryPost,
  createPost,
  checkPost,
  rejectPost,
  updatePost,
  deletePost
}

