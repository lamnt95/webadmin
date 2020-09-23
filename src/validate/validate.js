import _ from 'lodash';

const errors = {
  empty: {
    msg: 'Thông tin này không được bỏ trống.',
    isError: (value) => _.isEmpty(value),
  },
  emptyNumber: {
    msg: 'Thông tin này không được bỏ trống.',
    isError: (value) => !_.isNumber(value),
  },
};

const errorsKeys = _.keys(errors);

// const responseError = [
//   {
//     errorField: 'propertyType',
//     errorMessage: 'Lỗi propertyType',
//   },
//   {
//     errorField: 'quickTitle',
//     errorMessage: 'Lỗi quickTitle',
//   },
// ];

export function validate(data = {}, configs, responseError = []) {
  const responseErrorKeyBy = _.keyBy(responseError, 'errorField') || {};
  const error = {};
  _.forEach(configs, (config) => {
    const { field } = config;
    const value = data[field];
    _.forEach(errorsKeys, (errorKey) => {
      if (config[errorKey] && errors[errorKey].isError(value)) {
        error[field] = {
          ...(error[field] || {}),
          [errorKey]: errors[errorKey].msg,
          fromApi: _.get(responseErrorKeyBy, [field, 'errorMessage']),
        };
      }
    });
  });
  return error;
}

export const categoryConfig = [
  { field: 'name', empty: true },
  { field: 'images', empty: true },
  { field: 'intro', empty: true },
  { field: 'policy', empty: true },
  { field: 'story', empty: true },
  { field: 'storyMedias', empty: true },
  { field: 'userManual', empty: true },
  { field: 'videoIntro', empty: true },
];

export function validateCategory(data = {}, responseError = []) {
  return validate(data, categoryConfig, responseError);
}


export const productConfig = [
  { field: 'categoryId', emptyNumber: true },
  { field: 'description', empty: true },
  { field: 'image', empty: true },
  { field: 'name', empty: true },
  { field: 'price', emptyNumber: true },
  { field: 'subImages', empty: true },
  { field: 'unit', empty: true },
  { field: 'summary', empty: true },
];

export function validateProduct(data = {}, responseError = []) {
  return validate(data, productConfig, responseError);
}

export const postIntroConfig = [
  { field: 'images', empty: true },
  { field: 'intro', empty: true },
  { field: 'policy', empty: true },
  { field: 'story', empty: true },
  { field: 'storyMedias', empty: true },
  { field: 'userManual', empty: true },
  { field: 'videoIntro', empty: true },
];

export function validatePostIntro(data = {}, responseError = []) {
  return validate(data, postIntroConfig, responseError);
}


export const cartConfig = [
  { field: 'receivedDate', empty: true },
  { field: 'addressDetail', empty: true },
  { field: 'addressType', empty: true },
  { field: 'provinceCode', empty: true },
  { field: 'districCode', empty: true },
  { field: 'email', empty: true },
  { field: 'fullName', empty: true },
  { field: 'phone', empty: true },
  { field: 'sex', empty: true },
];

export function validateCart(data = {}, responseError = []) {
  return validate(data, cartConfig, responseError);
}


export default {
  validateCategory,
  validateProduct,
  validatePostIntro,
  validateCart
}