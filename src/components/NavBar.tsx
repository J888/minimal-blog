import styles from '@/styles/NavBar.module.scss';
import Link from 'next/link';
import NavBarItem from './NavBarItem';

interface NavBarProps {
  conf: any;
}

const NavBar = ({ conf }: NavBarProps) => {
  return (
    <div className={styles.main}>
      {conf.nav.links.map((link: any, i: number) => (
        <Link href={link.href} key={`navlink-${i}`}>
          <NavBarItem>{link.text}</NavBarItem>
        </Link>
      ))}
    </div>
  );
}

export default NavBar;
