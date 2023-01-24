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
import Image from "next/image";

type Props = {
  conf: any;
  post: any;
};

const Post = ({ conf, post }: Props) => {
  let metadata = post.metadata;
  return <SiteWrapper conf={conf} title={metadata.title + ' | ' + conf.site.name}>
    <Spacer size="sm"/>

    <div className={styles.titleDescContainer}>

      <h2 className={styles.title}>{metadata.title}</h2>
      <span className={styles.description}>{metadata.description}</span>
      <Spacer size="xxs"/>
      
      <div style={{width: '30rem'}}>
        <TagGroup tags={metadata.tags}/>

      </div>
      <Spacer size="sm"/>

      <span className={styles.readTime}>~{metadata.readingTimeMinutes}</span>
      
      <Spacer size="xxs"/>

      <div>
        <AiTwotoneCalendar style={{fontSize: '1.2rem'}}/> <span className={styles.date}>{new Date(metadata.createdAt).toDateString()}</span>
      </div>
      
    
    </div>

    <Spacer size="sm"/>

    <div className={styles.body}>
      {
        post.parts.map((part: any, i: number) => {

          if (part.type === "MARKDOWN") {
            return (
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
                  },
                }}
              >
                {part.body}
              </ReactMarkdown>
            );
          } else if (part.type === 'IMAGE') {
            return (
              <Image
                alt={'testalt'}
                src={part.url}
                height={part.dimensions.height}
                width={part.dimensions.width}
              />
            )
          };
        })
      }
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
  console.log(posts)

  return {
    paths: posts.map(p => ({ params: { slug: p.metadata.slug } })),
    fallback: false,
  };
}

export default Post;
