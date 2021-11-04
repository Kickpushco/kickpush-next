import clsx from "clsx";

import { CONTACT_EMAIL } from "utils/constants";

import Heading from "components/Heading/Heading";

import styles from "./Footer.module.scss";

function Footer({ contact }) {
  if (!contact) return null;

  return (
    <footer className={clsx("container", styles.Footer)}>
      <Heading className={styles.Heading} level="h1" tag="p">
        {contact.fields.heroTitle}
      </Heading>
      <Heading className={styles.Email} level="h4" tag="p">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </Heading>
    </footer>
  );
}

export default Footer;
