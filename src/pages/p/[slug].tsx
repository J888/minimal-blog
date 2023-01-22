import Spacer from "@/components/utility/Spacer";
import SiteWrapper from "@/components/wrappers/SiteWrapper";
import { getConf, getPostBySlug, getPostsFromLocation } from "@/util/dataUtil";
import styles from '@/styles/pages/Slug.module.scss';
import React from "react";
import ReactMarkdown from "react-markdown";
import { AiTwotoneCalendar } from "react-icons/ai";

type Props = {
  conf: any;
  post: any;
};

const Post = ({ conf, post }: Props) => {
  return <SiteWrapper conf={conf} title={post.title + ' | ' + conf.site.name}>
    <Spacer size="sm"/>

    <div className={styles.titleDescContainer}>

      <h2 className={styles.title}>{post.title}</h2>
      <span className={styles.description}>{post.description}</span>
      <Spacer size="xxs"/>

      <div>
        <AiTwotoneCalendar style={{fontSize: '1.5rem'}}/> <span className={styles.date}>{new Date(post.createdAt).toDateString()}</span>
      </div>
      
    
    </div>

    <Spacer size="sm"/>

    <div className={styles.body}>
      <ReactMarkdown>{post.body}</ReactMarkdown>
    </div>
    <Spacer size="sm"/>

  </SiteWrapper>;
};

export async function getStaticProps({ params, preview = false, previewData }: any) {
  const slug: string = params.slug;
  const post = getPostBySlug(slug);
  const conf = getConf();

  return {
    props: {
      conf,
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts = getPostsFromLocation();

  return {
    paths: posts.map(p => ({ params: { slug: p.slug } })),
    fallback: false,
  };
}

export default Post;
