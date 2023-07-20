import styles from "@/styles/wrappers/FixedLeftContentWrapper.module.scss";
import { Post } from "@/types/post/post";
import Head from "next/head";
import Footer from "../Footer";
import NavBar from "../NavBar";
import Spacer from "../utility/Spacer";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

interface Props {
  children: React.ReactNode;
  leftSidebarContent?: any;
  conf: any;
  description?: string;
  title?: string;
  post?: Post;
}

const FixedLeftContentWrapper = ({
  children,
  leftSidebarContent,
  conf,
  title,
  post,
  description
}: Props) => {
  const appTheme = useContext(ThemeContext);

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
      <div className={styles.main}
            style={{
              backgroundColor: appTheme.backgroundPrimary
            }}
      >
        {/* <div className={styles.fixedLeftSidebar}>
          <div className={styles.fixedLeftSidebarInner}>
            {leftSidebarContent}
          </div>
        </div> */}
        <NavBar conf={conf}/>
        <main className={styles.content} style={{
        backgroundColor: appTheme.backgroundPrimary
       }}>
          {children}
        </main>
        <Spacer size="sm"/>
        <div className={styles.fixedLeftSidebar} style={{
        backgroundColor: appTheme.navBackground
      }}>
          <div className={styles.fixedLeftSidebarInner}>
            {leftSidebarContent}
          </div>
        </div>
        <div className={styles.footerContainer}>
          <Footer conf={conf}/>
        </div>
      </div>
    </>
  );
};

export default FixedLeftContentWrapper;
