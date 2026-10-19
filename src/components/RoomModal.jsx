import React, { useState } from "react";
import { X, Check, Star, Users, Maximize, Eye, Sparkles, ArrowRight, ShieldCheck, Calendar } from "lucide-react";

export default function RoomModal({ room, onClose, onBookNow }) {
  if (!room) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const images = room.gallery && room.gallery.length > 0 ? room.gallery : [room.image];

  return (
    <div className="palace-modal-backdrop" onClick={onClose}>
      <div
        className="palace-modal-box surface-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: "960px",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "0",
          border: "1px solid var(--border-color)",
          position: "relative",
          display: "flex",
          flexDirection: "column"
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "rgba(11, 15, 25, 0.7)",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            border: "1px solid rgba(255,255,255,0.2)",
            backdropFilter: "blur(8px)"
          }}
          aria-label="Close modal"
        >
          <X size={20} />
        </button>

        {/* Modal Hero / Gallery Slider */}
        <div style={{ position: "relative", width: "100%", height: "380px", backgroundColor: "#000" }}>
          <img
            src={images[activeImageIndex]}
            alt={room.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "opacity 0.3s ease"
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, rgba(11,15,25,0.85) 0%, transparent 60%)"
            }}
          />

          {/* Badges and Title in Hero */}
          <div
            style={{
              position: "absolute",
              bottom: "1.5rem",
              left: "2rem",
              right: "2rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1rem"
            }}
          >
            <div>
              <span className="badge-pill badge-blue" style={{ marginBottom: "0.5rem" }}>
                {room.badge || room.category}
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2.2rem",
                  color: "#FFFFFF",
                  fontWeight: 600
                }}
              >
                {room.name}
              </h2>
              <p style={{ color: "#E2E8F0", fontSize: "0.95rem" }}>{room.subtitle}</p>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.85rem", color: "#CBD5E1", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Exclusive Nightly Rate
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", justifyContent: "flex-end" }}>
                <span style={{ fontSize: "2.2rem", fontWeight: 700, color: "#60A5FA", fontFamily: "var(--font-serif)" }}>
                  ${room.price}
                </span>
                <span style={{ color: "#94A3B8", fontSize: "0.9rem" }}>/ night</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Selector if multiple images */}
        {images.length > 1 && (
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              padding: "0.85rem 2rem",
              backgroundColor: "var(--bg-surface)",
              borderBottom: "1px solid var(--border-color)",
              overflowX: "auto"
            }}
          >
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                style={{
                  width: "72px",
                  height: "48px",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: activeImageIndex === idx ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)",
                  opacity: activeImageIndex === idx ? 1 : 0.6,
                  flexShrink: 0,
                  transition: "all 0.2s ease"
                }}
              >
                <img src={img} alt="thumbnail" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}

        {/* Modal Body */}
        <div style={{ padding: "2rem", display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "2.5rem" }}>
          <div>
            <h3 style={{ fontSize: "1.25rem", marginBottom: "0.75rem", color: "var(--text-primary)" }}>
              The Residence Experience
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
              {room.description}
            </p>

            {/* Room Specifications Chips */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "1rem",
                padding: "1.25rem",
                borderRadius: "14px",
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border-color)",
                marginBottom: "1.75rem"
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-blue)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <Maximize size={15} />
                  <span>Suite Area</span>
                </div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{room.sqft} sq.ft</div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-purple)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <Users size={15} />
                  <span>Capacity</span>
                </div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>Up to {room.maxGuests} Guests</div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-teal)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <Eye size={15} />
                  <span>Vantage View</span>
                </div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)", fontSize: "0.9rem" }}>{room.view}</div>
              </div>

              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-yellow)", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                  <Star size={15} />
                  <span>Critique Rating</span>
                </div>
                <div style={{ fontWeight: 600, color: "var(--text-primary)" }}>{room.rating} ★ ({room.reviewsCount})</div>
              </div>
            </div>

            {/* In-Suite Privileges */}
            <h4 style={{ fontSize: "1.05rem", marginBottom: "0.85rem", color: "var(--text-primary)" }}>
              Complimentary Inclusions &amp; Privileges
            </h4>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.65rem" }}>
              {room.features.map((feat, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                  <div
                    style={{
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "rgba(13, 148, 136, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-teal)",
                      flexShrink: 0
                    }}
                  >
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Action / Summary Sidebar */}
          <div
            style={{
              padding: "1.75rem",
              borderRadius: "16px",
              backgroundColor: "var(--bg-base)",
              border: "1px solid var(--border-color)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <div>
              <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--text-tertiary)", marginBottom: "0.5rem" }}>
                Palace Guarantee
              </div>
              <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", marginBottom: "1rem" }}>
                Direct Reservation Benefits
              </h4>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Sparkles size={16} color="var(--accent-yellow)" />
                  <span>Complimentary daily Royal Champagne breakfast</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <ShieldCheck size={16} color="var(--accent-teal)" />
                  <span>Complimentary late 4:00 PM check-out</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Calendar size={16} color="var(--accent-blue)" />
                  <span>Free cancellation up to 48 hours prior</span>
                </div>
              </div>

              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "10px",
                  border: "1px solid var(--border-color)",
                  marginBottom: "1.5rem"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Base Rate (1 Night)</span>
                  <span style={{ fontWeight: 600 }}>${room.price}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem", marginBottom: "0.4rem" }}>
                  <span style={{ color: "var(--text-secondary)" }}>Resort &amp; Butler Surcharge</span>
                  <span style={{ fontWeight: 600, color: "var(--accent-teal)" }}>Included</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.05rem", fontWeight: 700, paddingTop: "0.5rem", borderTop: "1px dashed var(--border-color)" }}>
                  <span>Estimated Total</span>
                  <span style={{ color: "var(--accent-blue)" }}>${room.price}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onBookNow(room);
              }}
              className="btn-palace-primary"
              style={{ width: "100%", padding: "1rem" }}
            >
              <span>Proceed to Reservation</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .palace-modal-box > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
