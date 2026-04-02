var TESTIMONIALS = [
  { name: "Ramesh Kumar", location: "Vijayawada", text: "The temple is a divine place. The daily poojas and Annadanam service is truly blessed.", stars: 5 },
  { name: "Lakshmi Devi", location: "Guntur", text: "Navaratri celebrations here are the grandest I have ever seen.", stars: 5 },
  { name: "Suresh Babu", location: "Hyderabad", text: "We traveled from Hyderabad specifically for the Durga Saptashati parayanam.", stars: 5 },
  { name: "Padma Rao", location: "Vijayawada", text: "The Vedic classes for children are excellent. My son has learned so many shlokas.", stars: 5 }
];

var FAQ_ITEMS = [
  {
    question: { en: "What are the temple timings?", te: "ఆలయ సమయాలు ఏమిటి?", hi: "मंदिर का समय क्या है?", sa: "मन्दिरसमयाः के?" },
    answer: { en: "The temple is open from 6:00 AM to 12:00 PM and 4:00 PM to 9:00 PM, all days.", te: "ఆలయం ఉదయం 6:00 నుండి 12:00 వరకు మరియు సాయంత్రం 4:00 నుండి 9:00 వరకు, అన్ని రోజులు తెరిచి ఉంటుంది.", hi: "मंदिर सुबह 6:00 से 12:00 बजे तक और शाम 4:00 से 9:00 बजे तक, सभी दिन खुला रहता है।", sa: "मन्दिरं प्रातः 6:00 तः 12:00 पर्यन्तं सायं 4:00 तः 9:00 पर्यन्तं च सर्वदिनेषु उद्घाटितम्।" }
  },
  {
    question: { en: "How can I book a special pooja?", te: "ప్రత్యేక పూజ ఎలా బుక్ చేయాలి?", hi: "विशेष पूजा कैसे बुक करें?", sa: "विशेषपूजां कथं बुक् कुर्यात्?" },
    answer: { en: "Contact VRDS Prasad on WhatsApp at 8247787529 to book special poojas.", te: "ప్రత్యేక పూజల కోసం VRDS ప్రసాద్ని WhatsApp లో 8247787529 కు సంప్రదించండి.", hi: "विशेष पूजा बुक करने के लिए VRDS प्रसाद से WhatsApp पर 8247787529 पर संपर्क करें।", sa: "विशेषपूजाबुकिंगार्थं VRDS प्रसादं WhatsApp द्वारा 8247787529 इति सम्पर्कयन्तु।" }
  },
  {
    question: { en: "Is Annadanam available daily?", te: "అన్నదానం ప్రతిరోజూ అందుబాటులో ఉంటుందా?", hi: "क्या अन्नदानम प्रतिदिन उपलब्ध है?", sa: "किम् अन्नदानं प्रतिदिनम् उपलभ्यते?" },
    answer: { en: "Yes, free Annadanam is available every day during lunch and dinner for all devotees.", te: "అవును, అన్ని భక్తులకు భోజనం మరియు రాత్రి భోజన సమయంలో ప్రతిరోజూ ఉచిత అన్నదానం అందుబాటులో ఉంటుంది.", hi: "हां, सभी भक्तों के लिए दोपहर और रात के भोजन के दौरान प्रतिदिन मुफ्त अन्नदानम उपलब्ध है।", sa: "आम्, सर्वभक्तेभ्यः मध्याह्नभोजने रात्रिभोजने च प्रतिदिनं निःशुल्कम् अन्नदानम् उपलभ्यते।" }
  },
  {
    question: { en: "How can I donate to the temple?", te: "ఆలయానికి ఎలా విరాళం ఇవ్వవచ్చు?", hi: "मंदिर को दान कैसे दें?", sa: "मन्दिराय दानं कथं दद्यात्?" },
    answer: { en: "You can donate via UPI, bank transfer, or in person at the temple.", te: "UPI, బ్యాంక్ బదిలీ లేదా ఆలయంలో వ్యక్తిగతంగా విరాళం ఇవ్వవచ్చు.", hi: "आप UPI, बैंक ट्रांसफर या मंदिर में व्यक्तिगत रूप से दान कर सकते हैं।", sa: "UPI, कोषागारहस्तान्तरेण, मन्दिरे साक्षात् वा दानं दातुं शक्नोति।" }
  },
  {
    question: { en: "Are Vedic classes available for children?", te: "పిల్లలకు వేద తరగతులు అందుబాటులో ఉన్నాయా?", hi: "क्या बच्चों के लिए वैदिक कक्षाएं उपलब्ध हैं?", sa: "किं बालेभ्यः वैदिककक्ष्याः उपलभ्यन्ते?" },
    answer: { en: "Yes, free Vedic classes every weekend for children aged 5-15.", te: "అవును, 5-15 సంవత్సరాల పిల్లలకు ప్రతి వారాంతంలో ఉచిత వేద తరగతులు.", hi: "हां, 5-15 वर्ष के बच्चों के लिए हर सप्ताहांत मुफ्त वैदिक कक्षाएं।", sa: "आम्, 5-15 वर्षीयबालेभ्यः प्रतिसप्ताहान्ते निःशुल्कवैदिककक्ष्याः।" }
  }
];

var PARTNERS = [
  { name: "Partner 1", logo: "assets/images/partner1.png", url: "#" },
  { name: "Partner 2", logo: "assets/images/partner2.png", url: "#" }
];

var TIMELINE = [
  { year: "1998", text: "Temple foundation stone laid" },
  { year: "2005", text: "Daily Annadanam program started" },
  { year: "2015", text: "Free Vedic classes launched" },
  { year: "2024", text: "Serving 1000+ daily devotees" }
];

var BEFORE_AFTER = [
  { before: "assets/images/before.jpg", after: "assets/images/after.jpg", label: "Temple Entrance" }
];

var VIDEO_TESTIMONIALS = [
  { name: "Ramesh Kumar", video: "", poster: "assets/images/video-poster.jpg", text: "The temple changed my life..." }
];
