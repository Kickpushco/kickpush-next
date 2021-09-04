import Paragraph from "@components/Paragraph/Paragraph";

import styles from "./Hero.module.scss";

function Hero({ children }) {
  return (
    <section className={styles.Hero}>
      <div className="container">{children}</div>
    </section>
  );
}

export function HeroCopy({ children }) {
  return (
    <Paragraph className={styles.HeroCopy} level="huge">
      {children}
    </Paragraph>
  );
}

export default Hero;
