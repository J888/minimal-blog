const fs = require('fs');
const path = require('path');
const fm = require('front-matter');
const yaml = require('js-yaml');
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
  const mdFiles = fs.readdirSync(postsDirectory);
  for (let i = 0; i < mdFiles.length; i++) {
    let mdFile = mdFiles[i];
    const fileContents = fs.readFileSync(path.join(postsDirectory, mdFile), 'utf8');
    let parsed = fm(fileContents);
    posts.push(
      {
        title: parsed.attributes.title,
        category: parsed.attributes.category,
        createdAt: parsed.attributes.createdAt,
        description: parsed.attributes.description,
        slug: parsed.attributes.slug,
        body: parsed.body
      }
    );
  }
  return posts;
}

export const getPostBySlug = (slug: String) => {
  const posts = getPostsFromLocation();
  return posts.find(p => p.slug === slug)
}
