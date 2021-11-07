import { useRef, useState } from "react";
import clsx from "clsx";

import { CONTACT_EMAIL } from "utils/constants";

import Action from "components/Action/Action";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

import styles from "./Footer.module.scss";

function Footer({ className, contact, isHero, ...props }) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  if (!contact) return null;

  const headingTag = isHero ? "h1" : "p";

  async function handleCopyEmail(e) {
    e.preventDefault();

    clearTimeout(copyTimeoutRef.current);
    await navigator.clipboard.writeText(CONTACT_EMAIL);

    setCopied(true);

    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <footer
      className={clsx(
        className,
        "container",
        styles.Footer,
        isHero && styles["Footer-hero"]
      )}
      {...props}
    >
      <Heading className={styles.Heading} level="h1" tag={headingTag}>
        {contact.fields.heroTitle}
      </Heading>

      <p className={styles.Email}>
        <a
          className={styles.EmailLink}
          href={`mailto:${CONTACT_EMAIL}`}
          onClick={handleCopyEmail}
        >
          <Action ctaText="Copy email address" ctaLevel="h4">
            {CONTACT_EMAIL.split("@").map((chunk, chunkIndex) => (
              <Heading
                className={styles.EmailChunk}
                key={chunkIndex}
                tag="span"
                level="h4"
              >
                {chunk}
                {chunkIndex === 0 && "@"}
              </Heading>
            ))}
          </Action>
        </a>
        <Paragraph
          className={styles.CopiedToast}
          aria-hidden={!copied}
          tag="span"
        >
          Copied to clipboard
        </Paragraph>
      </p>
    </footer>
  );
}

export default Footer;
