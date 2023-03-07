import styles from "@/styles/list/ListItemCompact.module.scss";
import { Post } from "@/types/post/post";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";

type Props = {
  post?: Post;
  imageSize?: {
    width: number;
    height: number;
  };
  displayDescription?: boolean;
  displayMetadata?: boolean;
  descriptionStyle?: CSSProperties;
  titleStyle?: CSSProperties;
};

const ListItemCompact = ({
  post,
  imageSize,
  descriptionStyle = {},
  titleStyle = {},
  displayDescription = true,
  displayMetadata = true,
}: Props) => {
  let metadata = post?.metadata;

  let imageWidth = imageSize?.width || 150;
  let imageHeight = imageSize?.height || 100;
  
  return (
    <Link href={`/posts/${post?.metadata.slug}`}>
      <div className={styles.main}>
        <Image
          src={
            metadata?.mainImg ||
            "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
          }
          alt={"test"}
          style={{ objectFit: "cover" }}
          quality={50}
          width={imageWidth}
          height={imageHeight}
        />
        <div className={styles.rightSide}>
          <h2 className={styles.title} style={titleStyle}>
            {metadata?.title}
          </h2>
          {displayDescription && (
            <p className={styles.desc} style={descriptionStyle}>
              {metadata?.description}
            </p>
          )}
          {displayMetadata && (
            <div className={styles.meta}>
              <p className={styles.date}>
                {new Date(metadata?.createdAt as string).toLocaleDateString()} |{" "}
                {metadata?.category}
              </p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ListItemCompact;
