import clsx from "clsx";

import { CONTACT_EMAIL } from "utils/constants";

import Heading from "components/Heading/Heading";

import styles from "./Footer.module.scss";

function Footer({ className, contact, isHero, ...props }) {
  if (!contact) return null;

  const headingTag = isHero ? "h1" : "p";

  return (
    <footer
      className={clsx(
        className,
        "container",
        styles.Footer,
        isHero && styles["Footer-hero"]
      )}
      {...props}
    >
      <Heading className={styles.Heading} level="h1" tag={headingTag}>
        {contact.fields.heroTitle}
      </Heading>
      <Heading className={styles.Email} level="h4" tag="p">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </Heading>
    </footer>
  );
}

export default Footer;
