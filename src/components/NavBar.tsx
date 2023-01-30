import styles from '@/styles/NavBar.module.scss';
import { Configuration, NavLink } from '@/types/conf';
import Link from 'next/link';
import { useState } from 'react';
import BurgerMenu from './icon/BurgerMenu';
import NavBarItem from './NavBarItem';

interface NavBarProps {
  conf: Configuration;
}

const NavBar = ({ conf }: NavBarProps) => {
  
  const [menuExpanded, setMenuExpanded] = useState(false);

  return (
    <div className={styles.main}>


      <Link href={'/'} className={styles.siteLogo}>
        <img src={conf.nav.logo.desktop} style={{width: `100%`}}/>
      </Link>

      <Link href={'/'}>
        <img src={conf.nav.logo.mobile} className={styles.siteLogoSmall}/>
      </Link>

      <div className={styles.burger} onClick={() => {setMenuExpanded(!menuExpanded)}}>
        <BurgerMenu transformed={menuExpanded}/>
      </div>
    
      {
        menuExpanded && <div className={styles.siteLinksContainer}>
        {conf.nav.links.map((link: NavLink, i: number) => (
          <Link href={link.href} key={`navlink-${i}`}>
            <NavBarItem>{link.text}</NavBarItem>
          </Link>
        ))}
      </div>
      }


    </div>
  );
}

export default NavBar;
