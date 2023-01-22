// build time script
// to make this site more generic,
// data is pulled from s3 at build time
// that way we can re use this repo and just switch out the bucket

const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const yaml = require('js-yaml');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { S3Client, GetObjectCommand, ListObjectsV2Command, PutObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import
const REGION = 'us-east-2';
const client = new S3Client({ region: REGION });

const getPostsTar = async () => {
  var file = fs.createWriteStream('./tmp/posts.tar.gz');

  return new Promise(async (resolve, reject) => {
    let response = await client.send(new GetObjectCommand({ Bucket: process.env.AWS_BUCKET_NAME, Key: `posts.tar.gz`, ContentType: 'application/gzip' }));
    
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
  await exec(`rm -r ./tmp`);

  if (!fs.existsSync("tmp")) {
    fs.mkdirSync("tmp");
  }
  
  await getPostsTar();

  await exec(`tar -xf ./tmp/posts.tar.gz`);
  await exec(`mv ./posts ./tmp`);
  await exec(`rm ./tmp/posts.tar.gz`);
})()
