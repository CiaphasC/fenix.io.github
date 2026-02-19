import { useEffect } from 'react';

/**
 * Bloquea el scroll global (body + html) mientras `locked` sea true.
 */
export function useScrollLock(locked: boolean): void {
  useEffect(() => {
    if (!locked) {
      return;
    }

    const bodyStyle = document.body.style;
    const htmlStyle = document.documentElement.style;

    const previousBodyOverflow = bodyStyle.overflow;
    const previousHtmlOverflow = htmlStyle.overflow;
    const previousBodyOverscroll = bodyStyle.overscrollBehavior;
    const previousHtmlOverscroll = htmlStyle.overscrollBehavior;

    bodyStyle.overflow = 'hidden';
    htmlStyle.overflow = 'hidden';
    bodyStyle.overscrollBehavior = 'none';
    htmlStyle.overscrollBehavior = 'none';

    return () => {
      bodyStyle.overflow = previousBodyOverflow;
      htmlStyle.overflow = previousHtmlOverflow;
      bodyStyle.overscrollBehavior = previousBodyOverscroll;
      htmlStyle.overscrollBehavior = previousHtmlOverscroll;
    };
  }, [locked]);
}
