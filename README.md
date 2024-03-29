### Local Development

```shell
$ POSTS_JSON_PATH=/some/location/generated/posts/posts.json CONF_PATH=/some/location/conf.yml yarn dev
```

### Build For Deployment

For a deployment, the posts get pulled from an S3 bucket.

We do this to avoid hardcoding the posts and site configuration in the repo. By eliminating hardcoding, we're making sure this repo is a re-usable template no matter what topics you want to blog about. 

The following env vars must be set to access files from the bucket.

If you're deploying on a platform like Netlify or Heroku, that means you need to set these in the build config. Note that the app itself is entirely static and currently does not run any js on the server at all, which is why it's so fast, and these env vars are only used at build time.
```
MY_AWS_KEY_ID=xyz123
MY_AWS_SECRET_ACCESS_KEY=abc567
AWS_BUCKET_NAME=my-static-site-bucket
```

Build and run the next app

```shell
$ yarn run build

$ yarn run start
```

### Todo
- make the theme configurable
- make a control panel for the config
- Make navbar burger only a thing for mobile
