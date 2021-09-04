import clsx from "clsx";

import Heading from "@components/Heading/Heading";

import { CONTACT_EMAIL } from "@utils/constants";

import styles from "./Footer.module.scss";

function Footer() {
  return (
    <footer className={clsx("container", styles.Footer)}>
      <Heading className={styles.Heading} level="h1" tag="p">
        We get back to everyone right away. See for yourself.
      </Heading>
      <Heading className={styles.Email} level="h4" tag="p">
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </Heading>
    </footer>
  );
}

export default Footer;
