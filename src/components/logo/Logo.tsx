import { Configuration } from '@/types/conf';
import { gaEvent } from '@/util/gaUtil';
import Link from 'next/link';
import { CSSProperties, useContext, useState } from 'react';
import styles from '@/styles/logo/Logo.module.scss';
import { ThemeContext } from '@/context/ThemeContext';

interface Props {
  conf: Configuration
  hideBorder?: boolean;
}

const Logo = ({ conf, hideBorder }: Props) => {
  const appTheme = useContext(ThemeContext);
  const logoStyle: CSSProperties = {
    border: hideBorder ? 'none' : `2.1px solid ${appTheme.navBackground}`,
    backgroundColor: appTheme.backgroundPrimary,
    color: appTheme.textHeadingPrimary
  };

  return (
    <Link href={'/'} className={styles.siteLogo} onClick={() => {
      gaEvent(`nav_logo_click`, {});
    }}>
    <div className={styles.main} style={logoStyle}>
        {conf.site.name}
    </div>
    </Link>

  );
}

export default Logo;
