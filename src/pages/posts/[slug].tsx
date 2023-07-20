import Spacer from "@/components/utility/Spacer";
import { getConf, getPostBySlug, getPostsFromLocation } from "@/util/dataUtil";
import styles from '@/styles/pages/Slug.module.scss';
import React, { useContext } from "react";
import ReactMarkdown from "react-markdown";
import { AiTwotoneCalendar } from "react-icons/ai";

import { monokaiSublime } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import SyntaxHighlighter from "react-syntax-highlighter/dist/cjs/default-highlight";
import TagGroup from "@/components/tagging/TagGroup";
import Image from "next/image";
import { Configuration } from "@/types/conf";
import { Post } from "@/types/post/post";
import FixedLeftContentWrapper from "@/components/wrappers/FixedLeftContentWrapper";
import PlainBox from "@/components/box/PlainBox";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  conf: Configuration;
  post: Post;
};

const Post = ({ conf, post }: Props) => {
  let metadata = post.metadata;
  let { notes } = metadata;
  const appTheme = useContext(ThemeContext);

  return <FixedLeftContentWrapper conf={conf} title={metadata.title + ' | ' + conf.site.name} post={post}
         leftSidebarContent={
          notes?.map((note, index) => (
            <>
              <PlainBox key={`post-note-${index}`} style={{marginLeft: '10%'}}>
                {note}
              </PlainBox>
              <Spacer size="sm"/>
            </>
          ))
         }>

    <div className={styles.titleDescContainer}>

      <h1 className={styles.title} style={{
        color: appTheme.textHeadingPrimary,
      }}>{metadata.title}</h1>
      <span className={styles.description} style={{color: appTheme.textHeadingSecondary}}>{metadata.description}</span>
      <Spacer size="xs"/>
      
      <div style={{width: 'fit-content'}}>
        <TagGroup tags={metadata.tags?.map(t => t.replace(/ /g, '') ) }/>

      </div>
      <Spacer size="sm"/>

      <span className={styles.readTime}>{metadata.readTime}</span>
      
      <Spacer size="xxs"/>

      <div>
        <AiTwotoneCalendar style={{fontSize: '1.2rem'}}/> <span className={styles.date}>{new Date(metadata.createdAt as string).toDateString()}</span>
      </div>
      
    
    </div>

    <Spacer size="sm"/>

    <div className={styles.body} style={{
      color: appTheme.textBody,
    }}>
      {
        post.parts.map((part: any, i: number) => {

          if (part.type === "MARKDOWN") {
            return (
              <ReactMarkdown
                key={`md-part-${i}`}
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
                      <code className={className ? className : styles.genericCode} {...props}
                        style={{
                          backgroundColor: appTheme.backgroundTertiary
                        }}
                      >
                        {children}
                      </code>
                    );
                  },
                  a: ({node, ...props}) => <a {...props} style={{
                    color: appTheme.textLink
                  }}></a>
                }}     
              >
                {part.body}
              </ReactMarkdown>
            );
          } else if (part.type === 'IMAGE' && !part.hideOnPostBody) {
            return (
      
              <div style={{position: 'relative', height: `60vw`, maxHeight: `40rem`}}
                   key={`img-part-${i}`}>
                <Image
                  alt={`image for ${post.metadata.title}`}
                  src={part.url}
                  style={{objectFit: 'contain'}}
                  fill
                  
                  // height and width are not used if fill and objectFit are used (above)
                  // but I still use height for the parent container because it's useful
                  //     (not setting height on the parent makes the whole thing go away)
                  // height={part.dimensions.height}
                  // width={part.dimensions.width}
                  quality={part.quality || 65}
                />
              </div>
         
            )
          };
        })
      }
    </div>
    <Spacer size="sm"/>
    <span className={styles.inCategory}>In category: {post.metadata.category}</span>

  </FixedLeftContentWrapper>;
};

export async function getStaticProps({ params, preview = false, previewData }: any) {
  const slug: string = params.slug;
  const post: Post | undefined = await getPostBySlug(slug);
  const conf: Configuration | {} = await getConf();

  return {
    props: {
      conf,
      post,
    },
  };
}

export async function getStaticPaths() {
  const posts: Post[] = await getPostsFromLocation();

  return {
    paths: posts.map(p => ({ params: { slug: p.metadata.slug } })),
    fallback: false,
  };
}

export default Post;
