import Spacer from "@/components/utility/Spacer";
import SiteWrapper from "@/components/wrappers/SiteWrapper";
import { getConf, getPostBySlug, getPostsFromLocation } from "@/util/dataUtil";
import styles from '@/styles/pages/Slug.module.scss';
import React from "react";
import ReactMarkdown from "react-markdown";
import { AiTwotoneCalendar } from "react-icons/ai";

import { monokaiSublime } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import TagGroup from "@/components/tagging/TagGroup";

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
      
      <div style={{width: '30rem'}}>
        <TagGroup tags={post.tags}/>

      </div>
      <Spacer size="sm"/>

      <span className={styles.readTime}>~{post.readingTimeMinutes}</span>
      
      <Spacer size="xxs"/>

      <div>
        <AiTwotoneCalendar style={{fontSize: '1.2rem'}}/> <span className={styles.date}>{new Date(post.createdAt).toDateString()}</span>
      </div>
      
    
    </div>

    <Spacer size="sm"/>

    <div className={styles.body}>
      <ReactMarkdown

        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");

            return !inline && match ? (
              <SyntaxHighlighter
                // @ts-expect-error -- I don't know what this is
                style={monokaiSublime}
                PreTag="div"
                language={match[1]}
                children={String(children).replace(/\n$/, "")}
                {...props}
              />
            ) : (
              <code className={className ? className : ""} {...props}>
                {children}
              </code>
            );
          }
        }}
      >
        {post.body}
      </ReactMarkdown>
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
