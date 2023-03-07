import { getConf, getPostsFromLocation } from "@/util/dataUtil";
import styles from "@/styles/All.module.scss";
import React from "react";
import { Configuration } from "@/types/conf";
import { Post } from "@/types/post/post";
import ListItemCompact from "@/components/list/ListItemCompact";
import FixedLeftContentWrapper from "@/components/wrappers/FixedLeftContentWrapper";

type Props = {
  conf: Configuration;
  posts: Post[];
};

const All = ({ conf, posts }: Props) => {
  return (
    <FixedLeftContentWrapper
      conf={conf}
      title={"All" + " | " + conf.site.name}
      description={`All posts from ${conf.site.name}`}
    >
      <h2 className={styles.pageHeading}>ALL</h2>
      <p className={styles.postCount}>Showing {posts.length} posts</p>
      <div className={styles.compactPostList}>
        {posts.map((p: Post, i: number) => {
          return (
            <div key={`all-p-${i}`}>
              <ListItemCompact post={p} />
            </div>
          );
        })}
      </div>
    </FixedLeftContentWrapper>
  );
};

export async function getStaticProps({
  params,
  preview = false,
  previewData,
}: any) {
  return {
    props: {
      conf: await getConf(),
      posts: await getPostsFromLocation(),
    },
  };
}

export default All;
