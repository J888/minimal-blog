import { ThemeContext } from '@/context/ThemeContext';
import styles from '@/styles/icon/BurgerMenu.module.scss';
import { useContext } from 'react';

type Props = {
  transformed: boolean;
};

const BurgerMenu = ({transformed}: Props) => {
  const appTheme = useContext(ThemeContext);
  const barStyles = {
    backgroundColor: appTheme.textPrimary
  }
  return (
    <div className={styles.main}>
      <div className={transformed ? styles[`bar--transform-r`] : styles.bar} style={barStyles}></div>
      <div className={transformed ? styles[`bar--transform-l`] : styles.bar} style={barStyles}></div>
      <div className={transformed ? styles[`bar--hidden`] : styles.bar} style={barStyles}></div>
    </div>
  );
};

export default BurgerMenu;
