const baseConfig = require('./app.json').expo;

module.exports = {
  expo: {
    ...baseConfig,
    extra: {
      cryptoPanicKey: process.env.EXPO_PUBLIC_CRYPTOPANIC_KEY ?? '',
      apiUrl: process.env.EXPO_PUBLIC_API_URL ?? '',
    },
    // Allow insecure localhost connections for dev
    android: { usesCleartextTraffic: true },
  },
};
