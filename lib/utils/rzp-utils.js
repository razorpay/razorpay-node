function normalizeDate(date) {
  return isNumber(date)? date : (+new Date(date))/1000
}

function isNumber(num) {
  return !isNaN(Number(num))
}

module.exports = {
  normalizeDate,
  isNumber
}
