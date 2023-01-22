import styles from '@/styles/Pill.module.scss';

interface PillProps {
  children: React.ReactNode,
}

const Pill = ({ children }: PillProps) => {
  return (
    <div className={styles.main}>
      {children}
    </div>
  );
}

export default Pill;
