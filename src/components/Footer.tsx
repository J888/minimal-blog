import styles from "@/styles/Footer.module.scss";
import Logo from "./logo/Logo";
import { CSSProperties, useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";

interface FooterProps {
  conf: any;
}

const Footer = ({ conf }: FooterProps) => {
  const appStyle = useContext(ThemeContext);
  const linkStyle: CSSProperties = {
    color: appStyle.textLink
  };

  return (
    <div className={styles.main}>
      <div className={styles.contentFarLeft}>
        <p style={{color: appStyle.textPrimary}}>
          Ⓒ {conf.site.name} {new Date().getFullYear()}
        </p>
        <p>
          <a href={conf.socials.linkedin} className={styles.socials} style={linkStyle}>
            Connect on LinkedIn
          </a>
        </p>
        <p>
          <a href={conf.socials.github} className={styles.socials} style={linkStyle}>
            Check out my GitHub
          </a>
        </p>
        <p>
          <a href={conf.other.sourceCodeUrl} className={styles.socials} style={linkStyle}>
            View source code
          </a>
        </p>
      </div>
      <div className={styles.contentMiddle}>
        <Logo conf={conf} hideBorder={true}/>
      </div>
      <div className={styles.contentFarRight}>
        <button
          className={styles.scrollToTopButton}
          onClick={() => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            })
          }}
        >Back to top</button>
      </div>

    </div>
  );
};

export default Footer;
