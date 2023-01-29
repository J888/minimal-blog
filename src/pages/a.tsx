import SiteWrapper from "@/components/wrappers/SiteWrapper";
import { getConf, getPostsFromLocation } from "@/util/dataUtil";
import styles from '@/styles/All.module.scss';
import React from "react";
import { Configuration } from "@/types/conf";
import { Post } from "@/types/post/post";
import ListItemCompact from "@/components/list/ListItemCompact";
import Link from "next/link";

type Props = {
  conf: Configuration;
  posts: Post[];
};

const All = ({ conf, posts }: Props) => {

  return <SiteWrapper conf={conf} title={'All' + ' | ' + conf.site.name}>
    <h2 className={styles.pageHeading}>ALL POSTS</h2>
    <p className={styles.postCount}>{posts.length} total</p>
    <div className={styles.compactPostList}>
      {
        posts.map((p: Post, i: number) => {
          return <Link key={`all-p-${i}`} href={`/p/${p.metadata.slug}`}>
            <ListItemCompact post={p}/>
          </Link>
        })
      }
    </div>

  </SiteWrapper>;
};

export async function getStaticProps({ params, preview = false, previewData }: any) {

  return {
    props: {
      conf: getConf(),
      posts: getPostsFromLocation(),
    },
  };
}


export default All;
