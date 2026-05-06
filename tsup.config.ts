import { defineConfig } from 'tsup'

export default defineConfig([
  // ESM build
  {
    entry: { razorpay: 'lib/razorpay.js' },
    format: ['esm'],
    outExtension: () => ({ js: '.mjs' }),
    external: ['axios'],
    clean: false,
  },
  // CJS build — footer unwraps `export default` so require('razorpay') still
  // returns the class directly (zero breaking changes for existing CJS users)
  {
    entry: {
      razorpay: 'lib/razorpay.js',
      oAuthTokenClient: 'lib/oAuthTokenClient.js',
      'utils/nodeify': 'lib/utils/nodeify.js',
    },
    format: ['cjs'],
    external: ['axios'],
    footer: { js: 'if (module.exports.default) module.exports = module.exports.default;' },
    clean: false,
  },
  // Utility modules (CJS only, named exports — no default unwrap needed)
  {
    entry: {
      'utils/razorpay-utils': 'lib/utils/razorpay-utils.js',
      'utils/predefined-tests': 'lib/utils/predefined-tests.js',
    },
    format: ['cjs'],
    external: ['axios', 'chai', 'deep-equal', '../../test/mocker.js'],
    clean: false,
  },
])
