import clsx from "clsx";
import { useInView } from "react-intersection-observer";

import Heading from "components/Heading/Heading";

import styles from "./Manifesto.module.scss";

function Manifesto({ className, long }) {
  const [manifestoRef, manifestoInView] = useInView({
    triggerOnce: true,
  });

  return (
    <div
      className={clsx(
        className,
        styles.Wrapper,
        manifestoInView && styles["Wrapper-inView"]
      )}
      ref={manifestoRef}
    >
      <Heading className={styles.Long} level="h1" tag="p">
        {long}
      </Heading>
    </div>
  );
}

export default Manifesto;
