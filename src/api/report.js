import _ from "lodash"
import api from "./api"
import FileDownload from "js-file-download"
import axios from "axios"

function getReportOrder() {
  const url = "/restaurant-cake-api/v1/admin/order-reports/download"
  return api.get(url).then(res => { console.log("res", res); return res; }).then(({ data }) => FileDownload(data))
}

function getReportProduct() {
  const url = "/restaurant-cake-api/v1/admin/product-reports/download"
  return api.get(url).then(({ data }) => FileDownload(data, "Báo cáo sản phẩm.xlsx"))
}


export default {
  getReportOrder,
  getReportProduct
}