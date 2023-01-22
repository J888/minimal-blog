import styles from '@/styles/NavBarItem.module.scss';

interface NavBarItemProps {
  children: React.ReactNode
}

const NavBarItem = ({ children }: NavBarItemProps) => {
  return (
    <div className={styles.main}>
      {children}
    </div>
  );
}

export default NavBarItem;
