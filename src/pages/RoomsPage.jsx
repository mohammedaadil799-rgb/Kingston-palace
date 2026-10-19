import React, { useState, useMemo } from "react";
import { 
  Search, SlidersHorizontal, Star, Users, Maximize, Eye, 
  Check, ArrowRight, Sparkles, Filter, ChevronDown 
} from "lucide-react";
import TiltCard from "../components/TiltCard";
import { ROOMS_COLLECTION } from "../data/hotelData";

export default function RoomsPage({ onSelectRoom, onBookDirect }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");

  const categories = [
    "All",
    "Royal Suites",
    "Penthouse",
    "Romantic Retreats",
    "Family Villas",
    "Modern Pods"
  ];

  const filteredRooms = useMemo(() => {
    return ROOMS_COLLECTION.filter((room) => {
      const matchesCategory =
        selectedCategory === "All" || room.category === selectedCategory;
      const matchesSearch =
        room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0; // recommended order
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "8rem 2.5rem 6rem" }}>
      {/* Editorial Header */}
      <div style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 3.5rem" }}>
        <span
          style={{
            fontSize: "0.82rem",
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--accent-blue)",
            fontWeight: 600,
            display: "block",
            marginBottom: "0.75rem"
          }}
        >
          The Curated Enclave
        </span>
        <h1
          style={{
            fontSize: "clamp(2.5rem, 5vw, 4.2rem)",
            letterSpacing: "-0.03em",
            marginBottom: "1.2rem"
          }}
        >
          Rooms, Suites &amp; Private Pavilions
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Eight architecturally singular residences crafted with bespoke marble, hand-woven linens, 
          and acoustic privacy. Filter by occasion or explore the non-uniform gallery below.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div
        className="surface-card"
        style={{
          padding: "1.5rem 2rem",
          marginBottom: "3.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1.5rem"
        }}
      >
        {/* Categories Chips */}
        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`palace-chip ${selectedCategory === cat ? "active" : ""}`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && (
                <span style={{ fontSize: "0.7rem", opacity: 0.8 }}>●</span>
              )}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          {/* Keyword Search */}
          <div style={{ position: "relative", minWidth: "220px" }}>
            <Search
              size={16}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--text-tertiary)"
              }}
            />
            <input
              type="text"
              placeholder="Search amenities or suites..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "0.65rem 1rem 0.65rem 2.5rem",
                borderRadius: "9999px",
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.85rem"
              }}
            />
          </div>

          {/* Sort Select */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <SlidersHorizontal size={15} color="var(--text-secondary)" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              style={{
                padding: "0.65rem 1rem",
                borderRadius: "9999px",
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                fontSize: "0.85rem",
                cursor: "pointer"
              }}
            >
              <option value="recommended">Curator's Choice</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Dynamic Non-Uniform Masonry Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(12, 1fr)",
          gap: "2.5rem",
          alignItems: "stretch"
        }}
      >
        {filteredRooms.map((room, index) => {
          // Asymmetrical span: large cards take 7 columns, regular take 5 columns (or 6 and 6)
          const isLarge = room.isMasonryLarge && (index % 3 === 0 || index % 3 === 2);
          const colSpan = isLarge ? "span 7" : "span 5";

          return (
            <div
              key={room.id}
              className="masonry-col"
              style={{
                gridColumn: colSpan
              }}
            >
              <TiltCard
                onClick={() => onSelectRoom(room)}
                maxTilt={8}
                scale={1.015}
                className="h-full"
              >
                <div
                  className="surface-card"
                  style={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    cursor: "pointer",
                    position: "relative"
                  }}
                >
                  {/* Image Presentation */}
                  <div
                    style={{
                      position: "relative",
                      height: isLarge ? "380px" : "300px",
                      overflow: "hidden"
                    }}
                  >
                    <img
                      src={room.image}
                      alt={room.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)"
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                    />

                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to top, rgba(11,15,25,0.75) 0%, transparent 60%)"
                      }}
                    />

                    {/* Top Badges */}
                    <div
                      style={{
                        position: "absolute",
                        top: "1.25rem",
                        left: "1.25rem",
                        right: "1.25rem",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                      }}
                    >
                      <span className="badge-pill badge-blue">{room.category}</span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.3rem",
                          padding: "0.3rem 0.75rem",
                          borderRadius: "9999px",
                          backgroundColor: "rgba(11, 15, 25, 0.75)",
                          backdropFilter: "blur(6px)",
                          color: "#FBBF24",
                          fontSize: "0.82rem",
                          fontWeight: 600
                        }}
                      >
                        <Star size={13} fill="#FBBF24" />
                        <span>{room.rating}</span>
                        <span style={{ color: "#94A3B8", fontSize: "0.75rem" }}>
                          ({room.reviewsCount})
                        </span>
                      </div>
                    </div>

                    {/* Bottom Price in Overlay */}
                    <div style={{ position: "absolute", bottom: "1.25rem", left: "1.5rem" }}>
                      <div style={{ fontSize: "0.75rem", color: "#CBD5E1", textTransform: "uppercase" }}>
                        Nightly All-Inclusive
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                        <span
                          style={{
                            fontSize: "2rem",
                            fontWeight: 700,
                            color: "#FFFFFF",
                            fontFamily: "var(--font-serif)"
                          }}
                        >
                          ${room.price}
                        </span>
                        <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>/ night</span>
                        {room.originalPrice && (
                          <span
                            style={{
                              color: "#94A3B8",
                              textDecoration: "line-through",
                              fontSize: "0.9rem",
                              marginLeft: "0.3rem"
                            }}
                          >
                            ${room.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div
                    style={{
                      padding: "2rem",
                      display: "flex",
                      flexDirection: "column",
                      flexGrow: 1,
                      justifyContent: "space-between"
                    }}
                  >
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          marginBottom: "0.6rem"
                        }}
                      >
                        <h3
                          style={{
                            fontSize: "1.55rem",
                            color: "var(--text-primary)"
                          }}
                        >
                          {room.name}
                        </h3>
                        <span
                          className="badge-pill badge-teal"
                          style={{ fontSize: "0.7rem", flexShrink: 0 }}
                        >
                          {room.badge}
                        </span>
                      </div>

                      <p
                        style={{
                          fontSize: "0.92rem",
                          color: "var(--text-secondary)",
                          lineHeight: 1.6,
                          marginBottom: "1.5rem"
                        }}
                      >
                        {room.subtitle}
                      </p>

                      {/* Specs Bar */}
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr 1fr",
                          gap: "0.75rem",
                          padding: "0.9rem 1rem",
                          backgroundColor: "var(--bg-base)",
                          borderRadius: "12px",
                          border: "1px solid var(--border-color)",
                          marginBottom: "1.5rem"
                        }}
                      >
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                            Dimensions
                          </div>
                          <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{room.sqft} sq.ft</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                            Bed
                          </div>
                          <div style={{ fontWeight: 600, fontSize: "0.85rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {room.bedType}
                          </div>
                        </div>
                        <div>
                          <div style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                            Capacity
                          </div>
                          <div style={{ fontWeight: 600, fontSize: "0.88rem" }}>{room.maxGuests} Guests</div>
                        </div>
                      </div>

                      {/* Top Features */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem" }}>
                        {room.features.slice(0, 3).map((feat, i) => (
                          <span
                            key={i}
                            style={{
                              fontSize: "0.78rem",
                              padding: "0.25rem 0.65rem",
                              borderRadius: "9999px",
                              backgroundColor: "var(--bg-base)",
                              color: "var(--text-secondary)",
                              border: "1px solid var(--border-color)"
                            }}
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "1.25rem",
                        borderTop: "1px solid var(--border-color)"
                      }}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRoom(room);
                        }}
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 600,
                          color: "var(--accent-blue)",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.4rem",
                          background: "none",
                          border: "none",
                          padding: 0
                        }}
                      >
                        <span>View Suite Specs &amp; Gallery</span>
                        <ArrowRight size={15} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onBookDirect(room);
                        }}
                        className="btn-palace-primary"
                        style={{ padding: "0.6rem 1.4rem", fontSize: "0.82rem" }}
                      >
                        <span>Reserve</span>
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          );
        })}
      </div>

      {/* Responsive Breakpoints for Masonry */}
      <style>{`
        @media (max-width: 1024px) {
          .masonry-col {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </div>
  );
}
