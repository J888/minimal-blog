import styles from '@/styles/SectionHeading.module.scss';

interface SectionHeadingProps {
  children: React.ReactNode,
}

const SectionHeading = ({ children }: SectionHeadingProps) => {
  return (
    <div className={styles.main}>
      {children}
    </div>
  );
}

export default SectionHeading;
