import { useRef, useLayoutEffect, useState, useCallback, ReactNode } from 'react';
import {
  motion,
  useTransform,
  useMotionValue,
  useAnimationFrame
} from 'framer-motion';

function useElementWidth(ref: React.RefObject<HTMLElement | null>) {
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;

    setWidth(ref.current.offsetWidth);

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentBoxSize) {
          setWidth(entry.contentBoxSize[0].inlineSize);
        } else {
          setWidth((entry.target as HTMLElement).offsetWidth);
        }
      }
    });

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref]);

  return width;
}

interface ScrollVelocityProps {
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
  texts?: ReactNode[];
  velocity?: number;
  className?: string;
  numCopies?: number;
  parallaxClassName?: string;
  scrollerClassName?: string;
  parallaxStyle?: React.CSSProperties;
  scrollerStyle?: React.CSSProperties;
}

export const ScrollVelocity = ({
  scrollContainerRef,
  texts = [],
  velocity = 100,
  className = '',
  numCopies = 6,
  parallaxClassName = 'parallax',
  scrollerClassName = 'scroller',
  parallaxStyle,
  scrollerStyle
}: ScrollVelocityProps) => {
  function VelocityText({
    children,
    baseVelocity = velocity,
    scrollContainerRef,
    className = '',
    numCopies = 6,
    parallaxClassName,
    scrollerClassName,
    parallaxStyle,
    scrollerStyle
  }: {
    children: ReactNode;
    baseVelocity?: number;
    scrollContainerRef?: React.RefObject<HTMLElement | null>;
    className?: string;
    numCopies?: number;
    parallaxClassName?: string;
    scrollerClassName?: string;
    parallaxStyle?: React.CSSProperties;
    scrollerStyle?: React.CSSProperties;
  }) {
    const baseX = useMotionValue(0);

    const copyRef = useRef<HTMLElement | null>(null);
    const copyWidth = useElementWidth(copyRef);
    const isPaused = useRef(false);

    const wrap = useCallback((min: number, max: number, v: number) => {
      const range = max - min;
      const mod = (((v - min) % range) + range) % range;
      return mod + min;
    }, []);

    const x = useTransform(baseX, v => {
      if (copyWidth === 0) return '0px';
      return `${wrap(-copyWidth, 0, v)}px`;
    });

    useAnimationFrame((t: number, delta: number) => {
      if (isPaused.current) return;
      let moveBy = baseVelocity * (delta / 1000);
      baseX.set(baseX.get() + moveBy);
    });

    const spans = [];
    for (let i = 0; i < numCopies; i++) {
      spans.push(
        <span className={className} key={i} ref={i === 0 ? copyRef : null}>
          {children}&nbsp;
        </span>
      );
    }

    return (
      <div className={parallaxClassName} style={parallaxStyle}>
        <motion.div
          className={scrollerClassName}
          style={{ x, ...scrollerStyle }}
          onMouseEnter={() => { isPaused.current = true; }}
          onMouseLeave={() => { isPaused.current = false; }}
        >
          {spans}
        </motion.div>
      </div>
    );
  }

  return (
    <section>
      {texts.map((text, index) => (
        <VelocityText
          key={index}
          className={className}
          baseVelocity={index % 2 !== 0 ? -velocity : velocity}
          scrollContainerRef={scrollContainerRef}
          numCopies={numCopies}
          parallaxClassName={parallaxClassName}
          scrollerClassName={scrollerClassName}
          parallaxStyle={parallaxStyle}
          scrollerStyle={scrollerStyle}
        >
          {text}
        </VelocityText>
      ))}
    </section>
  );
};

export default ScrollVelocity;
