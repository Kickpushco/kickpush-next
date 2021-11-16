import clsx from "clsx";

import styles from "./PrivacyPolicy.module.scss";

function PrivacyPolicy({ className, enablePolicy, ...props }) {
  if (!enablePolicy) return null;

  // Privacy Policy code kept in case required at a later date
  return (
    <div className={clsx(className, styles.PrivacyPolicy)} {...props}>
      <small className="container">
        <span>&copy; Kickpush {new Date().getFullYear()}</span>
        <a
          href="https://www.iubenda.com/privacy-policy/7773310"
          target="_blank"
          rel="noopener"
        >
          Privacy Policy
        </a>
      </small>
    </div>
  );
}

export default PrivacyPolicy;
