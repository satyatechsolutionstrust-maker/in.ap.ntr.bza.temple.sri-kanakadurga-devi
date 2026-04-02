// ============================================
// DONATION CONFIG - Separate QR Codes & Bank Accounts
// ============================================
// title: { en, te, hi, sa } - language-specific titles
// Everything else stays same across languages

var DONATE_QR = [
  { title: { en: "Temple Trust UPI", te: "ఆలయ ట్రస్ట్ UPI", hi: "मंदिर ट्रस्ट UPI", sa: "मन्दिरन्यासः UPI" }, qrImage: "assets/images/qr-code-1.png", upiId: "example1@upi", accountName: "Sri Kanaka Durga Devi Temple Trust" },
  { title: { en: "Annadanam Fund UPI", te: "అన్నదాన నిధి UPI", hi: "अन्नदानम कोष UPI", sa: "अन्नदानकोषः UPI" }, qrImage: "assets/images/qr-code-2.png", upiId: "example2@upi", accountName: "Sri Kanaka Durga Devi Annadanam" },
  { title: { en: "Renovation Fund UPI", te: "పునరుద్ధరణ నిధి UPI", hi: "जीर्णोद्धार कोष UPI", sa: "जीर्णोद्धारकोषः UPI" }, qrImage: "assets/images/qr-code-3.png", upiId: "example3@upi", accountName: "Sri Kanaka Durga Devi Renovation Fund" }
];

var DONATE_BANKS = [
  { title: { en: "Temple Trust Account", te: "ఆలయ ట్రస్ట్ ఖాతా", hi: "मंदिर ट्रस्ट खाता", sa: "मन्दिरन्यासखातम्" }, bankName: "State Bank of India", accountName: "Sri Kanaka Durga Devi Temple", accountNumber: "XXXXXXXXXXXX", branch: "Vijayawada Main Branch", ifsc: "SBIN0XXXXXX", accountType: "Current Account" },
  { title: { en: "Annadanam Fund", te: "అన్నదాన నిధి", hi: "अन्नदानम कोष", sa: "अन्नदानकोषः" }, bankName: "Indian Bank", accountName: "Sri Kanaka Durga Devi Annadanam", accountNumber: "XXXXXXXXXXXX", branch: "Vijayawada Branch", ifsc: "IDIB0XXXXXX", accountType: "Savings Account" },
  { title: { en: "Temple Renovation Fund", te: "ఆలయ పునరుద్ధరణ నిధి", hi: "मंदिर जीर्णोद्धार कोष", sa: "मन्दिरजीर्णोद्धारकोषः" }, bankName: "Union Bank of India", accountName: "Sri Kanaka Durga Devi Renovation", accountNumber: "XXXXXXXXXXXX", branch: "Vijayawada Branch", ifsc: "UBIN0XXXXXX", accountType: "Current Account" }
];
