import { ThemeContext } from '@/context/ThemeContext';
import styles from '@/styles/SectionHeading.module.scss';
import { useContext } from 'react';

interface SectionHeadingProps {
  children: React.ReactNode,
}

const SectionHeading = ({ children }: SectionHeadingProps) => {
  const appTheme = useContext(ThemeContext);

  return (
    <div className={styles.main} style={{
      color: appTheme.textHeadingPrimary
    }}>
      {children}
    </div>
  );
}

export default SectionHeading;
