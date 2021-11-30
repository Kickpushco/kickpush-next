import clsx from "clsx";

import Paragraph from "components/Paragraph/Paragraph";

import styles from "./Hero.module.scss";

function Hero({ className, containerClassName, children, noNav, ...props }) {
  return (
    <section
      className={clsx(className, styles.Hero, noNav && styles["Hero-noNav"])}
      {...props}
    >
      <div className={clsx("container", containerClassName, styles.Container)}>
        {children}
      </div>
    </section>
  );
}

export function HeroCopy({ className, children }) {
  return (
    <Paragraph className={clsx(className, styles.Copy)} level="huge">
      {children}
    </Paragraph>
  );
}

export default Hero;
