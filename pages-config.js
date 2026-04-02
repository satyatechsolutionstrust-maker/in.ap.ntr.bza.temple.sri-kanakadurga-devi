var BLOG_POSTS = [
  { title: "Navaratri 2025 Celebrations Announced", date: "2025-09-15", author: "VRDS Prasad", category: "festival", image: "", excerpt: "Grand 9-day Navaratri celebrations will begin from October 2nd. Special poojas, cultural programs, and Annadanam planned for all 9 days.", content: "" },
  { title: "Free Vedic Classes for Children Starting June", date: "2025-05-20", author: "VRDS Prasad", category: "education", image: "", excerpt: "New batch of free Vedic education classes for children aged 5-15. Learn Vedas, Shlokas, Sanskrit, and Bhagavad Gita every weekend.", content: "" },
  { title: "Temple Renovation Phase 2 Completed", date: "2025-04-10", author: "VRDS Prasad", category: "news", image: "", excerpt: "The second phase of temple renovation is now complete. New gopuram, expanded prayer hall, and improved facilities for devotees.", content: "" },
  { title: "Daily Annadanam Serving 500+ Devotees", date: "2025-03-01", author: "VRDS Prasad", category: "seva", image: "", excerpt: "Our daily Annadanam program now serves over 500 devotees and needy people every day. Your donations make this possible.", content: "" },
  { title: "Ugadi Special Panchanga Sravanam", date: "2025-03-28", author: "VRDS Prasad", category: "festival", image: "", excerpt: "Join us for Ugadi celebrations with traditional Panchanga Sravanam, special poojas, and festive Annadanam.", content: "" }
];
var TEAM_MEMBERS = [
  { name: "VRDS Prasad", role: "Founder & Chairman", photo: "assets/images/owner/owner.jpg", bio: "Visionary founder dedicated to preserving Hindu Dharma and serving the community for over 25 years." },
  { name: "Pandit Ramakrishna", role: "Head Priest", photo: "", bio: "Experienced Vedic scholar performing daily poojas, abhishekam, and special ceremonies with devotion." },
  { name: "Smt. Lakshmi Devi", role: "Annadanam Coordinator", photo: "", bio: "Managing daily free food distribution serving 500+ devotees and needy people." },
  { name: "Sri Venkat Rao", role: "Temple Manager", photo: "", bio: "Overseeing temple operations, maintenance, and festival arrangements." }
];
var PRICING_PLANS = [
  { name: "Basic Archana", price: "₹101", period: "per pooja", features: ["Archana with devotee name", "Prasadam distribution", "Temple entry"], cta: "Book Now", link: "https://wa.me/918247787529?text=I want to book Basic Archana", highlighted: false },
  { name: "Special Abhishekam", price: "₹501", period: "per pooja", features: ["Full Abhishekam", "Sahasranama chanting", "Special Prasadam", "Priority darshan", "Photo with deity"], cta: "Book Now", link: "https://wa.me/918247787529?text=I want to book Special Abhishekam", highlighted: true },
  { name: "Annual Membership", price: "₹5,001", period: "per year", features: ["All festival poojas included", "Priority seating", "Monthly special archana", "Vedic classes access", "Temple newsletter", "Name on donor wall"], cta: "Join Now", link: "https://wa.me/918247787529?text=I want Annual Membership", highlighted: false }
];
var BOOKING_CONFIG = {
  enabled: true,
  whatsappNumber: "918247787529",
  services: [
    { name: "Archana", price: "₹101" },
    { name: "Abhishekam", price: "₹501" },
    { name: "Sahasranama", price: "₹251" },
    { name: "Homa/Homam", price: "₹1,001" },
    { name: "Wedding Ceremony", price: "Contact for pricing" },
    { name: "Griha Pravesh Pooja", price: "₹2,001" },
    { name: "Satyanarayan Pooja", price: "₹1,501" }
  ]
};