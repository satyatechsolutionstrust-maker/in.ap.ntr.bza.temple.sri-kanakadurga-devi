var SHOP_ITEMS = [
  { name: "Brass Pooja Thali Set", img: "https://m.media-amazon.com/images/I/71gXnLqFfIL._SL1500_.jpg", url: "https://www.amazon.in/s?k=brass+pooja+thali+set", cat: "pooja-essentials" },
  { name: "Pure Camphor for Pooja", img: "https://m.media-amazon.com/images/I/61mIq0jMxvL._SL1000_.jpg", url: "https://www.amazon.in/s?k=pure+camphor+pooja", cat: "pooja-essentials" },
  { name: "Agarbatti Combo Pack", img: "https://m.media-amazon.com/images/I/71Yz3GNaURL._SL1500_.jpg", url: "https://www.flipkart.com/search?q=agarbatti+combo", cat: "pooja-essentials" },
  { name: "Goddess Durga Brass Idol", img: "https://m.media-amazon.com/images/I/71Yz3GNaURL._SL1500_.jpg", url: "https://www.amazon.in/s?k=durga+brass+idol", cat: "idols" },
  { name: "Bhagavad Gita Hindi Sanskrit", img: "https://m.media-amazon.com/images/I/71Yz3GNaURL._SL1500_.jpg", url: "https://www.amazon.in/s?k=bhagavad+gita", cat: "books" },
  { name: "LED Diya String Lights", img: "https://m.media-amazon.com/images/I/71Yz3GNaURL._SL1500_.jpg", url: "https://www.amazon.in/s?k=led+diya+lights", cat: "decor" }
];
var SHOP_CATEGORIES = [
  { name: "Pooja Thali Sets", icon: "🏵️", description: "Complete brass and silver pooja thali sets with all accessories", links: [
    { store: "amazon", url: "https://amzn.to/4ckbqdb" }
  ]},
  { name: "Brass Diyas & Lamps", icon: "🪔", description: "Traditional brass oil lamps, diyas, and deepam stands", links: [
    { store: "amazon", url: "https://amzn.to/4c0F8mp" }
  ]},
  { name: "Durga Devi Idols", icon: "🙏", description: "Beautiful Durga Devi murtis in brass, marble, and gold plated", links: [
    { store: "amazon", url: "https://amzn.to/4v2ww7v" }
  ]},
  { name: "Agarbatti & Dhoop", icon: "🌸", description: "Premium incense sticks, dhoop cones, and sambrani cups", links: [
    { store: "amazon", url: "https://amzn.to/4bMePBv" }
  ]},
  { name: "Pooja Books & Scriptures", icon: "📚", description: "Bhagavad Gita, Durga Saptashati, Sahasranama and more", links: [
    { store: "amazon", url: "https://amzn.to/4sPQvVr" }
  ]},
  { name: "Kumkum & Turmeric Sets", icon: "🔴", description: "Pure kumkum, turmeric, chandan, and sindoor for daily pooja", links: [
    { store: "amazon", url: "https://amzn.to/47FfVfX" }
  ]},
  { name: "Pooja Dress & Sarees", icon: "👗", description: "Traditional silk sarees and dress for temple visits and festivals", links: [
    { store: "amazon", url: "https://amzn.to/4v6Dmsp" }
  ]},
  { name: "Temple Decoration", icon: "🎊", description: "Torans, flower garlands, LED lights, and festive decorations", links: [
    { store: "amazon", url: "https://amzn.to/4sIaSDO" }
  ]}
];
var SHOP_COLLECTIONS = [
  { name: "🪔 Daily Pooja Essentials Kit", description: "Everything you need for daily morning and evening pooja", image: "https://m.media-amazon.com/images/I/71gXnLqFfIL._SL1500_.jpg", items: ["Brass Thali", "Diya", "Agarbatti", "Camphor", "Kumkum", "Cotton Wicks"], link: "https://www.amazon.in/s?k=daily+pooja+kit" },
  { name: "🎆 Navaratri Special Kit", description: "Complete Navaratri pooja items for 9 days of celebration", image: "https://m.media-amazon.com/images/I/61mIq0jMxvL._SL1000_.jpg", items: ["Durga Idol", "Kalash", "Coconut", "Red Cloth", "Flowers", "Kumkum"], link: "https://www.amazon.in/s?k=navaratri+pooja+kit" },
  { name: "🏠 New Home Pooja Kit", description: "Griha Pravesh and house warming pooja essentials", image: "https://m.media-amazon.com/images/I/71Yz3GNaURL._SL1500_.jpg", items: ["Kalash", "Mango Leaves", "Coconut", "Turmeric", "Rice", "Ghee Lamp"], link: "https://www.amazon.in/s?k=griha+pravesh+pooja+kit" },
  { name: "📿 Meditation & Chanting Kit", description: "For daily japa, meditation, and mantra chanting", image: "https://m.media-amazon.com/images/I/71gXnLqFfIL._SL1500_.jpg", items: ["Rudraksha Mala", "Meditation Mat", "Incense", "Singing Bowl", "Books"], link: "https://www.amazon.in/s?k=meditation+pooja+kit" }
];
var SHOP_COMPARE = [
  { name: "Brass Pooja Thali Set (7 Piece)", image: "https://m.media-amazon.com/images/I/71gXnLqFfIL._SL1500_.jpg", stores: [
    { store: "amazon", url: "https://www.amazon.in/s?k=brass+pooja+thali+7+piece" },
    { store: "flipkart", url: "https://www.flipkart.com/search?q=brass+pooja+thali" },
    { store: "meesho", url: "https://www.meesho.com/search?q=brass+pooja+thali" }
  ]},
  { name: "Goddess Durga Brass Idol 8 inch", image: "https://m.media-amazon.com/images/I/71Yz3GNaURL._SL1500_.jpg", stores: [
    { store: "amazon", url: "https://www.amazon.in/s?k=durga+brass+idol+8+inch" },
    { store: "flipkart", url: "https://www.flipkart.com/search?q=durga+brass+idol" }
  ]},
  { name: "Bhagavad Gita Hardcover Hindi", image: "https://m.media-amazon.com/images/I/61mIq0jMxvL._SL1000_.jpg", stores: [
    { store: "amazon", url: "https://www.amazon.in/s?k=bhagavad+gita+hardcover+hindi" },
    { store: "flipkart", url: "https://www.flipkart.com/search?q=bhagavad+gita+hindi" }
  ]}
];