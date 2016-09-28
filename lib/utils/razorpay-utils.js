function normalizeDate(date) {
  return isNumber(date)? date : (+new Date(date))/1000
}

function isNumber(num) {
  return !isNaN(Number(num))
}

function normalizeBoolean(bool) {
  return bool? 1 : 0
}

function normalizeNotes(notes = {}) {
  let normalizedNotes = {}
  for (let key in notes) {
    normalizedNotes[`notes[${key}]`] = notes[key]
  }
  return normalizedNotes
}

module.exports = {
  normalizeNotes,
  normalizeDate,
  normalizeBoolean,
  isNumber
}
