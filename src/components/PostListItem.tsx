import styles from '@/styles/postlist/PostListItem.module.scss';

interface PostListItemProps {
  post: any;
}

const PostListItem = ({ post }: PostListItemProps) => {
  let titleShort = post.title;
  let descShort = post.description;
  if (post.title.length > 26) {
    titleShort = `${post.title.substring(0,26)}...`
  }
  if (post.description.length > 40) {
    descShort = `${post.description.substring(0,40)}...`
  }
  return (
    <div className={styles.main}>
      <h2 className={styles.title}>{titleShort}</h2>
      <p className={styles.date}>{new Date(post.createdAt).toLocaleDateString()}</p>
      <p>{descShort}</p>
    </div>
  );
}

export default PostListItem;
