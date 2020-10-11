export const formatAmount = (amount) => {
  return amount.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
};

export const getNumberOnly = (string) => {
  return string.replace(/[^0-9.]/g, '');
};

export const formatMoney = (money) => {
  return formatAmount(getNumberOnly(`${money}`));
}

export default {
  formatMoney
}
