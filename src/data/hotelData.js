// Kingston Palace Hotel - Curated Data & Content

export const ROOMS_COLLECTION = [
  {
    id: "royal-sovereign-suite",
    name: "The Royal Sovereign Suite",
    category: "Royal Suites",
    subtitle: "Imperial Opulence with Lakeside Panoramic Terrace",
    price: 1850,
    originalPrice: 2200,
    rating: 4.98,
    reviewsCount: 142,
    sqft: 2400,
    maxGuests: 3,
    bedType: "California King + Imperial Daybed",
    view: "Private Lake & Sunset Horizon",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["24/7 Dedicated Butler", "Carrara Marble Soaking Bath", "Private Helipad Transfer", "Chilled Dom Pérignon on Arrival", "Hermès Bath Amenities", "Private Wine Cellar"],
    accentColor: "blue",
    description: "Conceived for royalty and distinguished dignitaries, The Royal Sovereign Suite occupies the palace's historic eastern wing. Vaulted ceilings, hand-gilded moldings, and a sweeping private terrace overlooking the shimmering waters.",
    idealFor: ["Couples (1 Male, 1 Female)", "1-Week Stay"],
    badge: "Signature Collection",
    isMasonryLarge: true
  },
  {
    id: "celestial-penthouse",
    name: "The Celestial Penthouse",
    category: "Penthouse",
    subtitle: "Rooftop Sanctuary with Private Glass-Bottom Infinity Pool",
    price: 2400,
    originalPrice: 2850,
    rating: 5.0,
    reviewsCount: 98,
    sqft: 3100,
    maxGuests: 4,
    bedType: "2 Master California Kings",
    view: "360° Mountain & Starry Sky Panorama",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Private Infinity Edge Pool", "Astronomer's Brass Telescope", "In-Suite Private Dining Chef", "Bang & Olufsen Sound Stage", "Dual Fireplace Lounge", "Sauna & Steam Pavilion"],
    accentColor: "purple",
    description: "Suspended between the heavens and the palace gardens, The Celestial Penthouse represents the absolute pinnacle of contemporary architectural luxury. Unmatched privacy with an open-air starlight observatory.",
    idealFor: ["Couples (1 Male, 1 Female)", "One Night Stay", "1-Week Stay"],
    badge: "Ultra Luxury",
    isMasonryLarge: false
  },
  {
    id: "cozy-student-pod",
    name: "Cozy Scholar & Student Pod",
    category: "Modern Pods",
    subtitle: "Ergonomic Acoustic Sanctuary for Academic & Deep Work Focus",
    price: 380,
    originalPrice: 480,
    rating: 4.92,
    reviewsCount: 215,
    sqft: 550,
    maxGuests: 2,
    bedType: "Custom Queen Ottoman Bed",
    view: "Zen Courtyard & Fountain",
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Acoustic Soundproofing (Triple Glazed)", "Herman Miller Aeron Ergonomic Desk", "Gigabit Optical Fiber WiFi", "Specialty Espresso Bar", "Curated Library Access", "24/7 Study Lounge Entry"],
    accentColor: "teal",
    description: "Designed for discerning students, researchers, and digital nomads seeking a serene oasis. Blends minimalist Scandinavian warmth with palace hospitality, ultra-fast connectivity, and absolute silence.",
    idealFor: ["Students", "Group of Students", "One Night Stay"],
    badge: "High Value",
    isMasonryLarge: false
  },
  {
    id: "couples-retreat",
    name: "Couples Intimate Sanctuary",
    category: "Romantic Retreats",
    subtitle: "Secluded Hideaway with Outdoor Cedar Soaking Jacuzzi",
    price: 920,
    originalPrice: 1100,
    rating: 4.97,
    reviewsCount: 184,
    sqft: 1200,
    maxGuests: 2,
    bedType: "Plush Feathered King Bed",
    view: "Private Jasmine & Rose Garden",
    image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Heated Cedar Hot Tub", "Evening Turndown with Rose Petals", "Couples Aromatherapy Session", "Open Hearth Wood Fireplace", "Bespoke Cocktail Trolley", "Breakfast in Bed Guaranteed"],
    accentColor: "red",
    description: "An intoxicating romantic haven surrounded by blooming night jasmine. Features an intimate sheltered courtyard with a heated cedar soaking tub, artisan fireplace, and candlelight ambiance tailored for lovers.",
    idealFor: ["Couples (1 Male, 1 Female)", "One Night Stay"],
    badge: "Romance Favorite",
    isMasonryLarge: true
  },
  {
    id: "family-penthouse",
    name: "Grand Family Heritage Haven",
    category: "Family Villas",
    subtitle: "Three-Bedroom Estate with Playroom & Dedicated Nanny Quarters",
    price: 1650,
    originalPrice: 1950,
    rating: 4.95,
    reviewsCount: 167,
    sqft: 2800,
    maxGuests: 8,
    bedType: "1 Grand King + 2 Queen Suites + 2 Bunk Beds",
    view: "Estate Courtyard & Peacock Gardens",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Full Chef's Kitchen & Dining Room", "Children's Sensory Game Room", "Complimentary Family Concierge", "Private Garden Lawn for Barbecues", "Childproof Luxury Interiors", "Stroller & Crib Service"],
    accentColor: "yellow",
    description: "The ideal sanctuary for multi-generational families. Spanning an expansive 2,800 square feet with interconnected suites, expansive living lounges, and safety-certified child luxury amenities without compromising on adult refinement.",
    idealFor: ["Family (4-8 people)", "Group of Students", "1-Week Stay"],
    badge: "Family Preferred",
    isMasonryLarge: true
  },
  {
    id: "minimalist-loft",
    name: "The Minimalist Glass Loft",
    category: "Modern Pods",
    subtitle: "Floor-to-Ceiling Bauhaus Architecture with Sunset Vantage",
    price: 840,
    originalPrice: 990,
    rating: 4.91,
    reviewsCount: 112,
    sqft: 1100,
    maxGuests: 2,
    bedType: "Floating Low-Profile King",
    view: "West-Facing Sunset & Pine Valley",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Smart Glass Privacy Automation", "Brutalist Cast Concrete Tub", "Curated Vinyl Record Lounge", "Dyson Purifier & Supersonic Suite", "Artisan Pour-Over Station", "Private Balcony with Daybed"],
    accentColor: "teal",
    description: "A testament to clean lines, pure materials, and unfiltered natural light. Huge double-height glass walls frame dramatic sunset spectacles over the pine valley.",
    idealFor: ["One Night Stay", "Couples (1 Male, 1 Female)", "Students"],
    badge: "Design Award 2025",
    isMasonryLarge: false
  },
  {
    id: "emperors-duplex-pavilion",
    name: "The Emperor's Duplex Pavilion",
    category: "Royal Suites",
    subtitle: "Historic 2-Story Palatial Mansion with Private Moat & Dining Hall",
    price: 3200,
    originalPrice: 3800,
    rating: 5.0,
    reviewsCount: 64,
    sqft: 4200,
    maxGuests: 6,
    bedType: "3 Master Super-King Suites",
    view: "Royal Palace Grounds & Historic Waterways",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Private 8-Seat Screening Cinema", "Custom Sommelier Wine Vault", "Rolls-Royce Phantom Chauffeur", "Private Courtyard with Heated Pool", "Antique Art Collection", "Personal Security Suite"],
    accentColor: "purple",
    description: "The crown jewel of Kingston Palace. A standalone two-story architectural marvel that once hosted European sovereigns. Hand-carved marble columns, silk tapestries, and unrivaled palatial privacy.",
    idealFor: ["Family (4-8 people)", "Group of Students", "1-Week Stay"],
    badge: "Presidential",
    isMasonryLarge: true
  },
  {
    id: "lakeview-terrace-suite",
    name: "Lakeview Terrace Suite",
    category: "Romantic Retreats",
    subtitle: "Serene Water-Facing Solarium with Cast Bronze Soaking Tub",
    price: 1150,
    originalPrice: 1350,
    rating: 4.96,
    reviewsCount: 153,
    sqft: 1450,
    maxGuests: 3,
    bedType: "Royal King Bed + Chaise Lounge",
    view: "Tranquil Waterway & Sunset Islands",
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1600&q=85",
    gallery: [
      "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&w=1200&q=80"
    ],
    features: ["Wraparound Stone Balcony", "Cast Bronze Soaking Tub", "Complimentary High Tea Service", "Molton Brown Bath Delights", "Telescope for Stargazing", "Silk Bathrobes & Slippers"],
    accentColor: "blue",
    description: "Suspended right along the water's edge, this suite catches the soft morning mist and radiant orange sunsets. Featuring an open-plan living solarium and bronze clawfoot tub overlooking the lake.",
    idealFor: ["Couples (1 Male, 1 Female)", "One Night Stay", "1-Week Stay"],
    badge: "Guest Choice",
    isMasonryLarge: false
  }
];

