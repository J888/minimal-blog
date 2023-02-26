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

  let sitemapGetRes = await axios.get(`${protocol}://${host}/api/getsitemap`);
  res.write(sitemapGetRes.data.sitemap);
  res.end();

  return {
    props: {},
  };
  
};

export default SiteMap;
