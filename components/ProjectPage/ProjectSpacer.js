import { forwardRef } from "react";
import clsx from "clsx";

import styles from "./ProjectSpacer.module.scss";

const ProjectSpacer = forwardRef(({ className, ...props }, ref) => {
  return (
    <span className={clsx(className, styles.Spacer)} ref={ref} {...props} />
  );
});

ProjectSpacer.displayName = "ProjectSpacer";

export default ProjectSpacer;
