import Heading from "@components/Heading/Heading";

import styles from "./Manifesto.module.scss";

function Manifesto({ short, long, ...props }) {
  return (
    <div {...props}>
      {/* TODO: Add shortAs */}
      <Heading className={styles.Short} level="h4" tag="h3">
        {short}
      </Heading>
      <Heading level="h2" tag="p">
        {long}
      </Heading>
    </div>
  );
}

export default Manifesto;
