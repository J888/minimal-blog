import Tag from "./Tag";
import styles from '@/styles/tagging/TagGroup.module.scss';

type Props = {
  tags: string[] | undefined;
};

const TagGroup = ({tags}: Props) => {
  return <div className={styles.main}>
    {
      tags?.map((t, i) => <Tag key={`t-${i}`}>#{t}</Tag>)
    }
  </div>;
};

export default TagGroup;
