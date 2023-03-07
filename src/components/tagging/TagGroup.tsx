import Tag from "./Tag";
import styles from '@/styles/tagging/TagGroup.module.scss';
import Link from "next/link";

type Props = {
  tags: string[] | undefined;
};

const TagGroup = ({tags}: Props) => {
  return <div className={styles.main}>
    {
      tags?.map((t, i) => <Link href={`/tags/${t.toLowerCase()}`}><Tag key={`t-${i}`}>#{t}</Tag></Link>)
    }
  </div>;
};

export default TagGroup;
