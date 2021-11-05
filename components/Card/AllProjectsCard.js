import Link from "next/link";
import clsx from "clsx";

import ActionCard from "./ActionCard";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

// TODO: Reorder these
import workRow1 from "assets/images/work-row-1.png";
import workRow2 from "assets/images/work-row-2.png";

import styles from "./AllProjectsCard.module.scss";

function AllProjectsCard({ className, ...props }) {
  return (
    <Link href="/projects" passHref>
      <ActionCard
        className={clsx(className, styles.Card)}
        size="large"
        actionCta="See all projects"
        topChildren={
          <>
            <Heading level="h3" tag="p">
              Kickpush Work
            </Heading>
            <Paragraph level="label">2014–Present</Paragraph>
          </>
        }
        {...props}
      >
        <div className={styles.Rows}>
          <img src={workRow2.src} alt="" />
          <img src={workRow1.src} alt="" />
        </div>
      </ActionCard>
    </Link>
  );
}

export default AllProjectsCard;
