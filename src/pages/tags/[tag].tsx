import Spacer from "@/components/utility/Spacer";
import { getConf, getPostsByTag, getPostsFromLocation } from "@/util/dataUtil";
import styles from '@/styles/pages/ByTag.module.scss';
import React from "react";
import { Configuration } from "@/types/conf";
import { Post } from "@/types/post/post";
import FixedLeftContentWrapper from "@/components/wrappers/FixedLeftContentWrapper";
import PlainBox from "@/components/box/PlainBox";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import { gaEvent } from "@/util/gaUtil";
import PostListItem from "@/components/PostListItem";
import Tag from "@/components/tagging/Tag";

type Props = {
  conf: Configuration;
  posts: Post[];
  tag: string;
};

const ByTag = ({ conf, tag, posts }: Props) => {
  return <FixedLeftContentWrapper conf={conf} title={'Home' + ' | ' + conf.site.name} description={`The homepage of ${conf.site.name}`}
  leftSidebarContent={
    <PlainBox style={{marginLeft: '10%', height: 'fit-content'}}>
    {`You're browsing ${posts.length} post${posts.length > 1 ? `s`: ``} tagged`}{` `}
    <Link href={`/tags/${tag}`}><Tag>{`#${tag}`}</Tag></Link>
   </PlainBox>
  }>
  <Spacer size="xxs" />

  <main className={styles.main}>

    <SectionHeading>{`#${tag}`}</SectionHeading>
    <Spacer size="xxs" />
    <div className={styles.postList}>
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
};

export async function getStaticProps({ params, preview = false, previewData }: any) {
  const tag: string = params.tag;
  const posts: Post[] = await getPostsByTag(tag);
  const conf: Configuration | {} = await getConf();

  return {
    props: {
      conf,
      posts,
      tag
    },
  };
}

export async function getStaticPaths() {
  const posts: Post[] = await getPostsFromLocation();

  const tags: string[] = posts.reduce(
    (accumulator: string[], currentValue: Post) => {
      for (let tag of currentValue.metadata.tags || []) {
        if (!accumulator.includes(tag.toLowerCase())) {
          accumulator.push(tag.toLowerCase());
        }
      }
      return accumulator;
    },
    []
  );
  console.log(tags);
  return {
    paths: tags.map(tag => ({ params: { tag } })),
    fallback: false,
  };
}

export default ByTag;
