import styles from '@/styles/postlist/PostListItem.module.scss';

interface PostListItemProps {
  post: any;
}

const PostListItem = ({ post }: PostListItemProps) => {
  let metadata = post.metadata;
  let titleShort = metadata.title;
  let descShort = metadata.description;
  if (metadata.title.length > 26) {
    titleShort = `${metadata.title.substring(0,26)}...`
  }
  if (metadata.description.length > 40) {
    descShort = `${metadata.description.substring(0,40)}...`
  }
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>{titleShort}</h2>
      <p className={styles.category}>#{metadata.category}</p>
      <p className={styles.date}>{new Date(metadata.createdAt).toLocaleDateString()}</p>
      <p>{descShort}</p>
    </div>
  );
}

export default PostListItem;
