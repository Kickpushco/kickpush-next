import { forwardRef, useCallback, useMemo, useRef, useState } from "react";
import clsx from "clsx";

import Action from "components/Action/Action";
import Card, { CardReveal, CARD_DEFAULT_SIZE } from "components/Card/Card";
import Image from "components/Image/Image";

import styles from "./ActionCard.module.scss";
import { useAppContext } from "context/state";
import { useRouter } from "next/router";

const ActionCard = forwardRef(
  (
    {
      className,
      wrapperClassName,
      children,
      topChildren,
      backgroundImageProps,
      size = CARD_DEFAULT_SIZE,
      disabled,
      actionCta,
      style = {},
      onClick,
      onClickEnd,
      animationId,
      href,
      ...props
    },
    ref
  ) => {
    const router = useRouter();

    const { noMotion, cardTransitioning, setCardTransitioning } =
      useAppContext();

    const wrapperRef = useRef();

    const [wrapperStyle, setWrapperStyle] = useState(null);
    const [cardStyle, setCardStyle] = useState(null);

    const canTransition = useMemo(() => {
      return !!href && !!animationId;
    }, [href, animationId]);

    const handleClick = useCallback(
      (e) => {
        if (noMotion || !canTransition) {
          onClick?.(e);

          return false;
        }

        e.preventDefault();

        if (cardTransitioning) return;

        const wrapperEl = wrapperRef.current;
        const cardEl = e.currentTarget;

        const wrapperBounds = wrapperEl.getBoundingClientRect();
        const wrapperWidth = wrapperEl.clientWidth;
        const wrapperHeight = wrapperEl.clientHeight;

        const cardWidth = cardEl.clientWidth;
        const cardHeight = cardEl.clientHeight;

        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;

        const wrapperTranslateX =
          wrapperBounds.left * -1 + windowWidth / 2 - wrapperWidth / 2;
        const wrapperTranslateY =
          wrapperBounds.top * -1 + windowHeight / 2 - wrapperHeight / 2;

        const cardScaleX = Math.ceil((windowWidth / cardWidth) * 100) / 100;
        const cardScaleY = Math.ceil((windowHeight / cardHeight) * 100) / 100;

        const inverseX = 1 / cardScaleX;
        const inverseY = 1 / cardScaleY;

        const cardContentScale =
          cardScaleX > cardScaleY
            ? `scale(${inverseX * cardScaleY}, ${inverseY * cardScaleY})`
            : `scale(${inverseX * cardScaleX}, ${inverseY * cardScaleX})`;

        const cardBackgroundScale =
          cardScaleX > cardScaleY
            ? `scale(${inverseX * cardScaleX}, ${inverseY * cardScaleX})`
            : `scale(${inverseX * cardScaleY}, ${inverseY * cardScaleY})`;

        setCardTransitioning(animationId);

        setWrapperStyle({
          transform: `translate3d(${wrapperTranslateX}px, ${wrapperTranslateY}px, 0)`,
          willChange: "transform",
          zIndex: styles.wrapperIndex,
        });
        setCardStyle({
          "--card-content-scale": cardContentScale,
          "--card-background-scale": cardBackgroundScale,
          transform: `scale(${cardScaleX}, ${cardScaleY})`,
        });

        onClick?.(e);
      },
      [noMotion, cardTransitioning, animationId, router, onClick]
    );

    const handleTransitionEnd = useCallback(
      async (e) => {
        if (
          e.target !== wrapperRef.current ||
          cardTransitioning !== animationId ||
          !canTransition
        ) {
          return;
        }

        await router.push(href);

        setCardTransitioning(false);
        onClickEnd?.(e);
      },
      [href, router, cardTransitioning, animationId, onClickEnd]
    );

    const thisCardTransitioning = cardTransitioning === animationId;

    return (
      <CardReveal
        className={clsx(
          wrapperClassName,
          styles.Wrapper,
          cardTransitioning &&
            (thisCardTransitioning
              ? styles["Wrapper-transitioning"]
              : styles["Wrapper-hidden"])
        )}
        ref={wrapperRef}
        style={wrapperStyle}
        onTransitionEnd={handleTransitionEnd}
      >
        <Card
          className={clsx(
            className,
            styles.Card,
            styles[`Card-${size}`],
            !disabled && styles["Card-enabled"],
            thisCardTransitioning && styles["Card-transitioning"]
          )}
          size={size}
          ref={ref}
          data-disable-hover={disabled ? "" : undefined}
          data-disable-focus={disabled ? "" : undefined}
          onClick={handleClick}
          disabled={cardTransitioning}
          href={href}
          style={{
            ...style,
            ...cardStyle,
          }}
          {...props}
        >
          {backgroundImageProps && (
            <Image
              objectFit="cover"
              variant="ghost"
              {...backgroundImageProps}
              className={clsx(
                styles.Background,
                backgroundImageProps.className
              )}
            />
          )}

          <div className={styles.Content}>
            <Action ctaText={actionCta} disabled={disabled}>
              {topChildren}
            </Action>

            {children}
          </div>
        </Card>
      </CardReveal>
    );
  }
);

export default ActionCard;
