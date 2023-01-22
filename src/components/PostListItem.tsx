import styles from '@/styles/postlist/PostListItem.module.scss';

interface PostListItemProps {
  post: any;
}

const PostListItem = ({ post }: PostListItemProps) => {
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</p>
      <p>{post.description}</p>
    </div>
  );
}

export default PostListItem;
