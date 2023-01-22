### Local Development

The `LOCAL_PATH` env var must be set to a directory on your local system that has structure

```
conf.yml
posts/
   md_file1.md
   md_file2.md
   md_file3.md
```

Example:
```
LOCAL_PATH=/Users/me/Documents/staticsitefiles/mysite yarn run dev
```

### Build For Deployment

For the real deployment, the posts get pulled from an S3 bucket.

That's because we don't want to hardcode the files in this repo.

The following env vars must be set to access files from the bucket:
```
AWS_ACCESS_KEY_ID=xyz123
AWS_SECRET_ACCESS_KEY=abc567
AWS_DEFAULT_REGION=us-east-2
AWS_BUCKET_NAME=my-static-site-bucket
```

