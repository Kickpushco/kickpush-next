import { useRef, useState } from "react";
import clsx from "clsx";

import Action from "components/Action/Action";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";

import styles from "./Footer.module.scss";

export function ContentfulFooter({ globalSettings, ...props }) {
  return (
    <Footer
      title={globalSettings.footerTitle}
      actionCta={globalSettings.footerCta}
      email={globalSettings.contactEmail}
      copiedTooltip={globalSettings.footerCopiedTooltip}
      {...props}
    />
  );
}

function Footer({
  className,
  title,
  email = "",
  tag = "footer",
  actionCta,
  copiedTooltip,
  isHero,
  ...props
}) {
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef(null);

  const headingTag = isHero ? "h1" : "p";
  const WrapperTag = tag;

  async function handleCopyEmail(e) {
    e.preventDefault();

    clearTimeout(copyTimeoutRef.current);
    await navigator.clipboard.writeText(email);

    setCopied(true);

    copyTimeoutRef.current = setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <WrapperTag
      className={clsx(
        className,
        "container",
        styles.Footer,
        isHero && styles["Footer-hero"]
      )}
      {...props}
    >
      <Heading className={styles.Heading} level="h1" tag={headingTag}>
        {title}
      </Heading>

      <p className={styles.Email}>
        <a
          className={styles.EmailLink}
          href={`mailto:${email}`}
          onClick={handleCopyEmail}
        >
          <Action ctaText={actionCta} ctaLevel="h4">
            {email.split("@").map((chunk, chunkIndex) => (
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
          {copiedTooltip}
        </Paragraph>
      </p>
    </WrapperTag>
  );
}

export default Footer;
