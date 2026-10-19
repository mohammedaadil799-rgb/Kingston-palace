import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { 
  ShieldCheck, CreditCard, QrCode, Lock, CheckCircle2, 
  Sparkles, Calendar, Users, AlertCircle, ArrowRight, 
  Printer, Check, ChevronDown, Download, HeartHandshake 
} from "lucide-react";
import { ROOMS_COLLECTION } from "../data/hotelData";

export default function CheckoutPage({ selectedRoom, onSelectAnotherRoom, onNavigateHome }) {
  // Room fallback
  const room = selectedRoom || ROOMS_COLLECTION[0];

  // Booking Dates & Guest Count
  const [checkInDate, setCheckInDate] = useState("2026-10-25");
  const [checkOutDate, setCheckOutDate] = useState("2026-10-28");
  const [nights, setNights] = useState(3);
  const [guestsCount, setGuestsCount] = useState(2);
  const [includeLimousine, setIncludeLimousine] = useState(false);

  // Guest Details Form State
  const [guestForm, setGuestForm] = useState({
    firstName: "Lord Harrison",
    lastName: "Sterling",
    email: "harrison.sterling@mayfair-advisory.co.uk",
    phone: "+44 7911 123456",
    country: "United Kingdom",
    arrivalHour: "15:00 - 16:00",
    dietary: "Gluten-free, prefers Earl Grey tea & sparkling mineral water",
    specialRequests: "High floor requested with quiet garden sunrise orientation."
  });

  // Coupon State
  const [couponCode, setCouponCode] = useState("ROYAL20");
  const [isCouponApplied, setIsCouponApplied] = useState(true);
  const [couponFeedback, setCouponFeedback] = useState("20% Royal Heritage discount applied!");

  // Payment Selection: "upi" | "phonepe" | "paytm" | "netbanking" | "paypal" | "card"
  const [paymentMethod, setPaymentMethod] = useState("upi");

  // Specific Payment Inputs
  const [upiId, setUpiId] = useState("sterling@oksbi");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [mobileWalletNumber, setMobileWalletNumber] = useState("+91 98765 43210");
  const [cardDetails, setCardDetails] = useState({
    number: "4532 •••• •••• 8892",
    name: "HARRISON STERLING",
    expiry: "11/29",
    cvv: "•••"
  });

  // Confirmation / Processing State
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState("");

  // Recalculate nights whenever dates change
  useEffect(() => {
    try {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0) {
        setNights(diffDays);
      } else {
        setNights(1);
      }
    } catch {
      setNights(3);
    }
  }, [checkInDate, checkOutDate]);

  // Financial Calculations
  const roomBaseTotal = room.price * nights;
  const resortFee = 120 * nights;
  const limoFee = includeLimousine ? 250 : 0;
  const subTotal = roomBaseTotal + resortFee + limoFee;
  const discountAmount = isCouponApplied ? Math.round(subTotal * 0.2) : 0;
  const grandTotal = subTotal - discountAmount;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === "ROYAL20") {
      setIsCouponApplied(true);
      setCouponFeedback("VIP Privilege 20% discount unlocked!");
    } else {
      setIsCouponApplied(false);
      setCouponFeedback("Invalid promo code. Use 'ROYAL20' for 20% privilege.");
    }
  };

  const handleConfirmReservation = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const code = `KP-${Math.floor(100000 + Math.random() * 900000)}-X`;
      setConfirmationCode(code);
      setBookingConfirmed(true);

      // Trigger ecstatic celebratory confetti
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    }, 1800);
  };

  return (
    <div style={{ maxWidth: "1440px", margin: "0 auto", padding: "8rem 2.5rem 6rem" }}>
      {/* Editorial Header */}
      <div style={{ textAlign: "center", maxWidth: "840px", margin: "0 auto 3.5rem" }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1.1rem",
            borderRadius: "9999px",
            backgroundColor: "rgba(37, 99, 235, 0.12)",
            border: "1px solid var(--accent-blue)",
            color: "var(--accent-blue)",
            fontSize: "0.82rem",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            marginBottom: "0.85rem"
          }}
        >
          <Lock size={13} />
          <span>256-Bit Encrypted Sovereign Reservation</span>
        </div>
        <h1
          style={{
            fontSize: "clamp(2.4rem, 4.5vw, 3.8rem)",
            letterSpacing: "-0.03em",
            marginBottom: "1rem"
          }}
        >
          Finalize Your Palace Sanctuary
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-secondary)", lineHeight: 1.6 }}>
          Review your residence details, specify custom guest preferences, and choose 
          your preferred international or Indian payment portal.
        </p>
      </div>

      {/* Two-Column Checkout Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.3fr 0.9fr",
          gap: "3rem",
          alignItems: "start"
        }}
        className="checkout-container"
      >
        {/* =====================================================================
            LEFT COLUMN: Guest Details & Payment Method Selection
            ===================================================================== */}
        <div>
          {/* Section 1: Guest Information */}
          <div className="surface-card" style={{ padding: "2.25rem", marginBottom: "2rem" }}>
            <h3 style={{ fontSize: "1.35rem", marginBottom: "1.5rem", color: "var(--text-primary)" }}>
              1. Principal Guest Credentials
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  First &amp; Middle Name
                </label>
                <input
                  type="text"
                  value={guestForm.firstName}
                  onChange={(e) => setGuestForm({ ...guestForm, firstName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-base)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Surname / Family Name
                </label>
                <input
                  type="text"
                  value={guestForm.lastName}
                  onChange={(e) => setGuestForm({ ...guestForm, lastName: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-base)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Official Email Address (For Itinerary)
                </label>
                <input
                  type="email"
                  value={guestForm.email}
                  onChange={(e) => setGuestForm({ ...guestForm, email: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-base)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                  required
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  Contact Telephone / WhatsApp
                </label>
                <input
                  type="tel"
                  value={guestForm.phone}
                  onChange={(e) => setGuestForm({ ...guestForm, phone: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "0.75rem 1rem",
                    borderRadius: "10px",
                    backgroundColor: "var(--bg-base)",
                    border: "1px solid var(--border-color)",
                    color: "var(--text-primary)"
                  }}
                  required
                />
              </div>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                Special Concierge Requests &amp; Pillow / Dietary Preferences
              </label>
              <textarea
                rows={2}
                value={guestForm.dietary}
                onChange={(e) => setGuestForm({ ...guestForm, dietary: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  borderRadius: "10px",
                  backgroundColor: "var(--bg-base)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  resize: "vertical"
                }}
              />
            </div>

            {/* Airport Transfer Option */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.85rem",
                padding: "1rem",
                borderRadius: "12px",
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border-color)",
                cursor: "pointer"
              }}
              onClick={() => setIncludeLimousine(!includeLimousine)}
            >
              <input
                type="checkbox"
                checked={includeLimousine}
                onChange={(e) => setIncludeLimousine(e.target.checked)}
                style={{ width: "18px", height: "18px", accentColor: "var(--accent-blue)", cursor: "pointer" }}
              />
              <div>
                <div style={{ fontWeight: 600, fontSize: "0.92rem", color: "var(--text-primary)" }}>
                  Add Private Chauffeur Rolls-Royce / Electric Gondola Transfer (+$250)
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                  Curbside flight greeting with chilled champagne and luggage handling.
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Payment Gateway Options */}
          <div className="surface-card" style={{ padding: "2.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "1.35rem", color: "var(--text-primary)" }}>
                2. Select Sovereign Payment Method
              </h3>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--accent-teal)", fontSize: "0.78rem", fontWeight: 600 }}>
                <ShieldCheck size={16} />
                <span>Zero Transaction Fee</span>
              </div>
            </div>

            {/* Payment Method Selector Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "0.85rem",
                marginBottom: "2rem"
              }}
            >
              {[
                { id: "upi", label: "UPI Instant", icon: "⚡", tag: "GPay / BHIM" },
                { id: "phonepe", label: "PhonePe", icon: "📱", tag: "Direct App" },
                { id: "paytm", label: "Paytm", icon: "💳", tag: "Wallet / Postpaid" },
                { id: "netbanking", label: "Netbanking", icon: "🏛️", tag: "Major Banks" },
                { id: "paypal", label: "PayPal", icon: "🌐", tag: "International" },
                { id: "card", label: "Card / Amex", icon: "💎", tag: "Credit / Debit" }
              ].map((m) => {
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      padding: "1rem 0.75rem",
                      borderRadius: "14px",
                      backgroundColor: isSelected ? "var(--chip-active-bg)" : "var(--bg-base)",
                      border: isSelected ? "1.5px solid var(--accent-blue)" : "1px solid var(--border-color)",
                      color: isSelected ? "var(--accent-blue)" : "var(--text-primary)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "0.35rem",
                      transition: "all 0.25s ease",
                      cursor: "pointer",
                      boxShadow: isSelected ? "var(--shadow-glow)" : "none"
                    }}
                  >
                    <span style={{ fontSize: "1.4rem" }}>{m.icon}</span>
                    <span style={{ fontWeight: 600, fontSize: "0.88rem" }}>{m.label}</span>
                    <span style={{ fontSize: "0.7rem", color: "var(--text-tertiary)" }}>{m.tag}</span>
                  </button>
                );
              })}
            </div>

            {/* Smooth Accordion Dropdown for Selected Payment Method */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "16px",
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border-color)",
                animation: "fadeIn 0.3s ease"
              }}
            >
              {/* UPI Option */}
              {paymentMethod === "upi" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "var(--accent-blue)", fontWeight: 600 }}>
                    <QrCode size={18} />
                    <span>Scan Palace QR or Enter Virtual Payment Address (VPA)</span>
                  </div>

                  <div style={{ display: "grid", gridTemplateColumns: "160px 1fr", gap: "2rem", alignItems: "center" }}>
                    {/* Simulated High-Res QR Code Placeholder */}
                    <div
                      style={{
                        padding: "0.85rem",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "14px",
                        border: "1px solid var(--border-color)",
                        textAlign: "center"
                      }}
                    >
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=upi://pay?pa=kingstonpalace@icici&pn=KingstonPalaceHotel&am=2850"
                        alt="Palace Payment QR"
                        style={{ width: "100%", height: "auto", display: "block" }}
                      />
                      <span style={{ fontSize: "0.68rem", color: "#475569", marginTop: "0.4rem", display: "block", fontWeight: 600 }}>
                        Scan via any UPI App
                      </span>
                    </div>

                    <div>
                      <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                        Or Enter Your UPI ID (e.g. name@okhdfcbank)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@upi"
                        style={{
                          width: "100%",
                          padding: "0.75rem 1rem",
                          borderRadius: "10px",
                          backgroundColor: "var(--bg-surface)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-primary)",
                          marginBottom: "0.75rem"
                        }}
                      />
                      <div style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <CheckCircle2 size={13} color="var(--accent-teal)" />
                        <span>Instant payment authorization with 100% bank escrow protection.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* PhonePe Option */}
              {paymentMethod === "phonepe" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "var(--accent-purple)", fontWeight: 600 }}>
                    <span>PhonePe Direct Checkout</span>
                  </div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Registered PhonePe Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobileWalletNumber}
                    onChange={(e) => setMobileWalletNumber(e.target.value)}
                    style={{
                      width: "100%",
                      maxWidth: "360px",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      marginBottom: "0.75rem"
                    }}
                  />
                  <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
                    You will receive an in-app payment mandate notification on PhonePe.
                  </div>
                </div>
              )}

              {/* Paytm Option */}
              {paymentMethod === "paytm" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "var(--accent-blue)", fontWeight: 600 }}>
                    <span>Paytm Wallet &amp; Postpaid</span>
                  </div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                    Registered Paytm Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobileWalletNumber}
                    onChange={(e) => setMobileWalletNumber(e.target.value)}
                    style={{
                      width: "100%",
                      maxWidth: "360px",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      marginBottom: "0.75rem"
                    }}
                  />
                  <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
                    Fast OTP login to access Paytm Balance or UPI Lite.
                  </div>
                </div>
              )}

              {/* Netbanking Option */}
              {paymentMethod === "netbanking" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "var(--accent-teal)", fontWeight: 600 }}>
                    <span>Select Corporate or Personal Banking Portal</span>
                  </div>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    style={{
                      width: "100%",
                      maxWidth: "400px",
                      padding: "0.75rem 1rem",
                      borderRadius: "10px",
                      backgroundColor: "var(--bg-surface)",
                      border: "1px solid var(--border-color)",
                      color: "var(--text-primary)",
                      marginBottom: "0.75rem"
                    }}
                  >
                    <option value="HDFC Bank">HDFC Bank (Private Wealth / Preferred)</option>
                    <option value="ICICI Bank">ICICI Bank (The One / Wealth Management)</option>
                    <option value="State Bank of India">State Bank of India (Global Netbanking)</option>
                    <option value="Axis Bank">Axis Bank (Burgundy Client Banking)</option>
                    <option value="HSBC Premier">HSBC Premier Global Banking</option>
                  </select>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-tertiary)" }}>
                    Redirects to encrypted 3D-secure portal upon submission.
                  </div>
                </div>
              )}

              {/* PayPal Option */}
              {paymentMethod === "paypal" && (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem", color: "#2563EB", fontWeight: 600 }}>
                    <span>PayPal International One-Click</span>
                  </div>
                  <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                    Pay securely in USD, EUR, GBP, or INR with PayPal Buyer Protection and multiple currency conversion options.
                  </p>
                  <div
                    style={{
                      padding: "0.75rem 1.5rem",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.6rem",
                      backgroundColor: "#FFC439",
                      color: "#003087",
                      fontWeight: 700,
                      borderRadius: "9999px",
                      fontSize: "0.95rem"
                    }}
                  >
                    <span>Pay with</span>
                    <span style={{ fontStyle: "italic", fontWeight: 800 }}>PayPal</span>
                  </div>
                </div>
              )}

              {/* Card Option */}
              {paymentMethod === "card" && (
                <div>
                  <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: "1rem" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={cardDetails.number}
                        onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.7rem 0.9rem",
                          borderRadius: "10px",
                          backgroundColor: "var(--bg-surface)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-primary)"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                        Expiry MM/YY
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.7rem 0.9rem",
                          borderRadius: "10px",
                          backgroundColor: "var(--bg-surface)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-primary)"
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "var(--text-secondary)", marginBottom: "0.3rem" }}>
                        CVV / CVC
                      </label>
                      <input
                        type="password"
                        value={cardDetails.cvv}
                        onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        style={{
                          width: "100%",
                          padding: "0.7rem 0.9rem",
                          borderRadius: "10px",
                          backgroundColor: "var(--bg-surface)",
                          border: "1px solid var(--border-color)",
                          color: "var(--text-primary)"
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* =====================================================================
            RIGHT COLUMN: Sticky Luxury Order Summary
            ===================================================================== */}
        <div style={{ position: "sticky", top: "7rem" }}>
          <div
            className="surface-card"
            style={{
              padding: "2.25rem",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-elevated)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
              <span className="badge-pill badge-blue">Palace Reservation</span>
              <button
                onClick={onSelectAnotherRoom}
                style={{ fontSize: "0.82rem", color: "var(--accent-blue)", fontWeight: 600, textDecoration: "underline" }}
              >
                Change Suite
              </button>
            </div>

            {/* Selected Room Preview Card */}
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem" }}>
              <img
                src={room.image}
                alt={room.name}
                style={{
                  width: "90px",
                  height: "90px",
                  borderRadius: "12px",
                  objectFit: "cover",
                  flexShrink: 0
                }}
              />
              <div>
                <h4 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "0.2rem" }}>
                  {room.name}
                </h4>
                <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", marginBottom: "0.4rem" }}>
                  {room.category} • {room.sqft} sq.ft
                </div>
                <div style={{ fontSize: "0.82rem", color: "var(--accent-blue)", fontWeight: 600 }}>
                  ${room.price} / night
                </div>
              </div>
            </div>

            {/* Dates & Nights Config */}
            <div
              style={{
                padding: "1rem",
                borderRadius: "12px",
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border-color)",
                marginBottom: "1.5rem"
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem", marginBottom: "0.75rem" }}>
                <div>
                  <label style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>Check-In</label>
                  <input
                    type="date"
                    value={checkInDate}
                    onChange={(e) => setCheckInDate(e.target.value)}
                    style={{ width: "100%", padding: "0.4rem", borderRadius: "6px", backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-color)", fontSize: "0.85rem" }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "0.72rem", color: "var(--text-tertiary)", textTransform: "uppercase" }}>Check-Out</label>
                  <input
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => setCheckOutDate(e.target.value)}
                    style={{ width: "100%", padding: "0.4rem", borderRadius: "6px", backgroundColor: "var(--bg-surface)", border: "1px solid var(--border-color)", fontSize: "0.85rem" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                <span>Length of Stay:</span>
                <span style={{ fontWeight: 600, color: "var(--text-primary)" }}>{nights} Nights</span>
              </div>
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              <input
                type="text"
                placeholder="Promo Code (ROYAL20)"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  flexGrow: 1,
                  padding: "0.6rem 0.9rem",
                  borderRadius: "10px",
                  backgroundColor: "var(--bg-base)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-primary)",
                  fontSize: "0.85rem",
                  textTransform: "uppercase"
                }}
              />
              <button
                type="submit"
                className="btn-palace-outline"
                style={{ padding: "0.6rem 1.1rem", fontSize: "0.8rem", whiteSpace: "nowrap" }}
              >
                Apply
              </button>
            </form>
            {couponFeedback && (
              <div
                style={{
                  fontSize: "0.78rem",
                  color: isCouponApplied ? "var(--accent-teal)" : "var(--accent-red)",
                  marginTop: "-1rem",
                  marginBottom: "1.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem"
                }}
              >
                {isCouponApplied ? <Check size={13} /> : <AlertCircle size={13} />}
                <span>{couponFeedback}</span>
              </div>
            )}

            {/* Price Line Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.88rem", marginBottom: "1.5rem", paddingBottom: "1.25rem", borderBottom: "1px solid var(--border-color)" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>${room.price} × {nights} Nights</span>
                <span>${roomBaseTotal}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Royal Resort Surcharge ($120/night)</span>
                <span>${resortFee}</span>
              </div>
              {includeLimousine && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-purple)" }}>
                  <span>Rolls-Royce Chauffeur Transfer</span>
                  <span>+$250</span>
                </div>
              )}
              {isCouponApplied && (
                <div style={{ display: "flex", justifyContent: "space-between", color: "var(--accent-teal)", fontWeight: 600 }}>
                  <span>VIP Privilege Discount (20%)</span>
                  <span>-${discountAmount}</span>
                </div>
              )}
            </div>

            {/* Grand Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "1.75rem" }}>
              <div>
                <div style={{ fontSize: "0.78rem", textTransform: "uppercase", color: "var(--text-tertiary)" }}>
                  Grand All-Inclusive Total
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--accent-teal)" }}>
                  All taxes &amp; tips included
                </div>
              </div>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.3rem", fontWeight: 700, color: "var(--accent-blue)" }}>
                ${grandTotal}
              </div>
            </div>

            {/* Confirm CTA */}
            <button
              onClick={handleConfirmReservation}
              disabled={isProcessing}
              className="btn-palace-primary"
              style={{
                width: "100%",
                padding: "1rem",
                opacity: isProcessing ? 0.7 : 1,
                cursor: isProcessing ? "wait" : "pointer"
              }}
            >
              {isProcessing ? (
                <span>Securing Imperial Chamber...</span>
              ) : (
                <>
                  <span>Confirm Sovereign Reservation</span>
                  <ArrowRight size={17} />
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          BOOKING CONFIRMATION MODAL & RECEIPT
          ========================================================================= */}
      {bookingConfirmed && (
        <div className="palace-modal-backdrop">
          <div
            className="palace-modal-box surface-card"
            style={{
              maxWidth: "680px",
              width: "100%",
              padding: "3rem",
              textAlign: "center",
              border: "2px solid var(--accent-blue)"
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "50%",
                backgroundColor: "rgba(37, 99, 235, 0.15)",
                color: "var(--accent-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem"
              }}
            >
              <Sparkles size={36} />
            </div>

            <span className="badge-pill badge-blue" style={{ marginBottom: "0.85rem" }}>
              Imperial Confirmation Guaranteed
            </span>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem", marginBottom: "0.75rem" }}>
              Welcome to Kingston Palace
            </h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
              Your sovereign reservation has been recorded in the palace archives. 
              Our Head Butler has been notified and is preparing your personal welcome folio.
            </p>

            {/* Receipt Box */}
            <div
              style={{
                padding: "1.75rem",
                borderRadius: "16px",
                backgroundColor: "var(--bg-base)",
                border: "1px solid var(--border-color)",
                textAlign: "left",
                marginBottom: "2rem"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.85rem", borderBottom: "1px solid var(--border-color)", marginBottom: "0.85rem" }}>
                <span style={{ color: "var(--text-tertiary)", fontSize: "0.85rem" }}>Booking Reference</span>
                <span style={{ fontWeight: 700, color: "var(--accent-blue)", letterSpacing: "0.08em" }}>{confirmationCode}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.85rem", borderBottom: "1px solid var(--border-color)", marginBottom: "0.85rem" }}>
                <span style={{ color: "var(--text-tertiary)", fontSize: "0.85rem" }}>Distinguished Guest</span>
                <span style={{ fontWeight: 600 }}>{guestForm.firstName} {guestForm.lastName}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.85rem", borderBottom: "1px solid var(--border-color)", marginBottom: "0.85rem" }}>
                <span style={{ color: "var(--text-tertiary)", fontSize: "0.85rem" }}>Reserved Residence</span>
                <span style={{ fontWeight: 600 }}>{room.name}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: "0.85rem", borderBottom: "1px solid var(--border-color)", marginBottom: "0.85rem" }}>
                <span style={{ color: "var(--text-tertiary)", fontSize: "0.85rem" }}>Dates of Stay</span>
                <span style={{ fontWeight: 600 }}>{checkInDate} to {checkOutDate} ({nights} Nights)</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", paddingTop: "0.4rem" }}>
                <span style={{ fontWeight: 700, fontSize: "1.05rem" }}>Total Paid via {paymentMethod.toUpperCase()}</span>
                <span style={{ fontWeight: 700, fontSize: "1.2rem", color: "var(--accent-teal)" }}>${grandTotal}</span>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <button
                onClick={() => window.print()}
                className="btn-palace-outline"
                style={{ padding: "0.85rem 1.6rem" }}
              >
                <Printer size={16} />
                <span>Print Official Folio</span>
              </button>
              <button
                onClick={() => {
                  setBookingConfirmed(false);
                  onNavigateHome();
                }}
                className="btn-palace-primary"
                style={{ padding: "0.85rem 1.8rem" }}
              >
                <span>Return to Estate Overview</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 992px) {
          .checkout-container {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
