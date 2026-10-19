import React, { useState, useEffect } from "react";
import { Sun, Moon, Sparkles, Menu, X, ArrowRight, ShieldCheck } from "lucide-react";

export default function Header({ activePage, setActivePage, theme, toggleTheme, onOpenReserve }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Overview" },
    { id: "rooms", label: "The Collection" },
    { id: "concierge", label: "The Concierge" },
    { id: "gallery", label: "3D Gallery" },
    { id: "checkout", label: "Reservation" },
    { id: "contact", label: "Contact & Estate" }
  ];

  const handleNavClick = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 900,
          transition: "all 0.35s ease",
          padding: isScrolled ? "0.85rem 2rem" : "1.4rem 2.5rem",
          backgroundColor: isScrolled
            ? "var(--glass-bg)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: isScrolled ? "blur(18px)" : "none",
          borderBottom: isScrolled
            ? "1px solid var(--border-color)"
            : "1px solid transparent"
        }}
      >
        <div
          style={{
            maxWidth: "1440px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          {/* Brand Logo */}
          <button
            onClick={() => handleNavClick("home")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.85rem",
              textAlign: "left",
              background: "none",
              border: "none",
              cursor: "pointer"
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.2))",
                border: "1.5px solid var(--accent-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.2rem",
                boxShadow: "0 4px 12px rgba(37,99,235,0.15)"
              }}
            >
              👑
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "var(--text-primary)",
                  lineHeight: 1.1
                }}
              >
                KINGSTON PALACE
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  letterSpacing: "0.22em",
                  color: "var(--accent-blue)",
                  textTransform: "uppercase",
                  fontWeight: 600
                }}
              >
                HOTEL &amp; GRAND RESORT
              </div>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              background: isScrolled ? "transparent" : "var(--glass-bg)",
              padding: isScrolled ? "0" : "0.4rem 0.8rem",
              borderRadius: "9999px",
              border: isScrolled ? "none" : "1px solid var(--border-color)",
              backdropFilter: isScrolled ? "none" : "blur(12px)"
            }}
            className="hidden-mobile"
          >
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    position: "relative",
                    padding: "0.55rem 1.1rem",
                    fontSize: "0.88rem",
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? "var(--accent-blue)" : "var(--text-secondary)",
                    borderRadius: "9999px",
                    background: isActive ? "var(--chip-active-bg)" : "transparent",
                    border: isActive ? "1px solid var(--chip-active-border)" : "1px solid transparent",
                    transition: "all 0.25s ease"
                  }}
                >
                  {item.label}
                  {item.id === "concierge" && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-2px",
                        right: "-2px",
                        display: "flex",
                        height: "8px",
                        width: "8px"
                      }}
                    >
                      <span
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: "50%",
                          backgroundColor: "var(--accent-teal)",
                          opacity: 0.75,
                          animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite"
                        }}
                      />
                      <span
                        style={{
                          position: "relative",
                          borderRadius: "50%",
                          height: "8px",
                          width: "8px",
                          backgroundColor: "var(--accent-teal)"
                        }}
                      />
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Theme Toggle & CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Dark / Light Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)",
                transition: "all 0.3s ease"
              }}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {theme === "dark" ? (
                <Sun size={19} color="var(--accent-yellow)" />
              ) : (
                <Moon size={19} color="var(--accent-blue)" />
              )}
            </button>

            {/* Book Now Button */}
            <button
              onClick={() => handleNavClick("rooms")}
              className="btn-palace-primary hidden-mobile"
              style={{ padding: "0.65rem 1.4rem", fontSize: "0.82rem" }}
            >
              <span>Explore Suites</span>
              <ArrowRight size={15} />
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="visible-mobile"
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "var(--bg-surface)",
                border: "1px solid var(--border-color)",
                color: "var(--text-primary)"
              }}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 890,
            backgroundColor: "var(--bg-base)",
            padding: "6rem 2rem 2rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.75rem",
                  textAlign: "left",
                  color: activePage === item.id ? "var(--accent-blue)" : "var(--text-primary)",
                  padding: "0.5rem 0",
                  borderBottom: "1px solid var(--border-color)"
                }}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div style={{ marginTop: "2rem" }}>
            <button
              onClick={() => handleNavClick("checkout")}
              className="btn-palace-primary"
              style={{ width: "100%", padding: "1rem" }}
            >
              <span>Instant Reservation</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Responsive CSS for Header */}
      <style>{`
        @media (max-width: 992px) {
          .hidden-mobile { display: none !important; }
          .visible-mobile { display: flex !important; }
        }
      `}</style>
    </>
  );
}
