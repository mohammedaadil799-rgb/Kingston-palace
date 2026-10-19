import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { 
  Calendar, Users, ArrowRight, Star, ShieldCheck, Sparkles, 
  MapPin, Clock, Award, Compass, Heart, Eye, ChevronRight 
} from "lucide-react";
import TiltCard from "../components/TiltCard";
import { ROOMS_COLLECTION, TESTIMONIALS_DATA, AMENITIES_HIGHLIGHTS } from "../data/hotelData";

export default function HomePage({ onSelectRoom, onNavigate, onSearchBooking }) {
  const heroTitleRef = useRef(null);
  const heroSubtitleRef = useRef(null);
  const heroBgRef = useRef(null);
  const bookingWidgetRef = useRef(null);
  const featuredRoomsRef = useRef(null);

  // Quick booking widget state
  const [checkIn, setCheckIn] = useState("2026-10-25");
  const [checkOut, setCheckOut] = useState("2026-10-30");
  const [guests, setGuests] = useState("2");
  const [categoryPreference, setCategoryPreference] = useState("All");

  // GSAP Letter Reveal & Hero Animation
  useEffect(() => {
    const letters = heroTitleRef.current?.querySelectorAll(".letter-reveal-char");
    if (letters && letters.length > 0) {
      gsap.fromTo(
        letters,
        { y: 70, opacity: 0, rotateZ: 4 },
        {
          y: 0,
          opacity: 1,
          rotateZ: 0,
          stagger: 0.035,
          duration: 1.1,
          ease: "power4.out",
          delay: 0.2
        }
      );
    }

    if (heroSubtitleRef.current) {
      gsap.fromTo(
        heroSubtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power3.out" }
      );
    }

    if (bookingWidgetRef.current) {
      gsap.fromTo(
        bookingWidgetRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.1, delay: 0.9, ease: "power3.out" }
      );
    }

    // Parallax background scroll effect
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (heroBgRef.current && scrollY < window.innerHeight) {
        heroBgRef.current.style.transform = `translate3d(0, ${scrollY * 0.38}px, 0) scale(${1 + scrollY * 0.0003})`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    if (onSearchBooking) {
      onSearchBooking({ checkIn, checkOut, guests, categoryPreference });
    }
    onNavigate("rooms");
  };

  const titleWords = ["Kingston", "Palace", "Hotel"];
  const featuredRooms = ROOMS_COLLECTION.slice(0, 3);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* =========================================================================
          HERO SECTION: Full-Screen with Staggered Letter Reveal & Parallax
          ========================================================================= */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "7rem 2rem 5rem",
          overflow: "hidden"
        }}
      >
        {/* Parallax Background Media */}
        <div
          ref={heroBgRef}
          style={{
            position: "absolute",
            inset: "-15% 0 -15% 0",
            backgroundImage: `url('https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=2200&q=90')`,
            backgroundPosition: "center 30%",
            backgroundSize: "cover",
            zIndex: 0,
            willChange: "transform"
          }}
        />

        {/* Ambient Dark Overlay to ensure WCAG AA readability */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(11,15,25,0.65) 0%, rgba(11,15,25,0.85) 100%)",
            zIndex: 1
          }}
        />

        {/* Hero Content */}
        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: "1280px",
            width: "100%",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          {/* Top Heritage Badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.6rem",
              padding: "0.45rem 1.2rem",
              borderRadius: "9999px",
              backgroundColor: "rgba(255, 255, 255, 0.12)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              color: "#F8FAFC",
              fontSize: "0.82rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              marginBottom: "1.8rem"
            }}
          >
            <Sparkles size={14} color="#FBBF24" />
            <span>Condé Nast Gold List 2026 • Estate Founded 1892</span>
          </div>

          {/* Staggered Letter Reveal Title */}
          <h1
            ref={heroTitleRef}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(3rem, 7.5vw, 6.8rem)",
              fontWeight: 600,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              marginBottom: "1.5rem",
              textShadow: "0 10px 40px rgba(0,0,0,0.5)"
            }}
          >
            {titleWords.map((word, wordIdx) => (
              <span key={wordIdx} className="letter-reveal-word">
                {word.split("").map((char, charIdx) => (
                  <span key={charIdx} className="letter-reveal-char">
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          {/* Subtitle & Human Editorial Tagline */}
          <p
            ref={heroSubtitleRef}
            style={{
              fontSize: "clamp(1.05rem, 1.8vw, 1.35rem)",
              color: "#E2E8F0",
              maxWidth: "760px",
              lineHeight: 1.6,
              marginBottom: "3rem",
              textShadow: "0 2px 10px rgba(0,0,0,0.4)"
            }}
          >
            An intimate sanctuary of neoclassical majesty where antique silver, 
            hand-carved Italian marble, and personal 24/7 butler service 
            redefine the art of European palatial hospitality.
          </p>

          {/* =====================================================================
              QUICK BOOKING WIDGET (Glassmorphism Floating Bar)
              ===================================================================== */}
          <div
            ref={bookingWidgetRef}
            className="glass-panel"
            style={{
              width: "100%",
              maxWidth: "1080px",
              borderRadius: "24px",
              padding: "1.5rem 2rem",
              boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
              border: "1px solid rgba(255, 255, 255, 0.25)"
            }}
          >
            <form
              onSubmit={handleQuickSearch}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr)) auto",
                gap: "1.25rem",
                alignItems: "center"
              }}
            >
              {/* Check-In */}
              <div style={{ textAlign: "left" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--accent-blue)",
                    marginBottom: "0.4rem",
                    fontWeight: 600
                  }}
                >
                  <Calendar size={13} />
                  <span>Arrival Date</span>
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontWeight: 500
                  }}
                />
              </div>

              {/* Check-Out */}
              <div style={{ textAlign: "left" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--accent-blue)",
                    marginBottom: "0.4rem",
                    fontWeight: 600
                  }}
                >
                  <Calendar size={13} />
                  <span>Departure Date</span>
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontWeight: 500
                  }}
                />
              </div>

              {/* Guests */}
              <div style={{ textAlign: "left" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--accent-purple)",
                    marginBottom: "0.4rem",
                    fontWeight: 600
                  }}
                >
                  <Users size={13} />
                  <span>Guests &amp; Suites</span>
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontWeight: 500
                  }}
                >
                  <option value="1">1 Guest (Solo Traveler / Student)</option>
                  <option value="2">2 Guests (Couple / Friends)</option>
                  <option value="3">3 Guests (Executive Group)</option>
                  <option value="4">4 Guests (Family / Group)</option>
                  <option value="6">6-8 Guests (Grand Penthouse / Estate)</option>
                </select>
              </div>

              {/* Collection Tier */}
              <div style={{ textAlign: "left" }}>
                <label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    color: "var(--accent-teal)",
                    marginBottom: "0.4rem",
                    fontWeight: 600
                  }}
                >
                  <Compass size={13} />
                  <span>Atmosphere</span>
                </label>
                <select
                  value={categoryPreference}
                  onChange={(e) => setCategoryPreference(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.7rem 0.9rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-surface)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)",
                    fontWeight: 500
                  }}
                >
                  <option value="All">All Curated Suites</option>
                  <option value="Royal Suites">Royal Imperial Suites</option>
                  <option value="Penthouse">Celestial Penthouse</option>
                  <option value="Romantic Retreats">Couples Sanctuary</option>
                  <option value="Modern Pods">Scholar &amp; Student Pods</option>
                </select>
              </div>

              {/* Submit CTA */}
              <div style={{ alignSelf: "end" }}>
                <button
                  type="submit"
                  className="btn-palace-primary"
                  style={{
                    height: "46px",
                    padding: "0 1.8rem",
                    width: "100%",
                    whiteSpace: "nowrap"
                  }}
                >
                  <span>Check Availability</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Live Palace Coordinates & Estate Time ticker */}
        <div
          style={{
            position: "absolute",
            bottom: "1.2rem",
            left: "2.5rem",
            right: "2.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.78rem",
            color: "#CBD5E1",
            zIndex: 2,
            letterSpacing: "0.08em"
          }}
          className="hidden-mobile"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <MapPin size={13} color="var(--accent-blue)" />
            <span>24.5764° N, 73.6835° E • Kingston Palace Lakeside Grounds</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Clock size={13} color="var(--accent-yellow)" />
            <span>Estate Time: 15:52 CEST • Butler Concierge On Duty</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FEATURED GLIMPSE: 3 Highlighted Luxury Rooms with 3D Tilt Effect
          ========================================================================= */}
      <section
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          padding: "7rem 2.5rem 5rem"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "3.5rem",
            flexWrap: "wrap",
            gap: "1.5rem"
          }}
        >
          <div>
            <span
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--accent-blue)",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.5rem"
              }}
            >
              The Curated Selection
            </span>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.5vw, 3.2rem)" }}>
              Featured Residences &amp; Penthouses
            </h2>
          </div>
          <button
            onClick={() => onNavigate("rooms")}
            className="btn-palace-outline"
          >
            <span>Explore Entire 8-Suite Collection</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* 3D Tilt Grid */}
        <div
          ref={featuredRoomsRef}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "2.5rem"
          }}
        >
          {featuredRooms.map((room) => (
            <TiltCard
              key={room.id}
              onClick={() => onSelectRoom(room)}
              maxTilt={10}
              scale={1.018}
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
                {/* Image Container with Badges */}
                <div style={{ position: "relative", height: "290px", overflow: "hidden" }}>
                  <img
                    src={room.image}
                    alt={room.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)"
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to top, rgba(11,15,25,0.7) 0%, transparent 60%)"
                    }}
                  />

                  {/* Top Badge */}
                  <div style={{ position: "absolute", top: "1.2rem", left: "1.2rem", zIndex: 2 }}>
                    <span className="badge-pill badge-blue">{room.badge}</span>
                  </div>

                  {/* Rating Tag */}
                  <div
                    style={{
                      position: "absolute",
                      top: "1.2rem",
                      right: "1.2rem",
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: "0.3rem",
                      padding: "0.3rem 0.7rem",
                      borderRadius: "9999px",
                      backgroundColor: "rgba(11, 15, 25, 0.75)",
                      backdropFilter: "blur(6px)",
                      color: "#FBBF24",
                      fontSize: "0.8rem",
                      fontWeight: 600
                    }}
                  >
                    <Star size={13} fill="#FBBF24" />
                    <span>{room.rating}</span>
                  </div>

                  {/* Price Tag in Image */}
                  <div style={{ position: "absolute", bottom: "1.2rem", left: "1.5rem", zIndex: 2 }}>
                    <div style={{ fontSize: "0.75rem", color: "#CBD5E1", textTransform: "uppercase" }}>
                      From
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem" }}>
                      <span style={{ fontSize: "1.85rem", fontWeight: 700, color: "#FFFFFF", fontFamily: "var(--font-serif)" }}>
                        ${room.price}
                      </span>
                      <span style={{ color: "#94A3B8", fontSize: "0.85rem" }}>/ night</span>
                    </div>
                  </div>
                </div>

                {/* Content Details */}
                <div style={{ padding: "1.75rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                  <div>
                    <h3
                      style={{
                        fontSize: "1.45rem",
                        marginBottom: "0.5rem",
                        color: "var(--text-primary)"
                      }}
                    >
                      {room.name}
                    </h3>
                    <p
                      style={{
                        fontSize: "0.9rem",
                        color: "var(--text-secondary)",
                        lineHeight: 1.6,
                        marginBottom: "1.2rem"
                      }}
                    >
                      {room.subtitle}
                    </p>

                    {/* Quick Specs */}
                    <div
                      style={{
                        display: "flex",
                        gap: "1.2rem",
                        fontSize: "0.82rem",
                        color: "var(--text-tertiary)",
                        paddingBottom: "1.2rem",
                        borderBottom: "1px solid var(--border-color)",
                        marginBottom: "1.2rem"
                      }}
                    >
                      <span>{room.sqft} sq.ft</span>
                      <span>•</span>
                      <span>Up to {room.maxGuests} Guests</span>
                      <span>•</span>
                      <span>{room.view}</span>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "var(--accent-blue)",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.4rem"
                      }}
                    >
                      <span>Explore Suite Details</span>
                      <ChevronRight size={15} />
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectRoom(room);
                      }}
                      className="btn-palace-primary"
                      style={{ padding: "0.55rem 1.2rem", fontSize: "0.8rem" }}
                    >
                      <span>Reserve</span>
                    </button>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>
      </section>

      {/* =========================================================================
          EDITORIAL ASYMMETRICAL STORY SECTION
          ========================================================================= */}
      <section
        style={{
          backgroundColor: "var(--bg-surface)",
          borderTop: "1px solid var(--border-color)",
          borderBottom: "1px solid var(--border-color)",
          padding: "6rem 2.5rem"
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
            gap: "4rem",
            alignItems: "center"
          }}
        >
          {/* Overlapping Images Composition */}
          <div style={{ position: "relative", minHeight: "440px" }}>
            <div
              style={{
                width: "82%",
                height: "360px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "var(--shadow-elevated)",
                border: "1px solid var(--border-color)"
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85"
                alt="Estate swimming waters"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Overlapping Floating Element */}
            <div
              className="surface-card"
              style={{
                position: "absolute",
                bottom: 0,
                right: "5%",
                width: "60%",
                padding: "1.5rem",
                borderRadius: "16px",
                border: "1px solid var(--border-color)",
                boxShadow: "var(--shadow-glow)"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", color: "var(--accent-yellow)", marginBottom: "0.4rem" }}>
                <Award size={18} />
                <span style={{ fontSize: "0.78rem", fontWeight: 700, textTransform: "uppercase" }}>Heritage Royal Seal</span>
              </div>
              <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>
                134 uninterrupted years of discreet, personalized aristocratic service.
              </p>
            </div>
          </div>

          {/* Editorial Text */}
          <div>
            <span
              style={{
                fontSize: "0.82rem",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                color: "var(--accent-purple)",
                fontWeight: 600,
                display: "block",
                marginBottom: "0.8rem"
              }}
            >
              The Kingston Heritage
            </span>
            <h2 style={{ fontSize: "clamp(2.2rem, 3.2vw, 3.2rem)", marginBottom: "1.5rem" }}>
              Where Aristocratic Grace Meets Modern Stillness
            </h2>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              Every detail within Kingston Palace Hotel is an ode to intentional craftsmanship. 
              From the rare Austrian crystal chandeliers hanging beneath twenty-foot plasterwork ceilings 
              to our private geothermal mineral baths carved into ancient subterranean bedrock.
            </p>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Whether you are an author seeking quiet contemplation in the Scholar Pods, a couple rekindling passion, 
              or a family celebrating milestone generations, our personal footmen ensure every hour is seamless.
            </p>

            {/* Key Amenities Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
              {AMENITIES_HIGHLIGHTS.map((item, idx) => (
                <div key={idx} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: "34px",
                      height: "34px",
                      borderRadius: "10px",
                      backgroundColor: "rgba(37, 99, 235, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--accent-blue)",
                      flexShrink: 0
                    }}
                  >
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TESTIMONIALS: Infinite Scrolling Marquee
          ========================================================================= */}
      <section style={{ padding: "6rem 0", overflow: "hidden" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem", padding: "0 2rem" }}>
          <span
            style={{
              fontSize: "0.82rem",
              textTransform: "uppercase",
              letterSpacing: "0.15em",
              color: "var(--accent-teal)",
              fontWeight: 600,
              display: "block",
              marginBottom: "0.5rem"
            }}
          >
            Letters of Distinction
          </span>
          <h2 style={{ fontSize: "clamp(2.2rem, 3.2vw, 3rem)" }}>
            What Our Honored Guests Say
          </h2>
        </div>

        {/* Marquee Track */}
        <div className="marquee-container">
          <div className="marquee-track">
            {/* Render items twice for infinite loop */}
            {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map((item, idx) => (
              <div
                key={idx}
                className="surface-card"
                style={{
                  width: "420px",
                  padding: "2rem",
                  flexShrink: 0,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between"
                }}
              >
                <div>
                  {/* Rating Stars & Tag */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", gap: "0.25rem", color: "#FBBF24" }}>
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#FBBF24" />
                      ))}
                    </div>
                    <span className="badge-pill badge-teal" style={{ fontSize: "0.7rem" }}>
                      {item.tag}
                    </span>
                  </div>

                  <p
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontSize: "1.05rem",
                      lineHeight: 1.6,
                      color: "var(--text-primary)",
                      fontStyle: "italic",
                      marginBottom: "1.5rem"
                    }}
                  >
                    "{item.quote}"
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", paddingTop: "1rem", borderTop: "1px solid var(--border-color)" }}>
                  <img
                    src={item.avatar}
                    alt={item.author}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "1.5px solid var(--accent-blue)"
                    }}
                  />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                      {item.author}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>
                      {item.title}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONCIERGE INVITATION CTA BANNER
          ========================================================================= */}
      <section
        style={{
          maxWidth: "1440px",
          margin: "0 auto 6rem",
          padding: "0 2.5rem"
        }}
      >
        <div
          className="surface-card"
          style={{
            padding: "4rem 3rem",
            background: "linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(124,58,237,0.08) 100%)",
            border: "1px solid var(--border-color)",
            borderRadius: "28px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "2.5rem"
          }}
        >
          <div style={{ maxWidth: "680px" }}>
            <span className="badge-pill badge-purple" style={{ marginBottom: "1rem" }}>
              Intelligent Matching Engine
            </span>
            <h2 style={{ fontSize: "clamp(2rem, 3vw, 2.7rem)", marginBottom: "1rem" }}>
              Unsure Which Residence Fits Your Occasion?
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", lineHeight: 1.7 }}>
              Let our interactive Digital Concierge analyze your party size, stay duration, 
              and sensory preferences to recommend your perfect palace residence with bespoke insights.
            </p>
          </div>

          <div>
            <button
              onClick={() => onNavigate("concierge")}
              className="btn-palace-primary"
              style={{ padding: "1rem 2.2rem", fontSize: "0.95rem" }}
            >
              <span>Launch Concierge Engine</span>
              <ArrowRight size={17} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