export const TESTIMONIALS_DATA = [
  {
    id: 1,
    quote: "The perfect weekend getaway. We spent hours watching the sun sink behind the palace lake from the sovereign terrace. Service that anticipates your thoughts before you speak them.",
    author: "Lady Eleanor Vance-Croft",
    title: "Contributing Editor, Architectural Digest",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Romantic Anniversary Stay",
    date: "October 2026"
  },
  {
    id: 2,
    quote: "Exceptional service for our family vacation. Traveling with four young children is usually daunting, but the family penthouse team prepared customized bedtime stories, child robes, and warm cookies every evening.",
    author: "Dr. Alistair & Meera Thorne",
    title: "Geneva & Singapore",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Family Heritage Stay (6 Guests)",
    date: "September 2026"
  },
  {
    id: 3,
    quote: "As an Oxford fellow finishing my dissertation, the Scholar Pod was sheer bliss. Triple-glazed silence, lightning-fast fiber, and the scent of antique cedar in the corridors.",
    author: "Julian K. Montgomery",
    title: "Postdoctoral Researcher, Cambridge",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Scholar & Academic Focus",
    date: "August 2026"
  },
  {
    id: 4,
    quote: "The Celestial Penthouse's glass-bottom pool feels like floating on liquid diamonds suspended in the clouds. I’ve visited Aman and Rosewood properties worldwide, but Kingston Palace touches another realm.",
    author: "Sofia Rostova",
    title: "Luxury Travel Connoisseur",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Celebrity Hideaway",
    date: "October 2026"
  },
  {
    id: 5,
    quote: "Our student design cohort booked the Duplex Pavilion for our graduation project sprint. The space inspired revolutionary ideas. Unmatched hospitality and unforgettable memories.",
    author: "David Zhao & Group",
    title: "Royal College of Art Alumni",
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80",
    rating: 5,
    tag: "Group Creative Retreat",
    date: "July 2026"
  }
];

