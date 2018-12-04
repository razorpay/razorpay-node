const { assert } = require('chai');
const equal = require('deep-equal');

const {
  normalizeNotes,
  normalizeDate,
  normalizeBoolean,
  isNumber,
  getDateInSecs,
  isNonNullObject,
  getTestError,
  validateWebhookSignature
} = require('../../lib/utils/razorpay-utils')

describe('#Utilities', () => {

  describe('normalizeDate()', () => {

    describe('normalizes the date correctly', () => {

      const testCases = [
        'Aug 25, 2016',
        'August 25, 2016',
        '2016-08-25'
      ];

      testCases.forEach((testCase, i) => {

        it(`validates correctly, case ${i}`, () =>{

          assert.equal(
            normalizeDate(testCase),
            getDateInSecs(testCase)
          );

        });

      });

    });

    it('throws an error on invalid date formats', () =>{

      assert.throw(() => {
        normalizeDate('1111-1-1111');
      }, TypeError);

      assert.throw(() => {
        normalizeDate('abcde-1-1111');
      }, TypeError);

      assert.throw(() => {
        normalizeDate();
      }, TypeError);

      assert.throw(() => {
        normalizeDate(void 0);
      }, TypeError);

    });

  });

  describe('isNumber()', () => {

    const testCases = [
      {
        input: '0.3',
        output: true
      },
      {
        input: '3',
        output: true
      },
      {
        input: '3.14',
        output: true
      },
      {
        input: 'abc',
        output: false
      },
      {
        input: '',
        output: false
      },
      {
        input: null,
        output: false
      },
      {
        input: void 0,
        output: false
      },
      {
        input: 0.3,
        output: true
      },
      {
        input: 3,
        output: true
      },
      {
        input: 3.14,
        output: true
      },
      {
        input: () => {},
        output: false
      },
      {
        input: {},
        output: false
      },
      ,
      {
        input: [],
        output: false
      }
    ];

    testCases.forEach((testCase, i) => {

      it(`parses case ${i} correctly`, () =>{

        assert.equal(
          isNumber(testCase.input),
          testCase.output
        );

      });

    });

  });

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
  });

  it('isDefined', () => {

    assert.ok(
      !isDefined() && isDefined(""),
      'Checks if the argument is defined'
    );
  });

  it('getTestError', () => {
    const error = getTestError("", "", "");
    assert.ok(
      error.constructor.name === "Error",
      'Gets common error for all tests'
    );
  });

  it('validateWebhookSignature', () => {

    const respBody         = '{"a":1,"b":2,"c":{"d":3}}',
          secret           = "123456",
          correctSignature = "2fe04e22977002e6c7cb553adab8b460cb"+
                             "9e2a4970d5953cb27a8472752e3bbc",
          wrongSignature   = "sdfafds";

    assert.ok(
      validateWebhookSignature(respBody, correctSignature, secret) &&
      !validateWebhookSignature(respBody, wrongSignature, secret),
      'Validates webhook signature'
    );
  });
})
