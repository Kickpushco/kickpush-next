import clsx from "clsx";

import styles from "./CardsWrapper.module.scss";

function CardsWrapper({ className, children, ...props }) {
  return (
    <div className={clsx(className, styles.CardsWrapper)} {...props}>
      {children}
    </div>
  );
}

export default CardsWrapper;
