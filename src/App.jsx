import React, { useState, useEffect } from "react";
import gsap from "gsap";
import Header from "./components/Header";
import CustomCursor from "./components/CustomCursor";
import RoomModal from "./components/RoomModal";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import ConciergePage from "./pages/ConciergePage";
import GalleryPage from "./pages/GalleryPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import { ROOMS_COLLECTION } from "./data/hotelData";

export default function App() {
  // Theme State: 'dark' by default for luxury glowing accents
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("kp_theme") || "dark";
  });

  // Active View / Page: 'home' | 'rooms' | 'concierge' | 'gallery' | 'checkout' | 'contact'
  const [activePage, setActivePage] = useState("home");

  // Selected Room for Modal and Booking
  const [modalRoom, setModalRoom] = useState(null);
  const [bookingRoom, setBookingRoom] = useState(ROOMS_COLLECTION[0]);

  // Synchronize Theme attribute on document.documentElement
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("kp_theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  // Global GSAP Scroll reveal on page change & scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out"
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const sections = document.querySelectorAll(".surface-card, .masonry-col, .gallery-3d-item");
    sections.forEach((sec) => {
      // Initial state for gentle scroll trigger
      gsap.set(sec, { y: 35, opacity: 0.75 });
      observer.observe(sec);
    });

    return () => observer.disconnect();
  }, [activePage]);

  // Handlers
  const handleOpenRoomModal = (room) => {
    setModalRoom(room);
  };

  const handleCloseRoomModal = () => {
    setModalRoom(null);
  };

  const handleBookDirect = (room) => {
    setBookingRoom(room);
    setActivePage("checkout");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSearchBooking = (params) => {
    setActivePage("rooms");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-container" style={{ position: "relative", minHeight: "100vh" }}>
      {/* Custom Mouse Cursor */}
      <CustomCursor />

      {/* Sticky Header with Navigation and Theme Switch */}
      <Header
        activePage={activePage}
        setActivePage={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Page Rendering */}
      <main style={{ minHeight: "calc(100vh - 120px)" }}>
        {activePage === "home" && (
          <HomePage
            onSelectRoom={handleOpenRoomModal}
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onSearchBooking={handleSearchBooking}
          />
        )}

        {activePage === "rooms" && (
          <RoomsPage
            onSelectRoom={handleOpenRoomModal}
            onBookDirect={handleBookDirect}
          />
        )}

        {activePage === "concierge" && (
          <ConciergePage
            onSelectRoom={handleOpenRoomModal}
            onBookDirect={handleBookDirect}
          />
        )}

        {activePage === "gallery" && (
          <GalleryPage />
        )}

        {activePage === "checkout" && (
          <CheckoutPage
            selectedRoom={bookingRoom}
            onSelectAnotherRoom={() => {
              setActivePage("rooms");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            onNavigateHome={() => {
              setActivePage("home");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}

        {activePage === "contact" && (
          <ContactPage
            onNavigate={(page) => {
              setActivePage(page);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </main>

      {/* Room Details Modal */}
      {modalRoom && (
        <RoomModal
          room={modalRoom}
          onClose={handleCloseRoomModal}
          onBookNow={handleBookDirect}
        />
      )}
    </div>
  );
}
