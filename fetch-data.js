// build time script
// to make this site more generic,
// data is pulled from s3 at build time
// that way we can re use this repo and just switch out the bucket

const fs = require('fs');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const SITE_TAR_NAME = `site.tar.gz`;

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import
const REGION = 'us-east-2';
const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
  }
});

const getPostsTar = async () => {
  var file = fs.createWriteStream(`./tmp/${SITE_TAR_NAME}`);

  const commandConfig = { Bucket: process.env.AWS_BUCKET_NAME, Key: SITE_TAR_NAME, ContentType: 'application/gzip' };
  console.log(`Getting posts with config`, commandConfig);

  return new Promise(async (resolve, reject) => {
    let response = await client.send(new GetObjectCommand(commandConfig));
    
    const readStream = response.Body;

    readStream.on('data', (chunk) => {
      file.write(chunk);

    });

    readStream.on('close', () => {
      console.log('done reading the file.')
      resolve(true);
    });
  })
}

(async () => {

  // clean start
  if (fs.existsSync("tmp")) {
    await exec(`rm -r ./tmp`);
  }
  
  // make the tmp folder where we'll pull site data into
  fs.mkdirSync("tmp");
  
  await getPostsTar();

  await exec(`tar -xf ./tmp/${SITE_TAR_NAME}`);
  await exec(`mv ./posts ./tmp`);
  await exec(`mv ./conf.yml ./tmp`);
  await exec(`rm ./tmp/${SITE_TAR_NAME}`);
})()
