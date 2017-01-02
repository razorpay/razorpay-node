'use strict'

const chai = require('chai')
const assert = chai.assert
const equal = require('deep-equal')

const {
  normalizeDate,
  isNumber,
  normalizeBoolean,
  normalizeNotes,
  getDateInSecs
} = require('../../dist/utils/razorpay-utils')

describe('Razorpay Utils', () => {
  it('normalizeDate', () => {
    let date = 'Aug 25, 2016'
    assert.equal(
      normalizeDate(date),
      getDateInSecs(date),
      'Returns date in secs'
    )
  })

  it('isNumber', () => {
    assert.equal(
      isNumber('0.3'),
      true,
      'Number check'
    )

    assert.equal(
      isNumber('abc'),
      false,
      'Number check with alphabets'
    )
  })

  it('normalizeBoolean', () => {
    assert.equal(
      normalizeBoolean(undefined),
      undefined,
      'When undefined is passed, just return it'
    )

    assert.equal(
      normalizeBoolean(true),
      1,
      'Boolean check with true'
    )

    assert.equal(
      normalizeBoolean(false),
      0,
      'Boolean check with false'
    )
  })

  it('normalizeNotes', () => {
    assert.ok(
      equal(
        normalizeNotes({
          note1: 'This is note1',
          note2: 'This is note2'
        }),
        {
          'notes[note1]': 'This is note1',
          'notes[note2]': 'This is note2'
        }
      ),
      'Transforms the notes'
    )
  })
})
