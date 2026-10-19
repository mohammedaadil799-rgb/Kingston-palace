import React, { useState, useRef, useEffect } from "react";
import { 
  Mail, Phone, MapPin, Send, Compass, Clock, 
  Sparkles, Check, ArrowUpRight, ShieldCheck 
} from "lucide-react";

export default function ContactPage({ onNavigate }) {
  // Contact Form State
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "Private Suite Inquiries",
    message: ""
  });
  const [isSent, setIsSent] = useState(false);

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Magnetic Button Logic
  const magneticBtnRef = useRef(null);

  useEffect(() => {
    const btn = magneticBtnRef.current;
    if (!btn) return;

    const handleMouseMove = (e) => {
      const rect = btn.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - btnCenterX;
      const deltaY = e.clientY - btnCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      // Magnetic pull range (within 120px)
      if (distance < 120) {
        const pullStrength = (120 - distance) / 120;
        const moveX = deltaX * pullStrength * 0.45;
        const moveY = deltaY * pullStrength * 0.45;
        btn.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) scale(1.04)`;
      } else {
        btn.style.transform = `translate3d(0, 0, 0) scale(1)`;
      }
    };

    const handleMouseLeave = () => {
      btn.style.transform = `translate3d(0, 0, 0) scale(1)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setFormState({ name: "", email: "", subject: "Private Suite Inquiries", message: "" });
    }, 4000);
  };

  const handleSubscribeNewsletter = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setTimeout(() => {
      setNewsletterSubscribed(false);
      setNewsletterEmail("");
    }, 4000);
  };

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "8rem 2.5rem 4rem" }}>
      {/* Editorial Header */}
      <div style={{ textAlign: "center", maxWidth: "860px", margin: "0 auto 4rem" }}>
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
          Concierge Secretariat &amp; Estate
        </span>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 4.8vw, 4.2rem)",
            letterSpacing: "-0.03em",
            marginBottom: "1.2rem"
          }}
        >
          Begin Your Sovereign Dialogue
        </h1>
        <p style={{ fontSize: "1.1rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
          Whether orchestrating a private helicopter arrival, a state banquet, or inquiring 
          about long-term sovereign residence, our Butler Secretariat is at your beck and call.
        </p>
      </div>

      {/* Two Column Grid: Contact Form + Interactive Map Card */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "3rem",
          marginBottom: "6rem"
        }}
        className="contact-grid"
      >
        {/* Left Side: Concierge Secretariat Form */}
        <div className="surface-card" style={{ padding: "3rem" }}>
          <h2 style={{ fontSize: "1.8rem", marginBottom: "0.5rem" }}>
            Direct Secretariat Dispatch
          </h2>
          <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontSize: "0.95rem" }}>
            Messages are transmitted directly to the Head Butler's terminal with immediate escalation.
          </p>

          <form onSubmit={handleSendMessage} style={{ display: "flex", flexDirection: "column", gap: "1.4rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Distinguished Title &amp; Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Lord / Lady / Dr. / Mr. / Ms."
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.85rem 1.1rem",
                  borderRadius: "12px",
                  backgroundColor: "var(--bg-base)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)"
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Private Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@domain.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.1rem",
                    borderRadius: "12px",
                    backgroundColor: "var(--bg-base)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Nature of Inquiry
                </label>
                <select
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.85rem 1.1rem",
                    borderRadius: "12px",
                    backgroundColor: "var(--bg-base)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                >
                  <option value="Private Suite Inquiries">Private Suite Inquiries</option>
                  <option value="Helicopter & Yacht Charter">Helicopter &amp; Yacht Charter</option>
                  <option value="Diplomatic & State Banquets">Diplomatic &amp; State Banquets</option>
                  <option value="Exclusive Wedding Buyout">Exclusive Wedding Buyout</option>
                  <option value="Private Dining & Sommelier">Private Dining &amp; Sommelier</option>
                </select>
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Specific Wishes or Confidential Requirements
              </label>
              <textarea
                rows={4}
                required
                placeholder="Kindly note any dietary allergies, required security clearance, or floral preferences..."
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.85rem 1.1rem",
                  borderRadius: "12px",
                  backgroundColor: "var(--bg-base)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  resize: "vertical"
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-palace-primary"
              style={{ padding: "1rem 2rem", width: "100%" }}
            >
              {isSent ? (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Check size={18} />
                  <span>Dispatched to Secretariat</span>
                </div>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <Send size={16} />
                  <span>Transmit Sovereign Inquiry</span>
                </div>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Interactive Google Maps Placeholder & Estate Coordinates */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Map Preview Card */}
          <div
            className="surface-card"
            style={{
              padding: "0",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              position: "relative"
            }}
          >
            <div style={{ height: "340px", width: "100%", position: "relative" }}>
              {/* High-res satellite / architectural aerial view simulating luxury interactive map */}
              <img
                src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85"
                alt="Kingston Palace Estate Location Map"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: "contrast(1.05) brightness(0.9)" }}
              />

              {/* Map UI Overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(circle at center, transparent 30%, rgba(11,15,25,0.7) 100%)",
                  pointerEvents: "none"
                }}
              />

              {/* Pin Center Marker */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center"
                }}
              >
                <div
                  style={{
                    padding: "0.5rem 1rem",
                    borderRadius: "9999px",
                    backgroundColor: "rgba(11, 15, 25, 0.9)",
                    border: "1.5px solid var(--accent-blue)",
                    color: "#FFFFFF",
                    fontSize: "0.82rem",
                    fontWeight: 700,
                    boxShadow: "var(--shadow-glow)",
                    whiteSpace: "nowrap",
                    marginBottom: "0.4rem"
                  }}
                >
                  👑 Kingston Palace Estate
                </div>
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-blue)",
                    border: "3px solid #FFFFFF",
                    boxShadow: "0 0 15px var(--accent-blue)"
                  }}
                />
              </div>

              {/* Top Navigation Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.2rem",
                  left: "1.2rem",
                  padding: "0.4rem 0.9rem",
                  borderRadius: "8px",
                  backgroundColor: "rgba(11,15,25,0.85)",
                  color: "#E2E8F0",
                  fontSize: "0.78rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}
              >
                <Compass size={14} color="var(--accent-teal)" />
                <span>24.5764° N, 73.6835° E • Private Island Access</span>
              </div>
            </div>

            <div style={{ padding: "1.75rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                  By Air &amp; Helicopter
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                  Private Helipad Code: EK-01 (14 mins from Int'l Airport)
                </div>
              </div>
              <div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>
                  By Water &amp; Limousine
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                  Private Venetian Gondola Pier 4
                </div>
              </div>
            </div>
          </div>

          {/* Quick Contact Info Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div className="surface-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-blue)", marginBottom: "0.5rem" }}>
                <Phone size={17} />
                <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase" }}>Butler Direct</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>+44 20 7946 0921</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>24 Hours International line</div>
            </div>

            <div className="surface-card" style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--accent-purple)", marginBottom: "0.5rem" }}>
                <Mail size={17} />
                <span style={{ fontSize: "0.82rem", fontWeight: 700, textTransform: "uppercase" }}>Secretariat</span>
              </div>
              <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>concierge@kingstonpalace.com</div>
              <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)" }}>Encrypted PGP Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          VIP NEWSLETTER WITH MAGNETIC SUBMIT BUTTON
          ========================================================================= */}
      <div
        className="surface-card"
        style={{
          padding: "4.5rem 3rem",
          background: "linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(13,148,136,0.06) 100%)",
          borderRadius: "28px",
          border: "1px solid var(--border-color)",
          textAlign: "center",
          marginBottom: "6rem",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <span className="badge-pill badge-teal" style={{ marginBottom: "1rem" }}>
          Private Chronicles
        </span>
        <h2 style={{ fontSize: "clamp(2rem, 3.5vw, 3rem)", marginBottom: "1rem" }}>
          Join the Kingston Sovereign Circle
        </h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: "620px", margin: "0 auto 2.5rem", fontSize: "1.05rem", lineHeight: 1.6 }}>
          Receive quarterly private vintage releases, invitations to unlisted summer galas, 
          and priority reservation allotments before public releases.
        </p>

        <form
          onSubmit={handleSubscribeNewsletter}
          style={{
            maxWidth: "520px",
            margin: "0 auto",
            display: "flex",
            gap: "0.75rem",
            alignItems: "center"
          }}
        >
          <input
            type="email"
            required
            placeholder="Enter your confidential email..."
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            style={{
              flexGrow: 1,
              padding: "0.95rem 1.4rem",
              borderRadius: "9999px",
              backgroundColor: "var(--bg-base)",
              border: "1px solid var(--border-color)",
              color: "var(--text-primary)",
              fontSize: "0.95rem"
            }}
          />

          {/* Magnetic Submit Button */}
          <button
            ref={magneticBtnRef}
            type="submit"
            className="btn-palace-primary"
            style={{
              padding: "0.95rem 1.8rem",
              whiteSpace: "nowrap",
              transition: "transform 0.15s cubic-bezier(0.2, 0, 0, 1), box-shadow 0.2s ease"
            }}
          >
            {newsletterSubscribed ? (
              <span style={{ color: "var(--accent-teal)" }}>Enrolled ✓</span>
            ) : (
              <span>Request Folio</span>
            )}
          </button>
        </form>
      </div>

      {/* =========================================================================
          GRAND EDITORIAL FOOTER
          ========================================================================= */}
      <footer
        style={{
          paddingTop: "5rem",
          borderTop: "1px solid var(--border-color)",
          position: "relative"
        }}
      >
        {/* Massive Brand Typography */}
        <div
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(3.5rem, 11vw, 11rem)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            textAlign: "center",
            lineHeight: 0.9,
            color: "var(--text-primary)",
            opacity: 0.08,
            userSelect: "none",
            marginBottom: "3rem",
            pointerEvents: "none"
          }}
        >
          KINGSTON PALACE
        </div>

        {/* Footer Navigation Columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2.5rem",
            marginBottom: "4rem"
          }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "1.5rem" }}>👑</span>
              <span style={{ fontFamily: "var(--font-serif)", fontWeight: 700, fontSize: "1.2rem", letterSpacing: "0.05em" }}>
                KINGSTON PALACE
              </span>
            </div>
            <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "1.2rem" }}>
              A sanctuary of uncompromised European nobility, lakeside solace, and timeless gastronomic art.
            </p>
            <div style={{ fontSize: "0.82rem", color: "var(--accent-blue)", fontWeight: 600 }}>
              Member of The Leading Hotels of the World
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem", color: "var(--text-primary)" }}>
              The Collection
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
              <button onClick={() => onNavigate("rooms")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                The Royal Sovereign Suite
              </button>
              <button onClick={() => onNavigate("rooms")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                The Celestial Penthouse
              </button>
              <button onClick={() => onNavigate("rooms")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                Couples Intimate Sanctuary
              </button>
              <button onClick={() => onNavigate("rooms")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                Cozy Scholar &amp; Student Pods
              </button>
              <button onClick={() => onNavigate("rooms")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                Grand Family Heritage Haven
              </button>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem", color: "var(--text-primary)" }}>
              Experience &amp; Dining
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.88rem", color: "var(--text-secondary)" }}>
              <button onClick={() => onNavigate("gallery")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                L'Orangerie 3-Star Michelin
              </button>
              <button onClick={() => onNavigate("gallery")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                Thermal Geothermal Spa
              </button>
              <button onClick={() => onNavigate("gallery")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                Sommelier Heirloom Vault
              </button>
              <button onClick={() => onNavigate("concierge")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                Intelligent Concierge Engine
              </button>
              <button onClick={() => onNavigate("gallery")} style={{ textAlign: "left", background: "none", border: "none", color: "inherit", cursor: "pointer" }}>
                3D Virtual Architecture
              </button>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1.2rem", color: "var(--text-primary)" }}>
              Estate Protocol
            </h4>
            <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", lineHeight: 1.7 }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Dress Code:</strong> Smart Elegant in public salons after 18:00 hours.
              </div>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Arrival:</strong> Check-in from 15:00 • Express Checkout 12:00.
              </div>
              <div>
                <strong>Security:</strong> Full biometric privacy protection throughout estate grounds.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div
          style={{
            paddingTop: "2rem",
            borderTop: "1px solid var(--border-color)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "1rem",
            fontSize: "0.82rem",
            color: "var(--text-tertiary)"
          }}
        >
          <div>
            © 1892–2026 Kingston Palace Hotel &amp; Grand Resort Ltd. All Rights Reserved.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>Privacy Charter</span>
            <span>Terms of Sovereignty</span>
            <span>Accessibility (WCAG AA)</span>
            <span>Helipad Registry</span>
          </div>
        </div>
      </footer>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 992px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
