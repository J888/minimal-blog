import { Configuration } from "@/types/conf";
import { Post } from "@/types/post/post";

const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const yaml = require('js-yaml');
const estimateReadingTime = require('reading-time');
const BUILD_TIME_POSTS_DIR = `tmp/posts`;
const BUILD_TIME_CONF_PATH = `tmp/conf.yml`;
const LOCAL_PATH_MISSING_ERROR = `\n\n\n\n>>>>>>>> LOCAL_PATH env var required <<<<<<<<\n\n\n\n`;

export const getConf = (): Configuration | {} => {
  if (process.env.DEV_MODE && !process.env.LOCAL_PATH) {
    throw new Error(LOCAL_PATH_MISSING_ERROR);
  }

  const confFilePath = process.env.DEV_MODE ? `${process.env.LOCAL_PATH}/conf.yml` : BUILD_TIME_CONF_PATH;

  try {
    return yaml.load(fs.readFileSync(confFilePath, 'utf8'));
  } catch (e) {
    console.error(e);
    return {}
  }
}

export const getFrontPagePosts = (): Post[] => {
  return getPostsFromLocation().filter(p => !p.metadata.hideFromFrontPage);
}

export const getPostsFromLocation = (): Post[] => {
  if (process.env.DEV_MODE && !process.env.LOCAL_PATH) {
    throw new Error(LOCAL_PATH_MISSING_ERROR);
  }

  const postsDirectory = process.env.DEV_MODE ? `${process.env.LOCAL_PATH}/posts` : BUILD_TIME_POSTS_DIR;

  let posts = [];
  const postDirectories = fs.readdirSync(postsDirectory);
  console.log(postDirectories);
  for (let i = 0; i < postDirectories.length; i++) {
    let postDir = postDirectories[i];

    let partsFiles = fs.readdirSync(path.join(postsDirectory, postDir), 'utf8');
    let post: Post = {
      metadata: {},
      parts: []
    };

    // collect all the parts
    for (let k = 0; k < partsFiles.length; k++) {
      let partFile = partsFiles[k];
  
      let fileContents = fs.readFileSync(path.join(postsDirectory, postDir, partFile), 'utf8');

      // md file
      if (partFile.endsWith('.md')) {

        // the first part file will always contain the front matter
        if (partFile === 'p1.md') {

          let parsed = fm(fileContents);
          let readTime;
          let estimatedReadMins = estimateReadingTime(parsed.body).minutes;
          if (estimatedReadMins < 1) {
            readTime = '< 1 min read'
          } else {
            readTime = estimateReadingTime(parsed.body).text
          }
          
          post.metadata = {
            hideFromFrontPage: parsed.attributes.hideFromFrontPage || false,
            tags: parsed.attributes.tags?.split(',') || [],
            title: parsed.attributes.title,
            category: parsed.attributes.category,
            createdAt: parsed.attributes.createdAt,
            description: parsed.attributes.description,
            slug: parsed.attributes.slug,
            readTime,
          };

          post.parts.push({
            type: 'MARKDOWN',
            body: parsed.body,
          });
        } else {
          post.parts.push({
            type: 'MARKDOWN',
            body: fileContents,
          });
        }
 
      } else if (partFile.endsWith('.yml')) {
        let partYml = yaml.load(fileContents);
        post.parts.push(partYml);
      }
    }

    posts.push(post);
  }

  // sort by date (most recently created will be first in the list)
  posts.sort((a,b) => {
    let aCreatedAt = a.metadata.createdAt as string;
    let bCreatedAt = b.metadata.createdAt as string;

    if (new Date(aCreatedAt) < new Date(bCreatedAt)) {
      return 1;
    }

    if (new Date(aCreatedAt) > new Date(bCreatedAt)) {
      return -1;
    }

    return 0;
  });

  return posts;
}

export const getPostBySlug = (slug: String): Post | undefined => {
  const posts = getPostsFromLocation();
  return posts.find(p => p.metadata.slug === slug)
}
