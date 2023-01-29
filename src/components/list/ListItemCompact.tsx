import styles from '@/styles/list/ListItemCompact.module.scss';
import { Post } from '@/types/post/post';

type Props = {
  post: Post;
};

const ListItemCompact = ({post}: Props) => {
  let metadata = post.metadata;

  return (
    <div className={styles.main}>

      <div>        
        <h2 className={styles.title}>{metadata.title}</h2>
        <p className={styles.desc}>{metadata.description}</p> 
      </div>


      <div className={styles.meta}>
        <p className={styles.date}>{new Date(metadata.createdAt as string).toLocaleDateString()} | {metadata.category}</p>
      </div>

    </div>
  );
};

export default ListItemCompact;
