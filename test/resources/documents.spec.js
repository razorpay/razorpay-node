'use strict'

const chai = require('chai')
const { assert } = chai
const rzpInstance = require('../razorpay')
const mocker = require('../mocker')
const equal = require('deep-equal')

const BASE_URL = '/documents',
  TEST_DOCUMENT_ID = 'disp_AHfqOvkldwsbqt';

describe('DOCUMENTS', () => {
  it('Create an document', (done) => {

    var formData = {
        'file': {
            'value': '/Users/your_name/Downloads/sample_uploaded.pdf',
            'options': {
                'filename': 'README.md',
                'contentType': null
            }
        },
        'purpose': 'dispute_evidence'
    };

    mocker.mock({
      url: `${BASE_URL}`,
      method: 'POST'
    })

    rzpInstance.documents.create(formData).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/documents`,
        'Create document request url formed'
      )
      done()
    })
  })

  it('Fetch document detail', (done) => {
    mocker.mock({
      url: `/${BASE_URL}/${TEST_DOCUMENT_ID}`,
      method: 'GET'
    })

    rzpInstance.documents.fetch(TEST_DOCUMENT_ID).then((response) => {
      assert.equal(
        response.__JUST_FOR_TESTS__.url,
        `/v1/documents/${TEST_DOCUMENT_ID}`,
        'fetch document detail request url formed'
      )
      done()
    })
  })
})
