const baseConfig = require('./app.json').expo;

module.exports = {
  expo: {
    ...baseConfig,
    extra: {
      cryptoPanicKey: process.env.EXPO_PUBLIC_CRYPTOPANIC_KEY ?? '',
    },
  },
};
