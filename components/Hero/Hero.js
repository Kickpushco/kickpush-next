import Paragraph from "components/Paragraph/Paragraph";
import clsx from "clsx";

import styles from "./Hero.module.scss";

function Hero({ children }) {
  return (
    <section className={styles.Hero}>
      <div className={clsx("container", styles.Container)}>{children}</div>
    </section>
  );
}

export function HeroCopy({ children }) {
  return (
    <Paragraph className={styles.Copy} level="huge">
      {children}
    </Paragraph>
  );
}

export default Hero;
