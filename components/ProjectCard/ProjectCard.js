import { useCallback, useRef, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAppContext } from "context/state";

import { computeTextColor } from "services/contentful";

import ActionCard from "components/ActionCard/ActionCard";
import Heading from "components/Heading/Heading";
import Paragraph from "components/Paragraph/Paragraph";
import { computeImageProps } from "components/Image/Image";

import styles from "./ProjectCard.module.scss";

export function ContentfulProjectCard({ project, globalSettings, ...props }) {
  const { slug, clientName, year, cardTitle, cardColor, cardImage } =
    project.fields;

  const textColor = computeTextColor(project.fields.cardTextColor);

  return (
    <ProjectCard
      slug={slug}
      clientName={clientName}
      year={year}
      title={cardTitle}
      backgroundColor={cardColor}
      backgroundImageProps={cardImage && computeImageProps(cardImage)}
      textColor={textColor}
      actionCta={globalSettings.projectCardAction}
      {...props}
    />
  );
}

function ProjectCard({
  className,
  slug,
  clientName,
  year,
  title,
  size = "small",
  actionCta = "See project",
  backgroundImageProps,
  onClick,
  style = {},
  ...props
}) {
  const projectHref = `/projects/${slug}`;

  const router = useRouter();

  const wrapperRef = useRef(null);

  const { projectTransitioning, setProjectTransitioning } = useAppContext();

  const [wrapperStyle, setWrapperStyle] = useState(null);
  const [cardStyle, setCardStyle] = useState(null);

  const handleClick = useCallback(
    (e) => {
      onClick?.(e);

      e.preventDefault();

      if (projectTransitioning) {
        setProjectTransitioning(false);
        setWrapperStyle(null);
        setCardStyle(null);
        return;
      }

      const wrapperEl = wrapperRef.current;
      const wrapperBounds = wrapperEl.getBoundingClientRect();
      const wrapperWidth = wrapperEl.clientWidth;
      const wrapperHeight = wrapperEl.clientHeight;

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const wrapperTranslateX =
        wrapperBounds.left * -1 + windowWidth / 2 - wrapperWidth / 2;
      const wrapperTranslateY =
        wrapperBounds.top * -1 + windowHeight / 2 - wrapperHeight / 2;

      const cardScaleX = Math.ceil((windowWidth / wrapperWidth) * 100) / 100;
      const cardScaleY = Math.ceil((windowHeight / wrapperHeight) * 100) / 100;

      setProjectTransitioning(slug);

      setWrapperStyle({
        transform: `translate3d(${wrapperTranslateX}px, ${wrapperTranslateY}px, 0)`,
        // TODO: Move all of this to a class
        zIndex: 98,
        position: "relative",
        transition: "transform 400ms ease-out",
        willChange: "transform",
      });
      setCardStyle({
        transform: `scale(${cardScaleX}, ${cardScaleY})`,
      });
    },
    [onClick, projectTransitioning, slug, router]
  );

  const handleTransitionEnd = useCallback(
    async (e) => {
      if (e.target !== wrapperRef.current) return;
      await router.push(projectHref);

      setProjectTransitioning(false);
    },
    [router]
  );

  return (
    <div
      className={styles.Wrapper}
      ref={wrapperRef}
      style={wrapperStyle}
      onTransitionEnd={handleTransitionEnd}
    >
      <Link href={projectHref} passHref>
        <ActionCard
          className={clsx(
            className,
            projectTransitioning === slug && styles["Card-transitioning"]
          )}
          disabled={projectTransitioning}
          topChildren={
            <p className={styles.Action}>
              <Heading className={styles.Byline} level="h5" tag="span">
                {clientName}
              </Heading>
              {year && (
                <Paragraph className={styles.Year} level="label" tag="span">
                  {year}
                </Paragraph>
              )}
            </p>
          }
          backgroundImageProps={
            backgroundImageProps && {
              ...backgroundImageProps,
              className: styles.Background,
            }
          }
          actionCta={actionCta}
          size={size}
          onClick={handleClick}
          style={{
            ...style,
            ...cardStyle,
          }}
          {...props}
        >
          <Heading className={styles.Title} level="h4" tag="h3">
            {title}
          </Heading>
        </ActionCard>
      </Link>
    </div>
  );
}

export default ProjectCard;
