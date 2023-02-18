const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');
const yaml = require('js-yaml');
const fs = require('fs');
const BUILD_TIME_CONF_PATH = `tmp/conf.yml`;
const LOCAL_PATH_MISSING_ERROR = `\n\n\n\n>>>>>>>> LOCAL_PATH env var required <<<<<<<<\n\n\n\n`;

const getConf = (isDevMode) => {
  if (isDevMode&& !process.env.LOCAL_PATH) {
    throw new Error(LOCAL_PATH_MISSING_ERROR);
  }

  const confFilePath = isDevMode ? `${process.env.LOCAL_PATH}/conf.yml` : BUILD_TIME_CONF_PATH;

  try {
    return yaml.load(fs.readFileSync(confFilePath, 'utf8'));
  } catch (e) {
    console.error(e);
    return {}
  }
}

module.exports = async (phase) => {
  const conf = getConf(phase === PHASE_DEVELOPMENT_SERVER);

  const env = {
    DEV_MODE: phase === PHASE_DEVELOPMENT_SERVER,
    GA_ENABLED: conf.analytics.google.enabled === true,
    GA_MEAS_ID: conf.analytics.google.measurementId
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
