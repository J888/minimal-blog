
import styles from "@/styles/Home.module.scss";
import PostListItem from "@/components/PostListItem";
import Spacer from "@/components/utility/Spacer";
import SectionHeading from "@/components/SectionHeading";
import { getConf, getPostsFromLocation } from "@/util/dataUtil";
import Link from "next/link";
import SiteWrapper from "@/components/wrappers/SiteWrapper";

const Home = ({ conf, posts }: any) => {
  return (
    <SiteWrapper conf={conf} title={'Home' + ' | ' + conf.site.name}>
      <Spacer size="xxs" />

      <main className={styles.main}>
        <div className={styles.siteDesc}>
          {
            conf.frontPage.paragraphs.map((p: String, i: number) => <p key={`para-${i}`}>{p}</p>)
          }

        </div>

        <Spacer size="sm" />

        <div>
          <SectionHeading>Posts</SectionHeading>
          <Spacer size="xxs" />
          <div className={styles.postList}>
            {posts.map((post: any, i: number) => (
              <Link href={"/p/" + post.slug} key={`linktopost-${i}`}>
                <PostListItem
                  post={post}
                />
              </Link>
            ))}
          </div>
        </div>
      </main>
    </SiteWrapper>
  );
};

export async function getStaticProps(context: any) {

  try {
    return {
      props: {
        conf: getConf(),
        posts: getPostsFromLocation(),
      },
    };
  } catch (ex) {
    console.log(ex);
    return { notFound: true };
  }

}

export default Home;
