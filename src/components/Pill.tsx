import styles from '@/styles/Pill.module.scss';

interface PillProps {
  children: React.ReactNode,
}

const Pill = ({ children }: PillProps) => {
  return (
    <span className={styles.main}>
      {children}
    </span>
  );
}

export default Pill;
