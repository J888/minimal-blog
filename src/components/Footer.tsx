import styles from "@/styles/Footer.module.scss";
import Logo from "./logo/Logo";

interface FooterProps {
  conf: any;
}

const Footer = ({ conf }: FooterProps) => {
  return (
    <div className={styles.main}>
      <div className={styles.contentFarLeft}>
        <p>
          Ⓒ {conf.site.name} {new Date().getFullYear()}
        </p>
        <p>
          <a href={conf.socials.linkedin} className={styles.socials}>
            Connect on LinkedIn
          </a>
        </p>
        <p>
          <a href={conf.socials.github} className={styles.socials}>
            Check out my GitHub
          </a>
        </p>
        <p>
          <a href={conf.other.sourceCodeUrl} className={styles.socials}>
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
