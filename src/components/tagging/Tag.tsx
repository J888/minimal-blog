import styles from '@/styles/tagging/Tag.module.scss';

type Props = {
  children: React.ReactNode;
};

const Tag = ({children}: Props) => {
  return <span className={styles.main}>{children}</span>;
};

export default Tag;
