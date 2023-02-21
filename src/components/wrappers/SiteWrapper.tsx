import styles from "@/styles/wrappers/SiteWrapper.module.scss";
import { Post } from "@/types/post/post";
import Head from "next/head";
import Footer from "../Footer";
import NavBar from "../NavBar";
import Spacer from "../utility/Spacer";

interface Props {
  children: React.ReactNode;
  conf: any;
  description?: string;
  title?: string;
  post?: Post;
}

const SiteWrapper = ({ children, conf, title, post, description }: Props) => {
  return (
    <>
      <Head>
        <title>{post ? post.metadata.title : title}</title>
        <meta name="description" content={post ? post.metadata.description : description} />
        {post && <meta name="keywords" content={post.metadata.tags?.join(', ')} /> }
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style>
          @import
          url("https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap");

          @import url("https://fonts.googleapis.com/css2?family=Ubuntu&family=Varela+Round&family=Noto+Serif&family=Martian+Mono&family=Merriweather&display=swap');
        </style>
      </Head>
      <div className={styles.main}>
        <NavBar conf={conf}/>
          <div className={styles.siteContent}>
            {children}
          </div>
        <Spacer size="sm"/>
        <Footer conf={conf}/>
      </div>
    </>
  );
};

export default SiteWrapper;
