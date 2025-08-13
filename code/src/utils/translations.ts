export interface Translation {
  // Header
  appName: string;
  home: string;
  lessons: string;
  practice: string;
  progress: string;
  profile: string;

  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  startLearning: string;
  watchDemo: string;
  computerBasics: string;
  computerBasicsDesc: string;
  smartphoneSkills: string;
  smartphoneSkillsDesc: string;
  internetSafety: string;
  internetSafetyDesc: string;

  // Lessons Section
  lessonsTitle: string;
  lessonsSubtitle: string;
  learningCategories: string;
  essentialApps: string;
  duration: string;
  locked: string;
  review: string;
  start: string;

  // Lesson Content
  lessonModules: {
    [key: string]: {
      title: string;
      duration: string;
    }[];
  };

  // Progress Section
  progressTitle: string;
  progressSubtitle: string;
  learningProgress: string;
  keepUpWork: string;
  overallCompletion: string;
  lessonsComplete: string;
  dayStreak: string;
  certificates: string;
  skillProgress: string;
  nextMilestone: string;
  almostThere: string;
  moreLessons: string;
  learningStreak: string;
  keepGoing: string;
  days: string;
  achievements: string;

  // Chatbot
  chatbotGreeting: string;
  chatbotPlaceholder: string;
  digitalLearningAssistant: string;
  askAnything: string;
  quickQuestions: string[];

  // Footer
  footerDescription: string;
  quickLinks: string;
  aboutUs: string;
  learningCategoriesFooter: string;
  governmentServices: string;
  contactUs: string;
  newsletter: string;
  enterEmail: string;
  subscribe: string;
  footerCopyright: string;
  privacyPolicy: string;
  termsOfService: string;
  accessibility: string;

  // Achievements
  achievementNames: string[];
  achievementDescriptions: string[];

  // Categories
  categoryNames: string[];

  // Video/Lesson Modal
  lessonContent: string;
  lessonDescription: string;
  keyPoints: string;
  keyPoint1: string;
  keyPoint2: string;
  keyPoint3: string;
  close: string;
  markComplete: string;
  reviewComplete: string;
}

