var TRANSLATIONS = {
  languages: [
    { code: "en", name: "English", nativeName: "English", dir: "" },
    { code: "te", name: "Telugu", nativeName: "తెలుగు", dir: "te/" },
    { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "hi/" },
    { code: "sa", name: "Sanskrit", nativeName: "संस्कृतम्", dir: "sa/" }
  ],
  nav: {
    en: { home: "Home", about: "About", services: "Services", grandhas: "Grandhas", shop: "Shop", gallery: "Gallery", puranam: "Temple Legends", events: "Events", panchangam: "Panchangam", donate: "Donate", contact: "Contact" },
    te: { home: "హోమ్", about: "మా గురించి", services: "సేవలు", grandhas: "గ్రంథాలు", shop: "షాప్", gallery: "గ్యాలరీ", puranam: "స్థల పురాణం", events: "కార్యక్రమాలు", panchangam: "పంచాంగం", donate: "విరాళం", contact: "సంప్రదించండి" },
    hi: { home: "होम", about: "हमारे बारे में", services: "सेवाएं", grandhas: "ग्रंथ", shop: "दुकान", gallery: "गैलरी", puranam: "स्थल पुराण", events: "कार्यक्रम", panchangam: "पंचांग", donate: "दान", contact: "संपर्क" },
    sa: { home: "गृहम्", about: "विषये", services: "सेवाः", grandhas: "ग्रन्थाः", shop: "विपणिः", gallery: "चित्रशाला", puranam: "स्थलपुराणम्", events: "कार्यक्रमाः", panchangam: "पञ्चाङ्गम्", donate: "दानम्", contact: "सम्पर्कः" }
  },
  topBar: {
    en: "🙏 Ya Devi Sarva Bhuteshu Shakti Rupena Sansthita | Namastasyai Namastasyai Namastasyai Namo Namah 🙏",
    te: "🙏 యా దేవీ సర్వభూతేషు శక్తిరూపేణ సంస్థితా | నమస్తస్యై నమస్తస్యై నమస్తస్యై నమో నమః 🙏",
    hi: "🙏 या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता | नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः 🙏",
    sa: "🙏 या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता | नमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः 🙏"
  },
  pageText: {
    ".highlights-section .highlight-card:nth-child(1) h3": { en: "Daily Pooja", te: "నిత్య పూజ", hi: "दैनिक पूजा", sa: "नित्यपूजा" },
    ".highlights-section .highlight-card:nth-child(1) p": { en: "Morning & evening aarti with special abhishekam", te: "ఉదయం & సాయంత్రం ఆరతి, ప్రత్యేక అభిషేకం", hi: "सुबह और शाम आरती, विशेष अभिषेकम", sa: "प्रातः सायं च आरतिः विशेषाभिषेकं च" },
    ".highlights-section .highlight-card:nth-child(1) a": { en: "View Services →", te: "సేవలు చూడండి →", hi: "सेवाएं देखें →", sa: "सेवाः पश्यन्तु →" },
    ".highlights-section .highlight-card:nth-child(2) h3": { en: "Sacred Grandhas", te: "పవిత్ర గ్రంథాలు", hi: "पवित्र ग्रंथ", sa: "पवित्रग्रन्थाः" },
    ".highlights-section .highlight-card:nth-child(2) p": { en: "Free Vedic scriptures to read & download", te: "ఉచిత వేద గ్రంథాలు చదవండి & డౌన్లోడ్ చేయండి", hi: "मुफ्त वैदिक ग्रंथ पढ़ें और डाउनलोड करें", sa: "निःशुल्कं वैदिकग्रन्थान् पठन्तु" },
    ".highlights-section .highlight-card:nth-child(2) a": { en: "Browse Grandhas →", te: "గ్రంథాలు చూడండి →", hi: "ग्रंथ देखें →", sa: "ग्रन्थान् पश्यन्तु →" },
    ".highlights-section .highlight-card:nth-child(3) h3": { en: "Gallery", te: "గ్యాలరీ", hi: "गैलरी", sa: "चित्रशाला" },
    ".highlights-section .highlight-card:nth-child(3) p": { en: "View photos from our festivals & celebrations", te: "పండుగలు & వేడుకల ఫోటోలు చూడండి", hi: "त्योहारों और उत्सवों की तस्वीरें देखें", sa: "उत्सवानां चित्राणि पश्यन्तु" },
    ".highlights-section .highlight-card:nth-child(3) a": { en: "View Gallery →", te: "గ్యాలరీ చూడండి →", hi: "गैलरी देखें →", sa: "चित्रशालां पश्यन्तु →" },
    ".highlights-section .highlight-card:nth-child(4) h3": { en: "Get in Touch", te: "సంప్రదించండి", hi: "संपर्क करें", sa: "सम्पर्कः" },
    ".highlights-section .highlight-card:nth-child(4) p": { en: "Reach out for pooja bookings & inquiries", te: "పూజ బుకింగ్ & విచారణల కోసం", hi: "पूजा बुकिंग और पूछताछ के लिए", sa: "पूजाबुकिंग् पृच्छा च" },
    ".highlights-section .highlight-card:nth-child(4) a": { en: "Contact Us →", te: "సంప్రదించండి →", hi: "संपर्क करें →", sa: "सम्पर्कं कुर्वन्तु →" },
    ".page-banner-overlay h2": {
      en: { about: "🕉️ About the Temple", services: "🪔 Our Services", gallery: "📸 Photo Gallery", donate: "🙏 Donate to the Temple", contact: "📞 Contact Us", books: "📚 గ్రంథాలు | Sacred Grandhas", shop: "🛕 Recommended Pooja Items" },
      te: { about: "🕉️ ఆలయం గురించి", services: "🪔 మా సేవలు", gallery: "📸 ఫోటో గ్యాలరీ", donate: "🙏 ఆలయానికి విరాళం", contact: "📞 సంప్రదించండి", books: "📚 పవిత్ర గ్రంథాలు", shop: "🛕 పూజ సామాగ్రి" },
      hi: { about: "🕉️ मंदिर के बारे में", services: "🪔 हमारी सेवाएं", gallery: "📸 फोटो गैलरी", donate: "🙏 मंदिर को दान", contact: "📞 संपर्क करें", books: "📚 पवित्र ग्रंथ", shop: "🛕 पूजा सामग्री" },
      sa: { about: "🕉️ मन्दिरविषये", services: "🪔 अस्माकं सेवाः", gallery: "📸 चित्रशाला", donate: "🙏 मन्दिराय दानम्", contact: "📞 सम्पर्कः", books: "📚 पवित्रग्रन्थाः", shop: "🛕 पूजासामग्री" }
    },
    ".section-title-left": { en: "Our History", te: "మా చరిత్ర", hi: "हमारा इतिहास", sa: "अस्माकं इतिहासः" },
    ".owner-details .section-title-left": { en: "About the Founder", te: "వ్యవస్థాపకుడి గురించి", hi: "संस्थापक के बारे में", sa: "संस्थापकविषये" }
  },
  sectionTitles: {
    "Temple Services & Poojas": { te: "ఆలయ సేవలు & పూజలు", hi: "मंदिर सेवाएं और पूजा", sa: "मन्दिरसेवाः पूजाश्च" },
    "Pooja Timings": { te: "పూజ సమయాలు", hi: "पूजा समय", sa: "पूजासमयाः" },
    "Our Mission & Values": { te: "మా లక్ష్యం & విలువలు", hi: "हमारा मिशन और मूल्य", sa: "अस्माकं ध्येयं मूल्यानि च" },
    "Temple at a Glance": { te: "ఆలయం ఒక చూపులో", hi: "मंदिर एक नज़र में", sa: "मन्दिरम् एकदृष्ट्या" },
    "Temple & Festival Photos": { te: "ఆలయం & పండుగ ఫోటోలు", hi: "मंदिर और त्योहार तस्वीरें", sa: "मन्दिरोत्सवचित्राणि" },
    "🙏 Free Sacred Texts by the Temple": { te: "🙏 ఆలయం ద్వారా ఉచిత పవిత్ర గ్రంథాలు", hi: "🙏 मंदिर द्वारा मुफ्त पवित्र ग्रंथ", sa: "🙏 मन्दिरेण निःशुल्कपवित्रग्रन्थाः" },
    "🪔 Pooja Essentials & Sacred Items": { te: "🪔 పూజ సామాగ్రి & పవిత్ర వస్తువులు", hi: "🪔 पूजा सामग्री और पवित्र वस्तुएं", sa: "🪔 पूजासामग्री पवित्रवस्तूनि च" },
    "🙏 Your Donation Supports Dharma": { te: "🙏 మీ విరాళం ధర్మానికి మద్దతు", hi: "🙏 आपका दान धर्म का समर्थन करता है", sa: "🙏 भवतः दानं धर्मं पोषयति" },
    "🪔 Your Donation Supports": { te: "🪔 మీ విరాళం మద్దతు ఇస్తుంది", hi: "🪔 आपका दान सहायता करता है", sa: "🪔 भवतः दानं साहाय्यं करोति" },
    "🙏 Temple Founder & Chairman": { te: "🙏 ఆలయ వ్యవస్థాపకుడు & అధ్యక్షుడు", hi: "🙏 मंदिर संस्थापक और अध्यक्ष", sa: "🙏 मन्दिरसंस्थापकः अध्यक्षश्च" },
    "📍 Visit the Temple": { te: "📍 ఆలయాన్ని సందర్శించండి", hi: "📍 मंदिर दर्शन करें", sa: "📍 मन्दिरं दर्शयन्तु" },
    "🗺️ Find Us on Map": { te: "🗺️ మ్యాప్లో మమ్మల్ని కనుగొనండి", hi: "🗺️ मानचित्र पर हमें खोजें", sa: "🗺️ मानचित्रे अस्मान् अन्विषन्तु" },
    "Want to Book a Special Pooja?": { te: "ప్రత్యేక పూజ బుక్ చేయాలనుకుంటున్నారా?", hi: "विशेष पूजा बुक करना चाहते हैं?", sa: "विशेषपूजां बुक् कर्तुम् इच्छति?" },
    "📖 Want More Sacred Texts?": { te: "📖 మరిన్ని పవిత్ర గ్రంథాలు కావాలా?", hi: "📖 और पवित्र ग्रंथ चाहिए?", sa: "📖 अधिकपवित्रग्रन्थान् इच्छति?" },
    "🙏 Need Help Selecting Pooja Items?": { te: "🙏 పూజ సామాగ్రి ఎంచుకోవడంలో సహాయం కావాలా?", hi: "🙏 पूजा सामग्री चुनने में मदद चाहिए?", sa: "🙏 पूजासामग्रीचयने साहाय्यम् इच्छति?" },
    "🙏 Every Rupee Counts": { te: "🙏 ప్రతి రూపాయి విలువైనది", hi: "🙏 हर रुपया मायने रखता है", sa: "🙏 प्रतिरूप्यकं महत्त्वपूर्णम्" }
  },
  subtitles: {
    "Every contribution helps us maintain daily poojas, Annadanam, festivals, and community service.": { te: "ప్రతి విరాళం నిత్య పూజలు, అన్నదానం, పండుగలు మరియు సమాజ సేవను నిర్వహించడంలో సహాయపడుతుంది.", hi: "हर योगदान दैनिक पूजा, अन्नदानम, त्योहार और सामुदायिक सेवा को बनाए रखने में मदद करता है।", sa: "प्रत्येकं दानं नित्यपूजाम् अन्नदानम् उत्सवान् समाजसेवां च पोषयति।" },
    "Read online or download for free. A divine offering from Sri Kanaka Durga Devi Temple to all devotees.": { te: "ఆన్లైన్లో చదవండి లేదా ఉచితంగా డౌన్లోడ్ చేయండి. శ్రీ కనక దుర్గా దేవి ఆలయం నుండి భక్తులందరికీ దివ్య సమర్పణ.", hi: "ऑनलाइन पढ़ें या मुफ्त डाउनलोड करें। श्री कनक दुर्गा देवी मंदिर से सभी भक्तों को दिव्य भेंट।", sa: "अन्तर्जाले पठन्तु निःशुल्कं अवतारयन्तु वा। श्रीकनकदुर्गादेवीमन्दिरात् सर्वभक्तेभ्यः दिव्यसमर्पणम्।" },
    "Browse and purchase authentic pooja items from trusted online stores.": { te: "నమ్మకమైన ఆన్లైన్ స్టోర్ల నుండి నిజమైన పూజ సామాగ్రిని కొనుగోలు చేయండి.", hi: "विश्वसनीय ऑनलाइन स्टोर से प्रामाणिक पूजा सामग्री खरीदें।", sa: "विश्वसनीयेभ्यः अन्तर्जालविपणिभ्यः प्रामाणिकपूजासामग्रीं क्रीणन्तु।" },
    "Contact us on WhatsApp for guidance on selecting the right items for your pooja or ceremony.": { te: "మీ పూజ లేదా వేడుకకు సరిఅయిన వస్తువులను ఎంచుకోవడంలో సహాయం కోసం WhatsApp లో సంప్రదించండి.", hi: "आपकी पूजा या अनुष्ठान के लिए सही सामग्री चुनने में मार्गदर्शन के लिए WhatsApp पर संपर्क करें।", sa: "भवतः पूजायै समारोहाय वा उचितवस्तूनि चयनार्थं मार्गदर्शनाय WhatsApp द्वारा सम्पर्कयन्तु।" }
  },
  buttons: {
    "📱 WhatsApp Us 🙏": { te: "📱 WhatsApp చేయండి 🙏", hi: "📱 WhatsApp करें 🙏", sa: "📱 WhatsApp कुर्वन्तु 🙏" },
    "📱 Request on WhatsApp 🙏": { te: "📱 WhatsApp లో అభ్యర్థించండి 🙏", hi: "📱 WhatsApp पर अनुरोध करें 🙏", sa: "📱 WhatsApp द्वारा अनुरोधं कुर्वन्तु 🙏" },
    "📱 Contact for Donation 🙏": { te: "📱 విరాళం కోసం సంప్రదించండి 🙏", hi: "📱 दान के लिए संपर्क करें 🙏", sa: "📱 दानार्थं सम्पर्कं कुर्वन्तु 🙏" },
    "🔊 Enable Mantra": { te: "🔊 మంత్రం ప్రారంభించండి", hi: "🔊 मंत्र सक्षम करें", sa: "🔊 मन्त्रं प्रारभन्तु" },
    "Continue without audio": { te: "ఆడియో లేకుండా కొనసాగించండి", hi: "ऑडियो के बिना जारी रखें", sa: "श्रव्यं विना अग्रे गच्छन्तु" },
    "Enable sacred Durga Mantras?": { te: "పవిత్ర దుర్గా మంత్రాలను ప్రారంభించాలా?", hi: "पवित्र दुर्गा मंत्र सक्षम करें?", sa: "पवित्रदुर्गामन्त्रान् प्रारभन्तु?" }
  },
  footer: {
    en: { quickLinks: "Quick Links", followUs: "Follow Us", copyright: "© 2024 Sri Kanaka Durga Devi Temple, Vijayawada. All Rights Reserved." },
    te: { quickLinks: "త్వరిత లింకులు", followUs: "మమ్మల్ని అనుసరించండి", copyright: "© 2024 శ్రీ కనక దుర్గా దేవి ఆలయం, విజయవాడ. సర్వ హక్కులు రిజర్వ్ చేయబడ్డాయి." },
    hi: { quickLinks: "त्वरित लिंक", followUs: "हमें फॉलो करें", copyright: "© 2024 श्री कनक दुर्गा देवी मंदिर, विजयवाड़ा। सर्वाधिकार सुरक्षित।" },
    sa: { quickLinks: "शीघ्रसम्पर्काः", followUs: "अस्मान् अनुसरन्तु", copyright: "© 2024 श्रीकनकदुर्गादेवीमन्दिरम्, विजयवाडा। सर्वाधिकाराः सुरक्षिताः।" }
  }
};