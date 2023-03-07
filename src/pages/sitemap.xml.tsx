import axios from "axios";

/**
 * Sitemap component for SEO / crawler optimization
 */
const SiteMap = () => {

}

export const getServerSideProps = async ({ req, res }: any) => {

  res.setHeader("Content-Type", "text/xml");
  const protocol = req.headers.scheme || 'http';
  const host = req.headers.authority || req.headers.host;
  let baseUrl;
  if (host.includes('localhost')) { // For local testing
    baseUrl = `http://127.0.0.1:3000`
  } else {
    baseUrl = `${protocol}://${host}`;
  }

  let sitemapGetRes = await axios.get(`${baseUrl}/api/getsitemap`);
  res.write(sitemapGetRes.data.sitemap);
  res.end();

  return {
    props: {},
  };
  
};

export default SiteMap;
