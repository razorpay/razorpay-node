const { assert } = require('chai');

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

  describe('normalizeBoolean()', () => {

    it('parses the parameter correctly', () => {

      assert.equal(
        normalizeBoolean(undefined),
        false
      );

      assert.equal(
        normalizeBoolean(true),
        true
      );

      assert.equal(
        normalizeBoolean(false),
        false
      );

    });

  });

  describe('normalizeNotes()', () => {

    it('normalizes a standard object', () => {

      assert.ok(
        normalizeNotes({
          note1: 'example1',
          note2: 'example2'
        }),
        {
          'notes[note1]': 'example1',
          'notes[note2]': 'example2'
        }
      );

    });

    it('normalizes an empty object', () => {

      assert.deepEqual(
        normalizeNotes({}),
        {}
      );

      assert.deepEqual(
        normalizeNotes(['test']),
        {'notes[0]': 'test'}
      );

    });

    describe('errors out on invalid parameters', () => {

      const testCases = [
        () => {},
        'test',
        false,
        100,
        null,
        void 0
      ];

      testCases.forEach(testCase => {

        it(`errors out on type ${typeof testCase}`, () => {
          assert.throws(() => {
            normalizeNotes(testCase);
          }, TypeError);
        });

      });

    });

  });

  describe('validateWebhookSignature()', () => {

    it('validates a valid signature', () => {

      const respBody = '{"a":1,"b":2,"c":{"d":3}}';
      const secret = '123456';
      const correctSignature = '2fe04e22977002e6c7cb553adab8b460cb9e2a4970d5953cb27a8472752e3bbc';

      assert.ok(
        validateWebhookSignature(respBody, correctSignature, secret)
      );

    });

    it('errors out on invalid parameters', () => {

      assert.throw(() => {
        validateWebhookSignature();
      }, TypeError);

      assert.throw(() => {
        validateWebhookSignature('');
      }, TypeError);

      assert.throw(() => {
        validateWebhookSignature('', '');
      }, TypeError);

    });

  });

});
