import Link from "next/link";

import { computeTextColor } from "services/contentful";

import Button from "components/Button/Button";
import Heading from "components/Heading/Heading";
import ProjectSlide from "./ProjectSlide";

import styles from "./ProjectContact.module.scss";

export function ContentfulProjectContact({ pageFields, ...props }) {
  return (
    <ProjectContact
      title={pageFields.contactTitle}
      button={pageFields.contactButton}
      textColor={computeTextColor(pageFields.textColor)}
      {...props}
    />
  );
}

function ProjectContact({ title, textColor, button, ...props }) {
  return (
    <ProjectSlide className={styles.Contact} {...props}>
      <div className="container">
        <Heading level="h2">{title}</Heading>
        <Link href="/contact" passHref>
          <Button className={styles.Button} tag="a" variant={textColor}>
            {button}
          </Button>
        </Link>
      </div>
    </ProjectSlide>
  );
}

export default ProjectContact;
