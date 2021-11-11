import clsx from "clsx";

import Heading from "components/Heading/Heading";

import styles from "./Manifesto.module.scss";

function Manifesto({ className, short, long }) {
  return (
    <div className={clsx(className, styles.Wrapper)}>
      {/* TODO: Add shortAs */}
      <Heading className={styles.Short} level="h4" tag="h3">
        {short}
      </Heading>
      <Heading className={styles.Long} level="h2" tag="p">
        {long}
      </Heading>
    </div>
  );
}

export default Manifesto;
