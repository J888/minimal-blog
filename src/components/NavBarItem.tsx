import { ThemeContext } from '@/context/ThemeContext';
import styles from '@/styles/NavBarItem.module.scss';
import { useContext } from 'react';

interface NavBarItemProps {
  children: React.ReactNode
}

const NavBarItem = ({ children }: NavBarItemProps) => {
  const appTheme = useContext(ThemeContext);

  return (
    <div className={styles.main} style={{
      color: appTheme.textPrimary
    }}>
      {children}
    </div>
  );
}

export default NavBarItem;
