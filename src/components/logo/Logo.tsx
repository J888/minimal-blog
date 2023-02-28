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
    <Link href={'/'} className={styles.siteLogo} onClick={() => {
      gaEvent(`nav_logo_click`, {});
    }}>
    <div className={styles.main} style={hideBorder ? {border: 'none'}: {}}>


        {conf.site.name}
    </div>
    </Link>

  );
}

export default Logo;
