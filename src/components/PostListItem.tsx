import { ThemeContext } from '@/context/ThemeContext';
import styles from '@/styles/postlist/PostListItem.module.scss';
import { Post, PostMetadata } from '@/types/post/post';
import Image from 'next/image';
import { useContext } from 'react';

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
  let metadata: PostMetadata = post.metadata;
  const appTheme = useContext(ThemeContext);

  const secondaryTextStyles = {
    color: appTheme.textSecondary
  };
  
  return (
    <div className={styles.main} style={{
      backgroundColor: appTheme.backgroundSecondary
    }}>
      <div className={styles.topImg}>
        <Image
          src={metadata.mainImg || 'https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg'}
          alt={'test'}
          style={{objectFit: 'cover'}}
          quality={50}
          fill/>
  
      </div>

      <div className={styles.metaContainer}>
        <h2 className={styles.title} style={{
          color: appTheme.textHeadingSecondary
        }}>{metadata.title}</h2>
        <p style={secondaryTextStyles}>Category: {metadata.category}</p>
        <p className={styles.date}
           style={{
            color: appTheme.textSecondarySubtitle
           }}
        >
          {new Date(metadata.createdAt as string).toLocaleDateString()}
        </p>
        <p style={secondaryTextStyles}>{metadata.description}</p>
      </div>

    </div>
  );
}

export default PostListItem;
