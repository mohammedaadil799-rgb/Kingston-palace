import React, { useState, useEffect, useRef } from "react";
import { 
  Maximize2, Eye, Sparkles, Volume2, VolumeX, X, 
  Camera, Compass, Layers, Info, MapPin 
} from "lucide-react";
import { GALLERY_DATA } from "../data/hotelData";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeMedia, setActiveMedia] = useState(null);
  const [ambientAudioOn, setAmbientAudioOn] = useState(false);
  const galleryContainerRef = useRef(null);

  const categories = ["All", "Architecture", "Suites & Penthouses", "Fine Dining", "Spa & Wellness"];

  const filteredMedia = GALLERY_DATA.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  // Parallax Mouse-Move 3D Depth Shift Effect
  useEffect(() => {
    const container = galleryContainerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Calculate normalized mouse coordinates from -1 to 1
      const normX = (e.clientX / innerWidth - 0.5) * 2;
      const normY = (e.clientY / innerHeight - 0.5) * 2;

      const items = container.querySelectorAll(".gallery-3d-item");
      items.forEach((item) => {
        const depth = parseFloat(item.getAttribute("data-depth") || 40);
        const moveX = normX * depth * 0.45;
        const moveY = normY * depth * 0.45;
        const rotY = normX * 8;
        const rotX = -normY * 8;

        item.style.transform = `perspective(1200px) translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg)`;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [filteredMedia]);

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "8rem 2.5rem 6rem" }}>
      {/* Editorial Header */}
      <div style={{ textAlign: "center", maxWidth: "880px", margin: "0 auto 3.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1.1rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(13, 148, 136, 0.12)",
            border: "1px solid var(--accent-teal)",
            color: "var(--accent-teal)",
            fontSize: "0.82rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "1rem"
          }}
        >
          <Layers size={14} />
          <span>Interactive 3D Spatial Experience</span>
        </div>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
            letterSpacing: "-0.03em",
            marginBottom: "1.2rem"
          }}
        >
          Virtual Atrium &amp; Visual Horizons
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Move your cursor across the canvas to experience multi-plane perspective depth. 
          Every image responds to your gaze, reflecting real-time light and architectural dimensions.
        </p>

        {/* Ambience audio toggle banner */}
        <div style={{ marginTop: "1.5rem", display: "inline-flex", alignItems: "center", gap: "0.85rem" }}>
          <button
            onClick={() => setAmbientAudioOn(!ambientAudioOn)}
            className="palace-chip"
            style={{ fontSize: "0.82rem" }}
          >
            {ambientAudioOn ? <Volume2 size={16} color="var(--accent-teal)" /> : <VolumeX size={16} />}
            <span>{ambientAudioOn ? "Atmosphere Soundscape Playing" : "Toggle Palace Ambient Sound"}</span>
          </button>
          {ambientAudioOn && (
            <span style={{ fontSize: "0.8rem", color: "var(--accent-teal)", fontStyle: "italic" }}>
              ♪ Gentle palace fountain &amp; classical harpsichord
            </span>
          )}
        </div>
      </div>

      {/* Category Filter Chips */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.75rem",
          flexWrap: "wrap",
          marginBottom: "3.5rem"
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`palace-chip ${selectedCategory === cat ? "active" : ""}`}
            style={{ padding: "0.65rem 1.4rem" }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Parallax Gallery Grid */}
      <div
        ref={galleryContainerRef}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "2.5rem",
          perspective: "1400px"
        }}
      >
        {filteredMedia.map((item, idx) => {
          // Asymmetrical grid column layout based on aspect
          const isWide = item.aspect === "wide";
          const isTall = item.aspect === "tall";
          const colSpan = isWide ? "span 8" : isTall ? "span 4" : "span 6";
          const height = isTall ? "520px" : isWide ? "380px" : "420px";

          return (
            <div
              key={item.id}
              className="gallery-3d-item"
              data-depth={item.depth}
              onClick={() => setActiveMedia(item)}
              style={{
                gridColumn: colSpan,
                cursor: "pointer",
                transition: "transform 0.12s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.3s ease",
                transformStyle: "preserve-3d",
                willChange: "transform"
              }}
            >
              <div
                className="surface-card"
                style={{
                  height: height,
                  borderRadius: "24px",
                  overflow: "hidden",
                  position: "relative",
                  border: "1px solid var(--border-color)",
                  boxShadow: "var(--shadow-subtle)"
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s ease"
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />

                {/* Ambient vignette */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(11,15,25,0.85) 0%, transparent 60%)"
                  }}
                />

                {/* Depth Badge */}
                <div style={{ position: "absolute", top: "1.25rem", right: "1.25rem" }}>
                  <span
                    style={{
                      padding: "0.3rem 0.75rem",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(11, 15, 25, 0.65)",
                      backdropFilter: "blur(6px)",
                      color: "#E2E8F0",
                      fontSize: "0.75rem",
                      border: "1px solid rgba(255,255,255,0.2)"
                    }}
                  >
                    Depth +{item.depth}px
                  </span>
                </div>

                {/* Bottom Title and Location Info */}
                <div style={{ position: "absolute", bottom: "1.5rem", left: "1.75rem", right: "1.75rem" }}>
                  <span className="badge-pill badge-teal" style={{ marginBottom: "0.5rem" }}>
                    {item.category}
                  </span>
                  <h3
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.45rem",
                      color: "#FFFFFF",
                      marginBottom: "0.3rem"
                    }}
                  >
                    {item.title}
                  </h3>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#94A3B8", fontSize: "0.82rem" }}>
                    <MapPin size={13} color="var(--accent-teal)" />
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox Modal */}
      {activeMedia && (
        <div className="palace-modal-backdrop" onClick={() => setActiveMedia(null)}>
          <div
            className="palace-modal-box surface-card"
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "1080px",
              width: "100%",
              overflow: "hidden",
              position: "relative",
              border: "1px solid var(--border-color)"
            }}
          >
            <button
              onClick={() => setActiveMedia(null)}
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "rgba(11, 15, 25, 0.75)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid rgba(255,255,255,0.2)",
                backdropFilter: "blur(8px)",
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>

            <div style={{ height: "500px", width: "100%", backgroundColor: "#000", position: "relative" }}>
              <img
                src={activeMedia.image}
                alt={activeMedia.title}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            <div style={{ padding: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1.5rem" }}>
              <div>
                <span className="badge-pill badge-teal" style={{ marginBottom: "0.5rem" }}>
                  {activeMedia.category}
                </span>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.85rem", marginBottom: "0.5rem" }}>
                  {activeMedia.title}
                </h2>
                <p style={{ color: "var(--text-secondary)", maxWidth: "600px", lineHeight: 1.6 }}>
                  {activeMedia.caption}
                </p>
              </div>

              <div
                style={{
                  padding: "1rem 1.5rem",
                  borderRadius: "14px",
                  backgroundColor: "var(--bg-base)",
                  border: "1px solid var(--border-color)",
                  textAlign: "right"
                }}
              >
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                  Location Within Estate
                </div>
                <div style={{ fontWeight: 600, color: "var(--accent-teal)", fontSize: "0.95rem" }}>
                  {activeMedia.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Gallery Breakpoints */}
      <style>{`
        @media (max-width: 992px) {
          .gallery-3d-item {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
}
