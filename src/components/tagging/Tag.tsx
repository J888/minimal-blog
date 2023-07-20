import { ThemeContext } from '@/context/ThemeContext';
import styles from '@/styles/tagging/Tag.module.scss';
import { useContext } from 'react';

type Props = {
  children: React.ReactNode;
};

const Tag = ({children}: Props) => {
  const appTheme = useContext(ThemeContext);

  return <span className={styles.main} style={{
    backgroundColor: appTheme.backgroundTertiary
  }}>{children}</span>;
};

export default Tag;
