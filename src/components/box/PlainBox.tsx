import styles from '@/styles/box/PlainBox.module.scss';
import { CSSProperties } from 'react';

type Props = {
  children: React.ReactNode;
  style?: CSSProperties;
};

const PlainBox = ({children, style = {}}: Props) => {

  return (
    <div className={styles.main} style={style}>
      {children}
    </div>
  );
};

export default PlainBox;