export const translations: { [key: string]: Translation } = {
  en: {
    appName: "Digital Education",
    home: "Home",
    lessons: "Lessons",
    practice: "Practice",
    progress: "Progress",
    profile: "Profile",

    heroTitle: "Learn Digital Skills",
    heroSubtitle: "for Rural Communities",
    heroDescription: "Master computer and smartphone basics in your local language. Interactive lessons designed for beginners with step-by-step guidance.",
    startLearning: "Start Learning",
    watchDemo: "Watch Demo",
    computerBasics: "Computer Basics",
    computerBasicsDesc: "Learn mouse, keyboard, and essential software",
    smartphoneSkills: "Smartphone Skills",
    smartphoneSkillsDesc: "Master apps, settings, and digital communication",
    internetSafety: "Internet Safety",
    internetSafetyDesc: "Stay safe online with security best practices",

    lessonsTitle: "Interactive Learning Modules",
    lessonsSubtitle: "Structured lessons designed for beginners with hands-on practice and real-world applications",
    learningCategories: "Learning Categories",
    essentialApps: "Essential Apps",
    duration: "min",
    locked: "Locked",
    review: "Review",
    start: "Start",

    lessonModules: {
      computer: [
        { title: "Using Mouse and Keyboard", duration: "15" },
        { title: "Understanding Files and Folders", duration: "20" },
        { title: "Getting Started with MS Word", duration: "25" },
      ],
      smartphone: [
        { title: "Basic Phone Settings", duration: "12" },
        { title: "Using WhatsApp", duration: "18" },
        { title: "Camera and Photos", duration: "15" },
      ],
      internet: [
        { title: "Using Internet Browser", duration: "20" },
        { title: "Understanding Search Engines", duration: "18" },
        { title: "Creating Email Account", duration: "22" },
      ],
      apps: [
        { title: "Google Maps Navigation", duration: "15" },
        { title: "Using YouTube", duration: "20" },
        { title: "Online Shopping Apps", duration: "25" },
      ],
    },

    progressTitle: "Track Your Learning Journey",
    progressSubtitle: "Monitor your progress, celebrate achievements, and stay motivated on your digital learning path",
    learningProgress: "Learning Progress",
    keepUpWork: "Keep up the great work!",
    overallCompletion: "Overall completion",
    lessonsComplete: "Lessons Complete",
    dayStreak: "Day Streak",
    certificates: "Certificates",
    skillProgress: "Skill Progress",
    nextMilestone: "Next Milestone",
    almostThere: "Almost there!",
    moreLessons: "more lessons to go",
    learningStreak: "Learning Streak",
    keepGoing: "Keep it going!",
    days: "Days",
    achievements: "Achievements",

    chatbotGreeting: "Hello! I'm your Digital Learning Assistant. I can help you learn about computers and smartphones. What would you like to learn?",
    chatbotPlaceholder: "Type your question...",
    digitalLearningAssistant: "Digital Learning Assistant",
    askAnything: "Ask me anything about digital skills",
    quickQuestions: [
      "How to turn on computer?",
      "How to use WhatsApp?",
      "How to browse Internet?",
      "How to send email?",
      "How to download apps?",
    ],

    footerDescription: "Empowering rural communities with essential digital skills through interactive learning in local languages.",
    quickLinks: "Quick Links",
    aboutUs: "About Us",
    learningCategoriesFooter: "Learning Categories",
    governmentServices: "Government Services",
    contactUs: "Contact Us",
    newsletter: "Newsletter",
    enterEmail: "Enter your email",
    subscribe: "Subscribe",
    footerCopyright: "© 2024 Digital Education. All rights reserved. Made with ❤️ for rural communities.",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    accessibility: "Accessibility",

    achievementNames: ["First Steps", "Week Warrior", "Computer Expert", "Safety Champion"],
    achievementDescriptions: [
      "Complete your first lesson",
      "Maintain 7-day streak",
      "Complete all computer lessons",
      "Master internet safety"
    ],

    categoryNames: ["Computer Basics", "Smartphone Skills", "Internet & Safety", "Essential Apps"],

    lessonContent: "Lesson Content",
    lessonDescription: "This interactive video lesson will guide you through the fundamentals step by step. Watch carefully and practice along.",
    keyPoints: "Key Learning Points",
    keyPoint1: "Follow along with the video demonstration",
    keyPoint2: "Practice each step on your own device",
    keyPoint3: "Complete the lesson to unlock the next module",
    close: "Close",
    markComplete: "Mark as Complete",
    reviewComplete: "Review Again",
  },

  hi: {
    appName: "डिजिटल शिक्षा",
    home: "होम",
    lessons: "पाठ",
    practice: "अभ्यास",
    progress: "प्रगति",
    profile: "प्रोफाइल",

    heroTitle: "डिजिटल कौशल सीखें",
    heroSubtitle: "ग्रामीण समुदायों के लिए",
    heroDescription: "अपनी स्थानीय भाषा में कंप्यूटर और स्मार्टफोन की बुनियादी बातें सीखें। शुरुआती लोगों के लिए डिज़ाइन किए गए इंटरैक्टिव पाठ।",
    startLearning: "सीखना शुरू करें",
    watchDemo: "डेमो देखें",
    computerBasics: "कंप्यूटर की बुनियादी बातें",
    computerBasicsDesc: "माउस, कीबोर्ड और आवश्यक सॉफ्टवेयर सीखें",
    smartphoneSkills: "स्मार्टफोन कौशल",
    smartphoneSkillsDesc: "ऐप्स, सेटिंग्स और डिजिटल संचार में महारत हासिल करें",
    internetSafety: "इंटरनेट सुरक्षा",
    internetSafetyDesc: "सुरक्षा की सर्वोत्तम प्रथाओं के साथ ऑनलाइन सुरक्षित रहें",

    lessonsTitle: "इंटरैक्टिव लर्निंग मॉड्यूल",
    lessonsSubtitle: "शुरुआती लोगों के लिए व्यावहारिक अभ्यास और वास्तविक दुनिया के अनुप्रयोगों के साथ संरचित पाठ",
    learningCategories: "सीखने की श्रेणियां",
    essentialApps: "आवश्यक ऐप्स",
    duration: "मिनट",
    locked: "बंद",
    review: "समीक्षा",
    start: "शुरू करें",

    lessonModules: {
      computer: [
        { title: "माउस और कीबोर्ड का उपयोग", duration: "15" },
        { title: "फाइलें और फोल्डर समझें", duration: "20" },
        { title: "MS Word की शुरुआत", duration: "25" },
      ],
      smartphone: [
        { title: "फोन की बुनियादी सेटिंग्स", duration: "12" },
        { title: "WhatsApp का उपयोग", duration: "18" },
        { title: "कैमरा और फोटो", duration: "15" },
      ],
      internet: [
        { title: "इंटरनेट ब्राउज़र का उपयोग", duration: "20" },
        { title: "सर्च इंजन की जानकारी", duration: "18" },
        { title: "ईमेल खाता बनाना", duration: "22" },
      ],
      apps: [
        { title: "Google Maps नेवीगेशन", duration: "15" },
        { title: "YouTube का उपयोग", duration: "20" },
        { title: "ऑनलाइन शॉपिंग ऐप्स", duration: "25" },
      ],
    },

    progressTitle: "अपनी सीखने की यात्रा को ट्रैक करें",
    progressSubtitle: "अपनी प्रगति की निगरानी करें, उपलब्धियों का जश्न मनाएं, और अपने डिजिटल सीखने के रास्ते पर प्रेरित रहें",
    learningProgress: "सीखने की प्रगति",
    keepUpWork: "बेहतरीन काम जारी रखें!",
    overallCompletion: "कुल पूर्णता",
    lessonsComplete: "पाठ पूरे",
    dayStreak: "दिन की लकीर",
    certificates: "प्रमाणपत्र",
    skillProgress: "कौशल प्रगति",
    nextMilestone: "अगला मील का पत्थर",
    almostThere: "लगभग पहुंच गए!",
    moreLessons: "और पाठ बाकी हैं",
    learningStreak: "सीखने की लकीर",
    keepGoing: "जारी रखें!",
    days: "दिन",
    achievements: "उपलब्धियां",

    chatbotGreeting: "नमस्ते! मैं आपका डिजिटल लर्निंग असिस्टेंट हूं। मैं आपको कंप्यूटर और स्मार्टफोन के बारे में सिखाने में मदद कर सकता हूं। आप क्या सीखना चाहते हैं?",
    chatbotPlaceholder: "अपना प्रश्न टाइप करें...",
    digitalLearningAssistant: "डिजिटल लर्निंग असिस्टेंट",
    askAnything: "डिजिटल कौशल के बारे में कुछ भी पूछें",
    quickQuestions: [
      "कंप्यूटर कैसे चालू करें?",
      "WhatsApp कैसे इस्तेमाल करें?",
      "Internet कैसे browse करें?",
      "Email कैसे भेजें?",
      "Apps कैसे download करें?",
    ],

    footerDescription: "स्थानीय भाषाओं में इंटरैक्टिव लर्निंग के माध्यम से ग्रामीण समुदायों को आवश्यक डिजिटल कौशल के साथ सशक्त बनाना।",
    quickLinks: "त्वरित लिंक",
    aboutUs: "हमारे बारे में",
    learningCategoriesFooter: "सीखने की श्रेणियां",
    governmentServices: "सरकारी सेवाएं",
    contactUs: "संपर्क करें",
    newsletter: "न्यूज़लेटर",
    enterEmail: "अपना ईमेल दर्ज करें",
    subscribe: "सब्सक्राइब करें",
    footerCopyright: "© 2024 डिजिटल शिक्षा। सभी अधिकार सुरक्षित। ग्रामीण समुदायों के लिए ❤️ के साथ बनाया गया।",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    accessibility: "पहुंच",

    achievementNames: ["पहले कदम", "सप्ताह योद्धा", "कंप्यूटर विशेषज्ञ", "सुरक्षा चैंपियन"],
    achievementDescriptions: [
      "अपना पहला पाठ पूरा करें",
      "7-दिन की लकीर बनाए रखें",
      "सभी कंप्यूटर पाठ पूरे करें",
      "इंटरनेट सुरक्षा में महारत हासिल करें"
    ],

    categoryNames: ["कंप्यूटर की बुनियादी बातें", "स्मार्टफोन कौशल", "इंटरनेट और सुरक्षा", "आवश्यक ऐप्स"],

    lessonContent: "पाठ सामग्री",
    lessonDescription: "यह इंटरैक्टिव वीडियो पाठ आपको चरणबद्ध तरीके से बुनियादी बातों के माध्यम से मार्गदर्शन करेगा। ध्यान से देखें और साथ-साथ अभ्यास करें।",
    keyPoints: "मुख्य सीखने के बिंदु",
    keyPoint1: "वीडियो प्रदर्शन के साथ-साथ चलें",
    keyPoint2: "अपने डिवाइस पर प्रत्येक चरण का अभ्यास करें",
    keyPoint3: "अगला मॉड्यूल अनलॉक करने के लिए पाठ पूरा करें",
    close: "बंद करें",
    markComplete: "पूर्ण के रूप में चिह्नित करें",
    reviewComplete: "फिर से समीक्षा करें",
  },

  te: {
    appName: "డిజిటల్ విద్య",
    home: "హోమ్",
    lessons: "పాఠాలు",
    practice: "అభ్యాసం",
    progress: "పురోగతి",
    profile: "ప్రొఫైల్",

    heroTitle: "డిజిటల్ నైపుణ్యాలు నేర్చుకోండి",
    heroSubtitle: "గ్రామీణ సమాజాల కోసం",
    heroDescription: "మీ స్థానిక భాషలో కంప్యూటర్ మరియు స్మార్ట్‌ఫోన్ ప్రాథమిక విషయాలను నేర్చుకోండి. ప్రారంభకుల కోసం దశల వారీ మార్గదర్శకత్వంతో ఇంటరాక్టివ్ పాఠాలు.",
    startLearning: "నేర్చుకోవడం ప్రారంభించండి",
    watchDemo: "డెమో చూడండి",
    computerBasics: "కంప్యూటర్ ప్రాథమికాలు",
    computerBasicsDesc: "మౌస్, కీబోర్డ్ మరియు అవసరమైన సాఫ్ట్‌వేర్ నేర్చుకోండి",
    smartphoneSkills: "స్మార్ట్‌ఫోన్ నైపుణ్యాలు",
    smartphoneSkillsDesc: "యాప్‌లు, సెట్టింగ్‌లు మరియు డిజిటల్ కమ్యూనికేషన్‌లో నైపుణ్యం పొందండి",
    internetSafety: "ఇంటర్నెట్ భద్రత",
    internetSafetyDesc: "భద్రతా ఉత్తమ అభ్యాసాలతో ఆన్‌లైన్‌లో సురక్షితంగా ఉండండి",

    lessonsTitle: "ఇంటరాక్టివ్ లెర్నింగ్ మాడ్యూల్స్",
    lessonsSubtitle: "ప్రాక్టికల్ అభ్యాసం మరియు వాస్తవ ప్రపంచ అనువర్తనాలతో ప్రారంభకుల కోసం నిర్మాణాత్మక పాఠాలు",
    learningCategories: "నేర్చుకునే వర్గాలు",
    essentialApps: "అవసరమైన యాప్‌లు",
    duration: "నిమిషాలు",
    locked: "లాక్ చేయబడింది",
    review: "సమీక్ష",
    start: "ప్రారంభించండి",

    lessonModules: {
      computer: [
        { title: "మౌస్ మరియు కీబోర్డ్ వాడకం", duration: "15" },
        { title: "ఫైల్స్ మరియు ఫోల్డర్లను అర్థం చేసుకోవడం", duration: "20" },
        { title: "MS Word తో ప్రారంభం", duration: "25" },
      ],
      smartphone: [
        { title: "ఫోన్ ప్రాథమిక సెట్టింగ్‌లు", duration: "12" },
        { title: "WhatsApp వాడకం", duration: "18" },
        { title: "కెమెరా మరియు ఫోటోలు", duration: "15" },
      ],
      internet: [
        { title: "ఇంటర్నెట్ బ్రౌజర్ వాడకం", duration: "20" },
        { title: "సెర్చ్ ఇంజిన్‌లను అర్థం చేసుకోవడం", duration: "18" },
        { title: "ఇమెయిల్ ఖాతా సృష్టించడం", duration: "22" },
      ],
      apps: [
        { title: "Google Maps నావిగేషన్", duration: "15" },
        { title: "YouTube వాడకం", duration: "20" },
        { title: "ఆన్‌లైన్ షాపింగ్ యాప్‌లు", duration: "25" },
      ],
    },

    progressTitle: "మీ నేర్చుకునే ప్రయాణాన్ని ట్రాక్ చేయండి",
    progressSubtitle: "మీ పురోగతిని పర్యవేక్షించండి, విజయాలను జరుపుకోండి మరియు మీ డిజిటల్ నేర్చుకునే మార్గంలో ప్రేరణతో ఉండండి",
    learningProgress: "నేర్చుకునే పురోగతి",
    keepUpWork: "గొప్ప పనిని కొనసాగించండి!",
    overallCompletion: "మొత్తం పూర్తి",
    lessonsComplete: "పాఠాలు పూర్తి",
    dayStreak: "రోజుల వరుస",
    certificates: "సర్టిఫికేట్లు",
    skillProgress: "నైపుణ్య పురోగతి",
    nextMilestone: "తదుపరి మైలురాయి",
    almostThere: "దాదాపు చేరుకున్నారు!",
    moreLessons: "మరిన్ని పాఠాలు మిగిలి ఉన్నాయి",
    learningStreak: "నేర్చుకునే వరుస",
    keepGoing: "కొనసాగించండి!",
    days: "రోజులు",
    achievements: "విజయాలు",

    chatbotGreeting: "నమస్కారం! నేను మీ డిజిటల్ లెర్నింగ్ అసిస్టెంట్. నేను మీకు కంప్యూటర్ మరియు స్మార్ట్‌ఫోన్ గురించి నేర్చుకోవడంలో సహాయం చేయగలను. మీరు ఏమి నేర్చుకోవాలనుకుంటున్నారు?",
    chatbotPlaceholder: "మీ ప్రశ్నను టైప్ చేయండి...",
    digitalLearningAssistant: "డిజిటల్ లెర్నింగ్ అసిస్టెంట్",
    askAnything: "డిజిటల్ నైపుణ్యాల గురించి ఏదైనా అడగండి",
    quickQuestions: [
      "కంప్యూటర్‌ను ఎలా ఆన్ చేయాలి?",
      "WhatsApp ఎలా ఉపయోగించాలి?",
      "ఇంటర్నెట్‌ను ఎలా బ్రౌజ్ చేయాలి?",
      "ఇమెయిల్ ఎలా పంపాలి?",
      "యాప్‌లను ఎలా డౌన్‌లోడ్ చేయాలి?",
    ],

    footerDescription: "స్థానిక భాషలలో ఇంటరాక్టివ్ లెర్నింగ్ ద్వారా గ్రామీణ సమాజాలను అవసరమైన డిజిటల్ నైపుణ్యాలతో శక్తివంతం చేయడం.",
    quickLinks: "త్వరిత లింక్‌లు",
    aboutUs: "మా గురించి",
    learningCategoriesFooter: "నేర్చుకునే వర్గాలు",
    governmentServices: "ప్రభుత్వ సేవలు",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    newsletter: "వార్తాలేఖ",
    enterEmail: "మీ ఇమెయిల్‌ను నమోదు చేయండి",
    subscribe: "సబ్‌స్క్రైబ్ చేయండి",
    footerCopyright: "© 2024 డిజిటల్ విద్య. అన్ని హక్కులు రక్షించబడ్డాయి. గ్రామీణ సమాజాల కోసం ❤️ తో తయారు చేయబడింది.",
    privacyPolicy: "గోప్యతా విధానం",
    termsOfService: "సేవా నిబంధనలు",
    accessibility: "ప్రాప్యత",

    achievementNames: ["మొదటి అడుగులు", "వారం యోధుడు", "కంప్యూటర్ నిపుణుడు", "భద్రతా ఛాంపియన్"],
    achievementDescriptions: [
      "మీ మొదటి పాఠాన్ని పూర్తి చేయండి",
      "7-రోజుల వరుసను కొనసాగించండి",
      "అన్ని కంప్యూటర్ పాఠాలను పూర్తి చేయండి",
      "ఇంటర్నెట్ భద్రతలో నైపుణ్యం పొందండి"
    ],

    categoryNames: ["కంప్యూటర్ ప్రాథమికాలు", "స్మార్ట్‌ఫోన్ నైపుణ్యాలు", "ఇంటర్నెట్ & భద్రత", "అవసరమైన యాప్‌లు"],

    lessonContent: "పాఠ కంటెంట్",
    lessonDescription: "ఈ ఇంటరాక్టివ్ వీడియో పాఠం మిమ్మల్ని దశల వారీగా ప్రాథమిక విషయాల ద్వారా మార్గనిర్దేశం చేస్తుంది. జాగ్రత్తగా చూడండి మరియు వెంట అభ్యసించండి।",
    keyPoints: "ముఖ్య అభ్యాస పాయింట్లు",
    keyPoint1: "వీడియో ప్రదర్శనతో పాటు అనుసరించండి",
    keyPoint2: "మీ స్వంత పరికరంలో ప్రతి దశను అభ్యసించండి",
    keyPoint3: "తదుపరి మాడ్యూల్‌ను అన్‌లాక్ చేయడానికి పాఠాన్ని పూర్తి చేయండి",
    close: "మూసివేయండి",
    markComplete: "పూర్తిగా గుర్తించండి",
    reviewComplete: "మళ్లీ సమీక్షించండి",
  },
};

export const getTranslation = (language: string): Translation => {
  return translations[language] || translations.en;
};