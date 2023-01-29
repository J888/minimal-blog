import styles from '@/styles/NavBar.module.scss';
import { Configuration, NavLink } from '@/types/conf';
import Link from 'next/link';
import NavBarItem from './NavBarItem';

interface NavBarProps {
  conf: Configuration;
}

const NavBar = ({ conf }: NavBarProps) => {
 
  return (
    <div className={styles.main}>
      <Link href={'/'}>
        <img src="https://sdt-pub1.s3.amazonaws.com/imgs/sitelogo.png" className={styles.siteLogo}/>
      </Link>

      <Link href={'/'}>
        <img src="https://sdt-pub1.s3.amazonaws.com/imgs/sitelogosmall.png" className={styles.siteLogoSmall}/>
      </Link>

      <div className={styles.siteLinksContainer}>
        {conf.nav.links.map((link: NavLink, i: number) => (
          <Link href={link.href} key={`navlink-${i}`}>
            <NavBarItem>{link.text}</NavBarItem>
          </Link>
        ))}
      </div>

    </div>
  );
}

export default NavBar;
