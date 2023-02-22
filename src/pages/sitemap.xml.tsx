import { Post } from "@/types/post/post";
import { getPostsFromLocation } from "@/util/dataUtil";
const POST_SLUG_PREFIX = `p`
/*
tags.map(tag => {
          return `
            <url>
              <loc>${baseUrl}/tags/${tag}</loc>
              <lastmod>${new Date().toISOString()}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.9</priority>
            </url>
          `;
        }).join("")
*/

/**
 * Sitemap component for SEO / crawler optimization
 */
const SiteMap = () => {

}

export const getServerSideProps = async ({ req, res }: any) => {
  try {
    const posts: Post[] = getPostsFromLocation();

    const baseUrl = req.headers.host || req.headers.authority;
    console.log('req.headers: ',req.headers)
    console.log('posts: ',posts)
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>${baseUrl}/a</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1.0</priority>
        </url>
        ${
          posts.map(post => {
            return `
              <url>
                <loc>${baseUrl}/${POST_SLUG_PREFIX}/${post.metadata.slug}</loc>
                <lastmod>${new Date(post.metadata.createdAt as string).toISOString()}</lastmod>
                <changefreq>weekly</changefreq>
                <priority>0.9</priority>
              </url>
            `;
          }).join("")
        }
  
      </urlset>
    `;
  
    res.setHeader("Content-Type", "text/xml");
    res.write(sitemap);
    res.end();
  

  } catch (ex) {
    res.setHeader("Content-Type", "text/xml");
    try {
      res.write((ex as any).toString());
    } catch {
      res.write('could not write the exception..');
    }
    res.end();
  }
  return {
    props: {},
  };
  
};

export default SiteMap;
