import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "../../components/navbar";
import { Footer } from "../../components/footer";
import { MusicFeastBackground } from "../../components/musicfeast-background";
import { galleryItems } from "../../data/gallery";
import "./gallery.css";

type GalleryFilter = "all" | "image" | "video";

export const Gallery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState<GalleryFilter>("all");

  const selectedId = searchParams.get("item");

  const filteredItems = useMemo(() => {
    if (filter === "all") {
      return galleryItems;
    }

    return galleryItems.filter((item) => item.type === filter);
  }, [filter]);

  const selectedItem = selectedId
    ? galleryItems.find((item) => String(item.id) === selectedId)
    : null;

  const handleFilter = (value: GalleryFilter) => {
    setFilter(value);
  };

  const handleOpenItem = (id: number) => {
    setSearchParams({ item: String(id) });
  };

  const handleCloseItem = () => {
    setSearchParams({});
  };

  return (
    <MusicFeastBackground>
      <div className="gallery-page">
        <Navbar />

        <main className="gallery-main">
          <section className="gallery-hero">
            <div className="gallery-hero-content">
              <p className="gallery-kicker">MUSICFEAST GALLERY</p>

              <h1>
                Our <span>Gallery.</span>
              </h1>

              <p className="gallery-description">
                Kumpulan momen dari berbagai event MusicFeast.
              </p>
            </div>
          </section>

          <section className="gallery-section">
            <div className="gallery-section-header">
              <div>
                <div className="gallery-section-label">
                  <span>01</span>
                  <strong>OUR MEMORIES</strong>
                </div>

                <h2>Gallery</h2>
              </div>

              <span className="gallery-total">
                {filteredItems.length} ITEMS
              </span>
            </div>

            <div className="gallery-filters">
              <button
                type="button"
                className={filter === "all" ? "active" : ""}
                onClick={() => handleFilter("all")}
              >
                All
              </button>

              <button
                type="button"
                className={filter === "image" ? "active" : ""}
                onClick={() => handleFilter("image")}
              >
                Photos
              </button>

              <button
                type="button"
                className={filter === "video" ? "active" : ""}
                onClick={() => handleFilter("video")}
              >
                Videos
              </button>
            </div>

            <div className="gallery-grid">
              {filteredItems.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  className="gallery-item"
                  onClick={() => handleOpenItem(item.id)}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.media}
                      alt={`MusicFeast moment ${index + 1}`}
                    />
                  ) : (
                    <video
                      src={item.media}
                      muted
                      playsInline
                      preload="metadata"
                    />
                  )}

                  <span className="gallery-item-overlay" />

                  <span className="gallery-item-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {item.type === "video" && (
                    <span className="gallery-item-play">▶</span>
                  )}

                  <span className="gallery-item-spark">✦</span>
                </button>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="gallery-empty">
                Tidak ada media yang tersedia.
              </div>
            )}
          </section>
        </main>

        <Footer />

        {selectedItem && (
          <div
            className="gallery-modal"
            onClick={handleCloseItem}
            role="presentation"
          >
            <div
              className="gallery-modal-content"
              onClick={(event) => event.stopPropagation()}
              role="presentation"
            >
              <button
                type="button"
                className="gallery-modal-close"
                onClick={handleCloseItem}
                aria-label="Close"
              >
                ×
              </button>

              {selectedItem.type === "image" ? (
                <img src={selectedItem.media} alt="MusicFeast moment" />
              ) : (
                <video src={selectedItem.media} controls autoPlay playsInline />
              )}
            </div>
          </div>
        )}
      </div>
    </MusicFeastBackground>
  );
};
