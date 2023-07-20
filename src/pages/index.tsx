
import styles from "@/styles/Home.module.scss";
import PostListItem from "@/components/PostListItem";
import Spacer from "@/components/utility/Spacer";
import SectionHeading from "@/components/SectionHeading";
import { getConf, getFrontPagePosts } from "@/util/dataUtil";
import Link from "next/link";
import { Configuration } from "@/types/conf";
import { Post } from "@/types/post/post";
import { gaEvent } from "@/util/gaUtil";
import FixedLeftContentWrapper from "@/components/wrappers/FixedLeftContentWrapper";
import ListWithHeading from "@/components/list/ListWithHeading";
import HorizontalDivider from "@/components/divider/HorizontalDivider";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";

interface Props {
  conf: Configuration;
  posts: Post[];
}

const Home = ({ conf, posts }: Props) => {
  const appTheme = useContext(ThemeContext);

  return (
    <FixedLeftContentWrapper conf={conf} title={'Home' + ' | ' + conf.site.name} description={`The homepage of ${conf.site.name}`}
      leftSidebarContent={
        <div>
          <ListWithHeading posts={
            posts.filter((p) => p.metadata.category?.toLowerCase() === 'googleanalytics')
          } headingText={"Google Analytics"} headingStyles={{fontSize: '1.3rem'}}/>
          <HorizontalDivider/>
          <ListWithHeading posts={
            posts.filter((p) => p.metadata.category?.toLowerCase() === 'commandline')
          } headingText={"Commandline Tips"} headingStyles={{fontSize: '1.3rem'}}/>
          <HorizontalDivider/>
          <ListWithHeading posts={
            posts.filter((p) => p.metadata.category?.toLowerCase() === 'algorithms')
          } headingText={"Algorithms"} headingStyles={{fontSize: '1.3rem'}}/>
          <HorizontalDivider/>
          <ListWithHeading posts={posts} headingText={"All"} headingStyles={{fontSize: '1.3rem'}}/>
        </div>
      }>
      <Spacer size="xxs" />

      <main className={styles.main}
      //  style={{
      //   backgroundColor: appTheme.backgroundPrimary
      //  }}
       >

        <SectionHeading>Posts</SectionHeading>
        <Spacer size="xxs" />
        <div className={styles.postList}
             
        >
          {posts.map((post: any, i: number) => (
            <Link href={`/${conf.postSettings.slugPrefix}/` + post.metadata.slug} key={`linktopost-${i}`}
                  onClick={() => {
                    gaEvent(`post_list_item_click`, {slug: post.metadata.slug});
                  }}>
              <PostListItem
                post={post}
              />
            </Link>
          ))}
        </div>
      </main>
    </FixedLeftContentWrapper>
  );
};

export async function getStaticProps(context: any) {
  const conf = await getConf();
  console.log('jhlog, the conf is', conf);
  try {
    return {
      props: {
        conf,
        posts: await getFrontPagePosts(),
      },
    };
  } catch (ex) {
    console.log(ex);
    return { notFound: true };
  }
}

export default Home;
