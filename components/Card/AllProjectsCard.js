import { forwardRef } from "react";
import Link from "next/link";
import clsx from "clsx";

import Card from "./Card";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

import styles from "./Card.module.scss";

function AllProjectsCard({ className, ...props }) {
  return (
    <Link href="/projects" passHref>
      <Card
        className={clsx(className, styles.AllProjectsCard)}
        size="large"
        {...props}
      >
        <Heading level="h3" tag="p">
          Kickpush Work
        </Heading>
        <Paragraph level="label">2014–Present</Paragraph>
      </Card>
    </Link>
  );
}

export default AllProjectsCard;
