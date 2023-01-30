import styles from '@/styles/postlist/PostListItem.module.scss';
import { Post, PostMetadata } from '@/types/post/post';
import Image from 'next/image';

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
  let metadata: PostMetadata = post.metadata;
  
  return (
    <div className={styles.main}>
      <div className={styles.topImg}>
        <Image
          src={metadata.mainImg || 'https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg'}
          alt={'test'}
          style={{objectFit: 'cover'}}
          quality={50}
          fill/>
  
      </div>

      <div className={styles.metaContainer}>
        <h2 className={styles.title}>{metadata.title}</h2>
        <p className={styles.category}>Category: {metadata.category}</p>
        <p className={styles.date}>{new Date(metadata.createdAt as string).toLocaleDateString()}</p>
        <p className={styles.description}>{metadata.description}</p>
      </div>

    </div>
  );
}

export default PostListItem;
