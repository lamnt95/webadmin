import _ from 'lodash';

export const category = [
  // { field: 'name', empty: true },
];

export const product = [
  // { field: 'name', empty: true },
  // { field: 'price', empty: true },
  // { field: 'description', empty: true },
  // { field: 'categoryId', empty: true },
];

const errors = {
  empty: {
    msg: 'Thông tin này không được bỏ trống.',
    isError: (value) => _.isEmpty(value),
  },
};

const errorsKeys = _.keys(errors);

export function validateCategory(data = {}) {
  return validate(data = {}, category)
}

export function validateProduct(data = {}) {
  return validate(data = {}, product)
}

export function validate(data = {}, configs) {
  const error = {};
  _.forEach(configs, (config) => {
    const { field } = config;
    const value = data[field];
    _.forEach(errorsKeys, (errorKey) => {
      if (config[errorKey] && errors[errorKey].isError(value)) {
        error[field] = {
          ...(error[field] || {}),
          [errorKey]: errors[errorKey].msg,
        };
      }
    });
  });
  return error;
}
