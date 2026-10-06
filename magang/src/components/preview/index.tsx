import { useState } from "react";
import type { ReactNode } from "react";
import "./preview.css";

type PreviewProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  visibleCount?: number;
};

export const Preview = <T,>({
  items,
  renderItem,
  visibleCount = 3,
}: PreviewProps<T>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    if (items.length <= 1) {
      return;
    }

    setCurrentIndex((current) => (current + 1) % items.length);
  };

  const previous = () => {
    if (items.length <= 1) {
      return;
    }

    setCurrentIndex((current) => (current - 1 + items.length) % items.length);
  };

  const visibleItems = Array.from(
    { length: Math.min(visibleCount, items.length) },
    (_, index) => items[(currentIndex + index) % items.length],
  );

  return (
    <div className="preview">
      <button
        type="button"
        className="preview-button preview-button-left"
        onClick={previous}
        aria-label="Previous"
      >
        ←
      </button>

      <div className="preview-items">
        {visibleItems.map((item, index) => (
          <div className="preview-item" key={`${currentIndex}-${index}`}>
            {renderItem(item)}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="preview-button preview-button-right"
        onClick={next}
        aria-label="Next"
      >
        →
      </button>
    </div>
  );
};
