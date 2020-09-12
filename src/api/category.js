import _ from "lodash"
import api from "./api"

function queryCategory(params = {}) {
  const { page = 0, size = 20, checkedStatus = "APPROVE" } = params;
  const url = `/restaurant-cake-api/v1/admin/categories?checkedStatus=${checkedStatus}&page=${page}&size=${size}`
  return api.get(url).then(({ data }) => data)
}

function createCategory(body) {
  const url = `/restaurant-cake-api/v1/admin/categories`
  return api.post(url, body).then(({ data }) => data)
}

function checkCategory(id) {
  const url = `/restaurant-cake-api/v1/admin/categories/check/${id}`
  return api.put(url).then(({ data }) => data)
}

function rejecyCategory(id) {
  const url = `/restaurant-cake-api/v1/admin/categories/reject/${id}`
  return api.put(url).then(({ data }) => data)
}

function getCategory(id) {
  const url = `/restaurant-cake-api/v1/admin/categories/${id}`
  return api.get(url).then(({ data }) => data)
}

function deleteCategory(id) {
  const url = `/restaurant-cake-api/v1/admin/categories/${id}`
  return api.delete(url).then(({ data }) => data)
}

function updateCategory(category = {}) {
  const { id } = category;
  const url = `/restaurant-cake-api/v1/admin/categories/${id}`
  return getCategory(id).then(categoryLatest => {
    const body = { ...categoryLatest, ...category };
    return api.put(url, body).then(({ data }) => data)
  })
}

function publishCategory(id) {
  const url = `/restaurant-cake-api/v1/admin/categories/change-publish/${id}`
  return api.put(url).then(({ data }) => data)
}

export default {
  queryCategory,
  createCategory,
  checkCategory,
  rejecyCategory,
  updateCategory,
  deleteCategory,
  publishCategory,
  getCategory
}

