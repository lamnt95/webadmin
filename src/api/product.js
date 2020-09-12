import _ from "lodash"
import api from "./api"

function queryProduct(params = {}) {
  const { page = 0, size = 20, checkedStatus = "APPROVE" } = params;
  const url = `/restaurant-cake-api/v1/admin/products?checkedStatus=${checkedStatus}&page=${page}&size=${size}`
  return api.get(url).then(({ data }) => data)
}

function createProduct(body = {}) {
  const url = `/restaurant-cake-api/v1/admin/products`
  return api.post(url, body).then(({ data }) => data)
}

function checkProduct(id) {
  const url = `/restaurant-cake-api/v1/admin/products/check/${id}`
  return api.put(url).then(({ data }) => data)
}

function rejectProduct(id) {
  const url = `/restaurant-cake-api/v1/admin/products/reject/${id}`
  return api.put(url).then(({ data }) => data)
}

function deleteProduct(id) {
  const url = `/restaurant-cake-api/v1/admin/products/${id}`
  return api.delete(url).then(({ data }) => data)
}

function updateProduct(product = {}) {
  const { id } = product;
  const url = `/restaurant-cake-api/v1/admin/products/${id}`
  return getProduct(id).then(productLatest => {
    const body = { ...productLatest, ...product };
    return api.put(url, body).then(({ data }) => data)
  })
}

function getProduct(id) {
  const url = `/restaurant-cake-api/v1/admin/products/${id}`
  return api.get(url).then(({ data }) => data)
}

function uploadImageProduct(id, formData) {
  const url = `/uat/restaurant-cake-api/v1/admin/products/${id}/images`
  return api.post(url, formData).then(({ data }) => data)
}

export default {
  queryProduct,
  createProduct,
  checkProduct,
  rejectProduct,
  deleteProduct,
  updateProduct,
  uploadImageProduct,
  getProduct
}