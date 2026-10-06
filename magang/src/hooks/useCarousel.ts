import { useMemo, useState } from "react";

export const useCarousel = <T>(items: T[], visibleCount: number = 3) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const maxIndex = Math.max(items.length - visibleCount, 0);

  const visibleItems = useMemo(() => {
    if (items.length <= visibleCount) {
      return items;
    }

    return items.slice(currentIndex, currentIndex + visibleCount);
  }, [items, currentIndex, visibleCount]);

  const next = () => {
    setCurrentIndex((current) => {
      if (maxIndex === 0) {
        return 0;
      }

      return current >= maxIndex ? 0 : current + 1;
    });
  };

  const previous = () => {
    setCurrentIndex((current) => {
      if (maxIndex === 0) {
        return 0;
      }

      return current <= 0 ? maxIndex : current - 1;
    });
  };

  return {
    visibleItems,
    next,
    previous,
    currentIndex,
    maxIndex,
  };
};
