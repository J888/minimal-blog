// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"; // CommonJS import
import fs from 'fs';
import path from 'path';
const REGION = 'us-east-2';
const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_KEY_ID || '',
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY || ''
  }
});

type Data = {
  sitemap: string
}

const getSitemapS3 = async (): Promise<string> => {
  const commandConfig = { Bucket: process.env.AWS_BUCKET_NAME, Key: 'sitemap.xml', ContentType: 'text/xml' };
  console.log(`getSitemapS3, commandConfig`, commandConfig);

  return new Promise(async (resolve, reject) => {
    let response = await client.send(new GetObjectCommand(commandConfig));
    let chunks: string = ''
    const readStream: any = response.Body;

    readStream.on('data', (chunk: string) => {
      chunks += chunk;
    });

    readStream.on('close', () => {
      resolve(chunks);
    });
  })
}

const getSiteMapLocalFs = (): string => {
  if (process.env.DEV_MODE && !process.env.LOCAL_PATH) {
    throw new Error('LOCAL_PATH env var must be set');
  }

  try {
    return fs.readFileSync(path.join(process.env.LOCAL_PATH || '', 'generated', 'sitemap.xml'), 'utf8')
  } catch (e) {
    console.error(e);
    return ''
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let sitemap: string = '';
  if (process.env.DEV_MODE) {
    sitemap = getSiteMapLocalFs();
  } else {
    sitemap = await getSitemapS3();
  }

  res.status(200).json({ sitemap })
}
