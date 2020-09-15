import axios from "axios";
import _ from "lodash";
import { toast } from 'react-toastify';

// export const domain = "http://34.66.141.204:8080";
export const domain = "http://202.92.6.130:8080";

function getOptionsRequest(headers) {
  return {
    "Content-Type": "application/json",
    ...(headers || {})
  };
}

function callApi(
  _method,
  { endpoint: url, body, headers: _headers, params, options }
) {
  const endpoint = domain + url;
  const method = (_method || "").toUpperCase();
  const headers = getOptionsRequest(_headers);
  const optionsAxios = {
    url: endpoint,
    method,
    data: body,
    params,
    headers,
    ...(options || {})
  }
  return axios(optionsAxios)
    .then(response => {
        return Promise.resolve(response);
    })
    .catch(err => {
      toast.error("Đã có lỗi xảy ra, liên hệ kĩ thuật để được hỗ trợ")
      return Promise.reject(err);
    });
}

const postMethod = (endpoint, body, headers, options) =>
  callApi("POST", { endpoint, body, headers, options });

const putMethod = (endpoint, body, headers, options) =>
  callApi("PUT", { endpoint, body, headers, options });

const deleteMethod = (endpoint, body, headers, options) =>
  callApi("DELETE", { endpoint, body, headers, options });

const patchMethod = (endpoint, body, headers, options) =>
  callApi("PATCH", { endpoint, body, headers, options });

const getMethod = (endpoint, params, headers, options) =>
  callApi("GET", {
    endpoint,
    headers,
    params,
    options
  });

export default {
  get: getMethod,
  post: postMethod,
  put: putMethod,
  delete: deleteMethod,
  patch: patchMethod
};
