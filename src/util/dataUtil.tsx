const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const yaml = require('js-yaml');
const estimateReadingTime = require('reading-time');
const BUILD_TIME_POSTS_DIR = `tmp/posts`;
const BUILD_TIME_CONF_PATH = `tmp/conf.yml`;
const LOCAL_PATH_MISSING_ERROR = `\n\n\n\n>>>>>>>> LOCAL_PATH env var required <<<<<<<<\n\n\n\n`;

export const getConf = () => {
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

export const getPostsFromLocation = () => {
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
    let post: any = {
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
          post.metadata = {
            tags: parsed.attributes.tags?.split(',') || [],
            title: parsed.attributes.title,
            category: parsed.attributes.category,
            createdAt: parsed.attributes.createdAt,
            description: parsed.attributes.description,
            slug: parsed.attributes.slug,
            readingTimeMinutes: estimateReadingTime(parsed.body).text
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

    // const fileContents = fs.readFileSync(path.join(postsDirectory, mdFile), 'utf8');
    // let parsed = fm(fileContents);
    // posts.push(
    //   {
    //     tags: parsed.attributes.tags?.split(',') || [],
    //     title: parsed.attributes.title,
    //     category: parsed.attributes.category,
    //     createdAt: parsed.attributes.createdAt,
    //     description: parsed.attributes.description,
    //     slug: parsed.attributes.slug,
    //     body: parsed.body,
    //     readingTimeMinutes: estimateReadingTime(parsed.body).text
    //   }
    // );
  }

  // sort by date (most recently created will be first in the list)
  posts.sort((a,b) => {
    if (new Date(a.metadata.createdAt) < new Date(b.metadata.createdAt)) {
      return 1;
    }

    if (new Date(a.metadata.createdAt) > new Date(b.metadata.createdAt)) {
      return -1;
    }

    return 0;
  });

  return posts;
}

export const getPostBySlug = (slug: String) => {
  const posts = getPostsFromLocation();
  return posts.find(p => p.metadata.slug === slug)
}
