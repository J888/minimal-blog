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
      {conf.nav.links.map((link: NavLink, i: number) => (
        <Link href={link.href} key={`navlink-${i}`}>
          <NavBarItem>{link.text}</NavBarItem>
        </Link>
      ))}
    </div>
  );
}

export default NavBar;
