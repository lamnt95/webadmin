import _ from "lodash"
import api from "./api"

function queryPromotions(params = {}) {
  const { page = 0, size = 20, checkedStatus = "APPROVE" } = params;
  const url = `/restaurant-cake-api/v1/admin/promotions?checkedStatus=${checkedStatus}&page=${page}&size=${size}`
  return api.get(url).then(({ data }) => data)
}

function getPromotion(promotionId) {
  const url1 = `/restaurant-cake-api/v1/admin/promotions?checkedStatus=APPROVE&page=0&size=10000`
  const url2 = `/restaurant-cake-api/v1/admin/promotions?checkedStatus=PENDING&page=0&size=10000`
  const urls = [url1, url2]
  return Promise.all(_.map(urls, i => api.get(i).then(({ data }) => data.content))).then(_.flatten)
    .then(res => _.head(_.filter(res, i => i.id == promotionId)) || {})
}

function createPromotion(body) {
  const url = `/restaurant-cake-api/v1/admin/promotions`
  return api.post(url, body).then(({ data }) => data)
}

function checkPromotion(id) {
  const url = `/restaurant-cake-api/v1/admin/promotions/check/${id}`
  return api.put(url).then(({ data }) => data)
}

function rejectPromotion(id) {
  const url = `/restaurant-cake-api/v1/admin/promotions/reject/${id}`
  return api.put(url).then(({ data }) => data)
}

function deletePromotion(id) {
  const url = `/restaurant-cake-api/v1/admin/promotions/${id}`
  return api.delete(url).then(({ data }) => data)
}

function updatePromotion(body = {}) {
  const { id } = body || {}
  const url = `/restaurant-cake-api/v1/admin/promotions/${id}`
  return api.put(url, body).then(({ data }) => data)
}

export default {
  queryPromotions,
  createPromotion,
  checkPromotion,
  rejectPromotion,
  updatePromotion,
  deletePromotion,
  getPromotion
}

