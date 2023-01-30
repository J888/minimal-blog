import styles from "@/styles/Footer.module.scss";

interface FooterProps {
  conf: any;
}

const Footer = ({ conf }: FooterProps) => {
  return (
    <div className={styles.main}>
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
  );
};

export default Footer;
