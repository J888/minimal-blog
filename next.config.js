const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = async (phase) => {

  const env = {
    DEV_MODE: phase === PHASE_DEVELOPMENT_SERVER

  }

  return {
    reactStrictMode: true,
    env,
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "**",
        },
      ],
    },
  }
}
