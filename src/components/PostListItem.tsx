import styles from '@/styles/postlist/PostListItem.module.scss';
import { Post } from '@/types/post/post';

interface PostListItemProps {
  post: Post;
}

const PostListItem = ({ post }: PostListItemProps) => {
  let metadata = post.metadata;
  let titleShort = metadata.title;
  let descShort = metadata.description;
  if (metadata.title && metadata.title.length > 40) {
    titleShort = `${metadata.title.substring(0,40)}...`
  }
  if (metadata.description && metadata.description.length > 40) {
    descShort = `${metadata.description.substring(0,40)}...`
  }
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>{titleShort}</h2>
      <p className={styles.category}>Category: {metadata.category}</p>
      <p className={styles.date}>{new Date(metadata.createdAt as string).toLocaleDateString()}</p>
      <p>{descShort}</p>
    </div>
  );
}

export default PostListItem;
