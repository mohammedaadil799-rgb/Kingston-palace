import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { 
  Sparkles, Compass, CheckCircle2, ArrowRight, Heart, 
  Users, Calendar, Clock, Star, Zap, Info, ShieldCheck 
} from "lucide-react";
import { ROOMS_COLLECTION, CONCIERGE_PERSONAS } from "../data/hotelData";
import TiltCard from "../components/TiltCard";

export default function ConciergePage({ onSelectRoom, onBookDirect }) {
  const [selectedPersona, setSelectedPersona] = useState("Couples (1 Male, 1 Female)");
  const [selectedVibe, setSelectedVibe] = useState("Romance & Candlelight");
  const [selectedBudget, setSelectedBudget] = useState("Luxury");
  const resultsContainerRef = useRef(null);

  const vibeOptions = [
    { id: "Romance & Candlelight", icon: "🕯️", label: "Romance & Candlelight" },
    { id: "Academic & Deep Silence", icon: "📚", label: "Academic & Deep Silence" },
    { id: "Family Harmony & Fun", icon: "🧸", label: "Family Harmony & Fun" },
    { id: "High Grandeur & Extravaganza", icon: "👑", label: "High Grandeur & Royalty" }
  ];

  // Concierge Matching Logic
  const getRecommendations = () => {
    let ranked = [...ROOMS_COLLECTION];

    // Priority weighting based on Persona
    switch (selectedPersona) {
      case "Students":
        ranked = ranked.sort((a, b) => {
          if (a.id === "cozy-student-pod") return -1;
          if (b.id === "cozy-student-pod") return 1;
          if (a.id === "minimalist-loft") return -1;
          return a.price - b.price;
        });
        break;

      case "Group of Students":
        ranked = ranked.sort((a, b) => {
          if (a.id === "family-penthouse" || a.id === "emperors-duplex-pavilion") return -1;
          return a.sqft > b.sqft ? -1 : 1;
        });
        break;

      case "One Night Stay":
        ranked = ranked.sort((a, b) => {
          if (a.id === "lakeview-terrace-suite" || a.id === "minimalist-loft") return -1;
          return 0;
        });
        break;

      case "1-Week Stay":
        ranked = ranked.sort((a, b) => {
          if (a.id === "royal-sovereign-suite" || a.id === "celestial-penthouse") return -1;
          return b.sqft - a.sqft;
        });
        break;

      case "Couples (1 Male, 1 Female)":
        ranked = ranked.sort((a, b) => {
          if (a.id === "couples-retreat") return -1;
          if (a.id === "celestial-penthouse" || a.id === "royal-sovereign-suite") return -1;
          return 0;
        });
        break;

      case "Family (4-8 people)":
        ranked = ranked.sort((a, b) => {
          if (a.id === "family-penthouse") return -1;
          if (a.id === "emperors-duplex-pavilion") return -1;
          return b.maxGuests - a.maxGuests;
        });
        break;

      default:
        break;
    }

    return ranked.slice(0, 3);
  };

  const recommendations = getRecommendations();

  // GSAP Smooth Reshuffle Animation whenever persona changes
  useEffect(() => {
    if (resultsContainerRef.current) {
      const cards = resultsContainerRef.current.querySelectorAll(".concierge-card-item");
      gsap.fromTo(
        cards,
        { opacity: 0, y: 35, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.12,
          duration: 0.65,
          ease: "power3.out"
        }
      );
    }
  }, [selectedPersona, selectedVibe]);

  // Bespoke Concierge Reasoning
  const getConciergeVerdict = (room, persona, rank) => {
    if (persona === "Students") {
      if (room.id === "cozy-student-pod") {
        return "Rank #1 Match: Engineered specifically for uncompromised study. Triple-glazed acoustic glass isolates all estate sound, with dedicated gigabit fiber and 24/7 espresso delivery.";
      }
      return "Exceptional minimalist retreat with natural desk daylight and serene pine valley views for inspiring creative focus.";
    }

    if (persona === "Group of Students") {
      if (room.id === "family-penthouse" || room.id === "emperors-duplex-pavilion") {
        return "Rank #1 Match: Generous common lounges and multiple en-suite bedrooms make splitting the cost effortless while granting palatial access to private cinema and garden lawns.";
      }
      return "Spacious open layout ideal for group discussions, evening dinners, and collaborative study sprints.";
    }

    if (persona === "Couples (1 Male, 1 Female)") {
      if (room.id === "couples-retreat") {
        return "Rank #1 Match: Absolute seclusion behind blooming night jasmine. Features an intimate cedar soaking tub on a sheltered stone patio and evening rose-petal turndown.";
      }
      if (room.id === "celestial-penthouse") {
        return "Unrivaled romantic spectacle: Swim beneath the midnight stars in your private glass-bottom pool with bespoke in-suite champagne dining.";
      }
      return "Romantic lakeside vistas with a clawfoot soaking tub and guaranteed breakfast in bed.";
    }

    if (persona === "Family (4-8 people)") {
      if (room.id === "family-penthouse") {
        return "Rank #1 Match: Three dedicated master suites with sensory playroom, full chef's kitchen, and on-demand royal nanny services for guilt-free parent relaxation.";
      }
      return "Grand palatial pavilion offering vast grounds, private moat, and dedicated staff for multi-generational comfort.";
    }

    if (persona === "One Night Stay") {
      return "Optimized for frictionless indulgence: Express VIP check-in, late afternoon departure, and immediate access to fine dining without unnecessary setup time.";
    }

    return "Curated for the grand voyager: Deep-immersion wellness treatments, personalized butler tailoring, and weekly wardrobe pressing included.";
  };

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
            backgroundColor: "rgba(124, 58, 237, 0.12)",
            border: "1px solid var(--accent-purple)",
            color: "var(--accent-purple)",
            fontSize: "0.82rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            marginBottom: "1rem"
          }}
        >
          <Sparkles size={15} />
          <span>The Aristocratic Matchmaker</span>
        </div>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 4.8vw, 4rem)",
            letterSpacing: "-0.03em",
            marginBottom: "1.2rem"
          }}
        >
          The Kingston Concierge Engine
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Select your traveling cohort and desired emotional atmosphere. 
          Our algorithmic concierge reshuffles the palace collection in real time, 
          presenting the top 3 residences paired with an authentic human evaluation.
        </p>
      </div>

      {/* Interactive Selection Step Panel */}
      <div
        className="surface-card"
        style={{
          padding: "2.5rem",
          marginBottom: "4rem",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--shadow-subtle)"
        }}
      >
        {/* Step 1: Who is Traveling? */}
        <div style={{ marginBottom: "2rem" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.2rem"
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-blue)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700
              }}
            >
              1
            </div>
            <h3 style={{ fontSize: "1.3rem", color: "var(--text-primary)" }}>
              Who is Traveling with you?
            </h3>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem"
            }}
          >
            {CONCIERGE_PERSONAS.map((persona) => {
              const isSelected = selectedPersona === persona.id;
              return (
                <button
                  key={persona.id}
                  onClick={() => setSelectedPersona(persona.id)}
                  className={`palace-chip ${isSelected ? "active" : ""}`}
                  style={{
                    padding: "1rem 1.25rem",
                    borderRadius: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: "0.35rem",
                    height: "100%",
                    textAlign: "left"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", width: "100%" }}>
                    <span style={{ fontSize: "1.3rem" }}>{persona.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: "0.95rem" }}>{persona.label}</span>
                  </div>
                  <span style={{ fontSize: "0.78rem", color: isSelected ? "var(--accent-blue)" : "var(--text-tertiary)" }}>
                    {persona.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Desired Vibe */}
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "1.2rem"
            }}
          >
            <div
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                backgroundColor: "var(--accent-purple)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.85rem",
                fontWeight: 700
              }}
            >
              2
            </div>
            <h3 style={{ fontSize: "1.3rem", color: "var(--text-primary)" }}>
              What atmosphere do you prioritize?
            </h3>
          </div>

          <div style={{ display: "flex", gap: "0.85rem", flexWrap: "wrap" }}>
            {vibeOptions.map((vibe) => (
              <button
                key={vibe.id}
                onClick={() => setSelectedVibe(vibe.id)}
                className={`palace-chip ${selectedVibe === vibe.id ? "active" : ""}`}
                style={{ padding: "0.75rem 1.5rem" }}
              >
                <span>{vibe.icon}</span>
                <span>{vibe.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Top 3 Recommended Results Section */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: "1rem"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-teal)", fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "0.3rem" }}>
              <Zap size={14} />
              <span>Tailored Intelligence</span>
            </div>
            <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 2.8rem)" }}>
              Top 3 Palace Matches for <span style={{ color: "var(--accent-blue)" }}>{selectedPersona}</span>
            </h2>
          </div>
          <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
            Showing optimized residences ranked by compatibility
          </div>
        </div>

        {/* Reshuffled Cards */}
        <div
          ref={resultsContainerRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "2.5rem"
          }}
        >
          {recommendations.map((room, rank) => {
            const verdict = getConciergeVerdict(room, selectedPersona, rank);
            const rankLabel = rank === 0 ? "Highest Match (99% Fit)" : rank === 1 ? "Secondary Choice (95% Fit)" : "Alternative Luxury (91% Fit)";
            const rankColor = rank === 0 ? "badge-blue" : rank === 1 ? "badge-purple" : "badge-teal";

            return (
              <div key={room.id} className="concierge-card-item">
                <TiltCard onClick={() => onSelectRoom(room)} maxTilt={9} scale={1.018}>
                  <div
                    className="surface-card"
                    style={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                      border: rank === 0 ? "2px solid var(--accent-blue)" : "1px solid var(--border-color)",
                      boxShadow: rank === 0 ? "var(--shadow-glow)" : "var(--shadow-subtle)"
                    }}
                  >
                    {/* Image Area */}
                    <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
                      <img
                        src={room.image}
                        alt={room.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover"
                        }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(11,15,25,0.7) 0%, transparent 60%)"
                        }}
                      />

                      {/* Rank Badge */}
                      <div style={{ position: "absolute", top: "1.2rem", left: "1.2rem" }}>
                        <span className={`badge-pill ${rankColor}`}>
                          {rankLabel}
                        </span>
                      </div>

                      {/* Price in image */}
                      <div style={{ position: "absolute", bottom: "1.2rem", left: "1.5rem" }}>
                        <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                          <span style={{ fontSize: "1.8rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-serif)" }}>
                            ${room.price}
                          </span>
                          <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>/ night</span>
                        </div>
                      </div>
                    </div>

                    {/* Content & Concierge Verdict */}
                    <div
                      style={{
                        padding: "1.75rem",
                        display: "flex",
                        flexDirection: "column",
                        flexGrow: 1,
                        justifyContent: "space-between"
                      }}
                    >
                      <div>
                        <h3 style={{ fontSize: "1.4rem", marginBottom: "0.4rem", color: "var(--text-primary)" }}>
                          {room.name}
                        </h3>
                        <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.2rem" }}>
                          {room.subtitle}
                        </p>

                        {/* Concierge Reason Callout Box */}
                        <div
                          style={{
                            padding: "1rem 1.25rem",
                            borderRadius: "14px",
                            backgroundColor: "var(--bg-base)",
                            border: "1px solid var(--border-color)",
                            marginBottom: "1.5rem"
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-purple)", fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase", marginBottom: "0.4rem" }}>
                            <Info size={14} />
                            <span>Concierge Evaluation</span>
                          </div>
                          <p style={{ fontSize: "0.88rem", color: "var(--text-primary)", lineHeight: 1.6, margin: 0 }}>
                            {verdict}
                          </p>
                        </div>

                        {/* Inclusions */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1.5rem" }}>
                          {room.features.slice(0, 3).map((feat, i) => (
                            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                              <CheckCircle2 size={14} color="var(--accent-teal)" />
                              <span>{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Action Row */}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          paddingTop: "1.2rem",
                          borderTop: "1px solid var(--border-color)"
                        }}
                      >
                        <button
                          onClick={() => onSelectRoom(room)}
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 600,
                            color: "var(--accent-blue)",
                            background: "none",
                            border: "none"
                          }}
                        >
                          View Details
                        </button>

                        <button
                          onClick={() => onBookDirect(room)}
                          className="btn-palace-primary"
                          style={{ padding: "0.6rem 1.3rem", fontSize: "0.82rem" }}
                        >
                          <span>Book This Match</span>
                          <ArrowRight size={15} />
                        </button>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
