function getDateInSecs(date) {
  return (+new Date(date))/1000
}

function normalizeDate(date) {
  return isNumber(date)? date : getDateInSecs(date)
}

function isNumber(num) {
  return !isNaN(Number(num))
}

function normalizeBoolean(bool) {
  if (bool === undefined) {
    return bool
  }

  return bool ? 1 : 0
}

function normalizeNotes(notes = {}) {
  let normalizedNotes = {}
  for (let key in notes) {
    normalizedNotes[`notes[${key}]`] = notes[key]
  }
  return normalizedNotes
}

function prettify (val) {

  /*
   * given an object , returns prettified string
   *
   * @param {Object} val
   * @return {String}
   */

  return JSON.stringify(val, null, 2);
}

function getTestError (summary, expectedVal, gotVal) {

  /*
   * @param {String} summary
   * @param {*} expectedVal
   * @param {*} gotVal
   *
   * @return {Error}
   */

  return new Error(
    `\n${summary}\n`+
    `Expected(${typeof expectedVal})\n${prettify(expectedVal)}\n\n`+
    `Got(${typeof gotVal})\n${prettify(gotVal)}`
  );
}

module.exports = {
  normalizeNotes,
  normalizeDate,
  normalizeBoolean,
  isNumber,
  getDateInSecs,
  prettify,
  getTestError
}