export const GALLERY_DATA = [
  {
    id: "g1",
    title: "The Grand Atrium & Marble Arcade",
    category: "Architecture",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=85",
    depth: 45,
    location: "Eastern Palace Wing",
    caption: "Hand-carved Italian marble columns illuminated by evening lantern glow."
  },
  {
    id: "g2",
    title: "Floating Twilight Infinity Pool",
    category: "Spa & Wellness",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1200&q=85",
    depth: 60,
    location: "Rooftop Sanctuary",
    caption: "38°C geothermal mineral water with panoramic sunset vantage."
  },
  {
    id: "g3",
    title: "The Royal Sovereign Master Bed",
    category: "Suites & Penthouses",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=85",
    depth: 30,
    location: "Royal Suite 301",
    caption: "Handcrafted 1200-thread Egyptian cotton with bespoke canopy."
  },
  {
    id: "g4",
    title: "L'Orangerie 3-Star Michelin Hall",
    category: "Fine Dining",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85",
    depth: 55,
    location: "Glasshouse Conservatory",
    caption: "Headed by Chef Laurent Vane, celebrating heirloom seasonal harvests."
  },
  {
    id: "g5",
    title: "Thermal Mineral Bath & Salt Sanctuary",
    category: "Spa & Wellness",
    aspect: "tall",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=85",
    depth: 40,
    location: "Subterranean Spa",
    caption: "Himalayan crystal salt walls infused with eucalyptus steam."
  },
  {
    id: "g6",
    title: "The King's Library & Cognac Salon",
    category: "Architecture",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=85",
    depth: 35,
    location: "Palace Library",
    caption: "Housing over 8,000 first-edition volumes and rare single malts."
  },
  {
    id: "g7",
    title: "Celestial Penthouse Private Sundeck",
    category: "Suites & Penthouses",
    aspect: "wide",
    image: "https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=1200&q=85",
    depth: 70,
    location: "Penthouse Level 7",
    caption: "Open-air starlight fireplace and private astronomer observatory."
  },
  {
    id: "g8",
    title: "Heirloom Tasting & Sommelier Vault",
    category: "Fine Dining",
    aspect: "square",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85",
    depth: 25,
    location: "Historical Wine Cellar",
    caption: "Vintages dating back to 1892 curated by Master Sommelier."
  }
];

export const CONCIERGE_PERSONAS = [
  { id: "Students", label: "Students (Solo / Duo)", icon: "🎓", desc: "Acoustic focus, fast WiFi, value & peace" },
  { id: "Group of Students", label: "Group of Students", icon: "👥", desc: "Shared spacious villas, bonding & split costs" },
  { id: "One Night Stay", label: "One Night Stay", icon: "🌙", desc: "Instant grandeur, swift check-in, decadent dinner" },
  { id: "1-Week Stay", label: "1-Week Stay", icon: "🗓️", desc: "Deep relaxation, wellness spa, extended laundry & butler" },
  { id: "Couples (1 Male, 1 Female)", label: "Couples (1 Male, 1 Female)", icon: "🌹", desc: "Intimate romance, outdoor jacuzzi, candlelit dinners" },
  { id: "Family (4-8 people)", label: "Family (4-8 people)", icon: "🏰", desc: "Multiple bedrooms, child-safe spaces, chef kitchen" }
];

export const AMENITIES_HIGHLIGHTS = [
  { title: "24/7 Royal Butler Service", desc: "White-glove concierges trained at British Royal Guilds to fulfill every whim.", icon: "Bell" },
  { title: "Helipad & Yacht Transfer", desc: "Direct aerial arrival or serene private electric gondola cruise across the lake.", icon: "Navigation" },
  { title: "Michelin 3-Star Gastronomy", desc: "Four private dining pavilions driven by farm-to-table culinary masters.", icon: "Utensils" },
  { title: "Subterranean Geothermal Spa", desc: "Natural hot springs, volcanic stone therapies, and crystal sound meditation.", icon: "Sparkles" }
];
