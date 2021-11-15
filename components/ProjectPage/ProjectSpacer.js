import { forwardRef } from "react";

import styles from "./ProjectSpacer.module.scss";

const ProjectSpacer = forwardRef(({}, ref) => {
  return <span className={styles.Spacer} ref={ref} />;
});

ProjectSpacer.displayName = "ProjectSpacer";

export default ProjectSpacer;
