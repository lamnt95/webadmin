import moment from "moment";

export function toUnix(date, format = "YYYY-MM-DD") {
  return moment(date, format).unix();
}

function formatDate(timeUTC, msg = "") {
  const createdDate = moment.utc(timeUTC).local().format("DD/MM/YYYY") || msg;
  const createdDateString = `${createdDate}`;
  return createdDateString;
}

function formatYYYMMDD(calendar) {
  return moment(calendar).format("YYYY-MM-DD")
}

export default {
  toUnix,
  formatDate,
  formatYYYMMDD
};
