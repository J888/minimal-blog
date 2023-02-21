import { Configuration } from '@/types/conf';
import { gaEvent } from '@/util/gaUtil';
import Link from 'next/link';
import { useState } from 'react';
import styles from '@/styles/logo/Logo.module.scss';

interface Props {
  conf: Configuration
  hideBorder?: boolean;
}

const Logo = ({ conf, hideBorder }: Props) => {
  
  return (
   
    <div className={styles.main} style={hideBorder ? {border: 'none'}: {}}>

      <Link href={'/'} className={styles.siteLogo} onClick={() => {
        gaEvent(`nav_logo_click`, {});
      }}>
        {conf.site.name}
      </Link>
    </div>
  );
}

export default Logo;
