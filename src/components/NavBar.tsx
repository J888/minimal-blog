import styles from "@/styles/NavBar.module.scss";
import { Configuration, NavLink } from "@/types/conf";
import { gaEvent } from "@/util/gaUtil";
import Link from "next/link";
import { useState } from "react";
import BurgerMenu from "./icon/BurgerMenu";
import Logo from "./logo/Logo";
import NavBarItem from "./NavBarItem";

interface NavBarProps {
  conf: Configuration;
}

const NavBar = ({ conf }: NavBarProps) => {
  const [menuExpanded, setMenuExpanded] = useState(false);

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <Logo conf={conf} />
      </div>
      <div className={styles.navLinksFullScreen}>
        {conf.nav.links.map((link: NavLink, i: number) => (
          <Link
            href={link.href}
            key={`navlink-${i}`}
            onClick={() => {
              gaEvent(`nav_link_click`, { link, order: i + 1 });
            }}
          >
            <NavBarItem>{link.text}</NavBarItem>
          </Link>
        ))}
      </div>
      <div
        className={styles.burger}
        onClick={() => {
          gaEvent(`nav_menu_${menuExpanded ? "close" : "open"}`, {});
          setMenuExpanded(!menuExpanded);
        }}
      >
        <div className={styles.burgerStack}>
        <BurgerMenu transformed={menuExpanded} />
        </div>
        <div className={styles.dropdownMenu}>
          {menuExpanded && (
            <div className={styles.siteLinksContainer}>
              {conf.nav.links.map((link: NavLink, i: number) => (
                <Link
                  href={link.href}
                  key={`navlink-${i}`}
                  onClick={() => {
                    gaEvent(`nav_link_click`, { link, order: i + 1 });
                  }}
                >
                  <NavBarItem>{link.text}</NavBarItem>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
