import styles from '@/styles/icon/BurgerMenu.module.scss';

type Props = {
  transformed: boolean;
};

const BurgerMenu = ({transformed}: Props) => {

  return (
    <div className={styles.main}>
      <div className={transformed ? styles[`bar--transform-r`] : styles.bar}></div>
      <div className={transformed ? styles[`bar--transform-l`] : styles.bar}></div>
      <div className={transformed ? styles[`bar--hidden`] : styles.bar}></div>
    </div>
  );
};

export default BurgerMenu;
