import styles from '@/styles/NavBar.module.scss';
import { Configuration, NavLink } from '@/types/conf';
import { gaEvent } from '@/util/gaUtil';
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

      <Link href={'/'} className={styles.siteLogo} onClick={() => {
        gaEvent(`nav_logo_click_desktop`, {});
      }}>
        <img src={conf.nav.logo.desktop} style={{width: `100%`}}/>
      </Link>

      <Link href={'/'} onClick={() => {
        gaEvent(`nav_logo_click_mobile`, {});
      }}>
        <img src={conf.nav.logo.mobile} className={styles.siteLogoSmall}/>
      </Link>

      <div className={styles.burger}
           onClick={() => {
              gaEvent(`nav_menu_${menuExpanded ? 'close' : 'open'}`, {});
              setMenuExpanded(!menuExpanded);
           }}>
        <BurgerMenu transformed={menuExpanded}/>
      </div>
    
      {
        menuExpanded && <div className={styles.siteLinksContainer}>
        {conf.nav.links.map((link: NavLink, i: number) => (
          <Link href={link.href} key={`navlink-${i}`} onClick={() => {
            gaEvent(`nav_link_click`, {link, order: i + 1});
          }}>
            <NavBarItem>{link.text}</NavBarItem>
          </Link>
        ))}
      </div>
      }


    </div>
  );
}

export default NavBar;
