const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = async (phase) => {

  const env = {
    DEV_MODE: phase === PHASE_DEVELOPMENT_SERVER

  }

  /**
   * The domains that are allowed when using next/image
   */
  // const images = {
  //   domains: [
  //     `${process.env.PUBLIC_FILES_BUCKET}.s3.${process.env.S3_REGION}.amazonaws.com`,
  //     'images.squarespace-cdn.com'
  //   ],
  // }

  return {
    reactStrictMode: true,
    env,
    // images,
  }
}
