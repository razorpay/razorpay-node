const commonCustomerParameters = {
  name: 'test',
  email: 'test@razorpay.com',
  contact: '123456789'
};

module.exports = {
  error: {
    error: {
      code: "BAD_REQUEST_ERROR",
      description: "The count may not be greater than 100.",
      field: "count"
    }
  },
  customer: {
    commonParameters: commonCustomerParameters,
    parameters: {
      ...commonCustomerParameters,
      notes: {
        note1: 'This is note1',
        note2: 'This is note2'
      }
    },
    expectedParameters: {
      ...commonCustomerParameters,
      'notes[note1]': 'This is note1',
      'notes[note2]': 'This is note2'
    }
  },
  common: {
    parameters: {
      param1: 'something',
      param2: 'something else',
      notes: {
        'note1': 'example1',
        'note2': 'example2'
      }
    },
    expectedParameters: {
      param1: 'something',
      param2: 'something else',
      'notes[note1]': 'example1',
      'notes[note2]': 'example2'
    }
  }
};
