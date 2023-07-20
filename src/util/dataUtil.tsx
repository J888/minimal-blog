import { Configuration } from "@/types/conf";
import { Post } from "@/types/post/post";

const fs = require('fs');
const yaml = require('js-yaml');
const POSTS_PATH_MISSING_ERROR = `\n\n\n\n>>>>>>>> POSTS_JSON_PATH env var required <<<<<<<<\n\n\n\n`;
const CONF_PATH_MISSING_ERROR = `\n\n\n\n>>>>>>>> CONF_PATH env var required <<<<<<<<\n\n\n\n`;

const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3"); // CommonJS import
const REGION = 'us-east-2';
const client = new S3Client({
  region: REGION,
  credentials: {
    accessKeyId: process.env.MY_AWS_KEY_ID,
    secretAccessKey: process.env.MY_AWS_SECRET_ACCESS_KEY
  }
});

const getFileS3 = async (Key: string, ContentType = 'application/json'): Promise<string> => {
  const commandConfig = { Bucket: process.env.AWS_BUCKET_NAME, Key, ContentType };
  console.log(`Getting file with config`, commandConfig);

  return new Promise(async (resolve, reject) => {
    let response = await client.send(new GetObjectCommand(commandConfig));
    let data: string = '';
    const readStream = response.Body;

    readStream.on('data', (chunk: any) => {
      data += chunk;
    });

    readStream.on('close', () => {
      resolve(data);
    });
  })
}

export const getPostsS3 = async (): Promise<Post[]> => {
  const posts = JSON.parse(await getFileS3('posts/posts.json'));
  console.log(`--getPostsS3-- posts:`, posts);
  return posts;
}

export const getConf = async (): Promise<Configuration | {}> => {
  if (process.env.DEV_MODE) {
    if (!process.env.CONF_PATH) {
      throw new Error(CONF_PATH_MISSING_ERROR);
    }
    return yaml.load(fs.readFileSync(process.env.CONF_PATH, 'utf8'))
  } else {
    return yaml.load(await getFileS3(`conf.yml`, `text/yaml`), 'utf8');
  }
}

export const getFrontPagePosts = async (): Promise<Post[]> => {
  return (await getPostsFromLocation()).filter(p => !p.metadata.hideFromFrontPage);
}

export const getPostsFromLocation = async (): Promise<Post[]> => {
  if (process.env.DEV_MODE) {
    if (!process.env.POSTS_JSON_PATH) {
      throw new Error(POSTS_PATH_MISSING_ERROR);
    }
    return JSON.parse(fs.readFileSync(process.env.POSTS_JSON_PATH));
  } else {
    return await getPostsS3();
  }
}

export const getPostBySlug = async (slug: string): Promise<Post | undefined> => {
  const posts = await getPostsFromLocation();
  return posts.find(p => p.metadata.slug === slug);
}

export const getPostsByTag = async (tag: string): Promise<Post[]> => {
  const posts = await getPostsFromLocation();
  return posts.filter(p => p.metadata.tags?.includes(tag) || p.metadata.tags?.map(t => t.toLowerCase()).includes(tag));
}
