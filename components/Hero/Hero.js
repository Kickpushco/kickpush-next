import clsx from "clsx";

import Heading from "components/Heading/Heading";
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

export function HeroTitle({ className, isLarge = true, ...props }) {
  return (
    <Heading
      className={clsx(
        className,
        styles.Title,
        isLarge && styles["Title-large"]
      )}
      level="h1"
      {...props}
    />
  );
}

export function HeroCopy({ className, ...props }) {
  return (
    <Paragraph
      className={clsx(className, styles.Copy)}
      level="huge"
      {...props}
    />
  );
}

export default Hero;
