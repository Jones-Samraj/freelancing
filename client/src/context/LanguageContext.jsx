import React, { createContext, useContext, useState, useEffect } from 'react';

export const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', name: 'Spanish', nativeName: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'German', nativeName: 'Deutsch', flag: '🇩🇪' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl' }
];

export const translations = {
  en: {
    // Nav
    nav_home: 'Home',
    nav_services: 'Services',
    nav_how_it_works: 'How It Works',
    nav_about: 'About',
    nav_contact: 'Contact',
    nav_sign_in: 'Sign In',
    nav_get_started: 'Get Started',
    nav_post_project: 'Post a Project',
    nav_dashboard: 'Dashboard',
    nav_admin_dashboard: 'Admin Dashboard',
    nav_all_projects: 'All Projects',
    nav_profile: 'Profile & Settings',
    nav_sign_out: 'Sign Out',
    nav_choose_language: 'Choose Language',

    // Hero
    hero_badge: 'Managed Tech Service Platform',
    hero_title_1: 'Build. Support.',
    hero_title_2: 'Maintain.',
    hero_desc: 'Uzhaipu connects you with a dedicated engineering team to build, support, and scale your software. Post a project, receive a transparent quotation, and track every milestone — all in one place.',
    hero_cta_post: "Post a Project — It's Free",
    hero_cta_explore: 'Explore Services',
    hero_social_proof: 'already building with Uzhaipu',

    // Stats
    stat_delivered: 'Projects Delivered',
    stat_satisfaction: 'Client Satisfaction',
    stat_specialists: 'Tech Specialists',
    stat_excellence: 'Of Excellence',

    // Services
    services_eyebrow: 'What We Do',
    services_title: 'Every Service Your Project Needs',
    services_desc: 'From greenfield builds to ongoing maintenance — Uzhaipu covers the full software lifecycle with one dedicated team.',
    services_get_started: 'Get Started',

    // Process
    process_eyebrow: 'Process',
    process_title: 'How Uzhaipu Works',
    process_desc: 'Transparent, structured, and predictable — from first request to final delivery.',
    process_step1_title: 'Post Your Project',
    process_step1_desc: 'Describe requirements, select a type, set your budget, and upload reference files.',
    process_step2_title: 'Expert Review',
    process_step2_desc: 'Our tech lead reviews your request, may ask clarifying questions, and prepares a detailed proposal.',
    process_step3_title: 'Accept Quotation',
    process_step3_desc: 'Review the itemized proposal, accept it, and a formal contract auto-generates instantly.',
    process_step4_title: 'Track & Deliver',
    process_step4_desc: 'Monitor milestones, chat directly with admin, approve deliverables, and manage payments.',
    process_start_btn: 'Start Your Project Now',

    // Testimonials
    testimonials_eyebrow: 'Client Voices',
    testimonials_title: 'Trusted by Teams Worldwide',

    // CTA
    cta_title: 'Your project deserves expert execution.',
    cta_desc: "Post your project today and let Uzhaipu's team handle everything — from initial quote to final delivery — with full transparency at every step.",
    cta_btn_free: 'Post a Project — Free',
    cta_btn_about: 'Learn More About Us'
  },
  ta: {
    // Nav
    nav_home: 'முகப்பு',
    nav_services: 'சேவைகள்',
    nav_how_it_works: 'எப்படி இயங்குகிறது',
    nav_about: 'எங்களை பற்றி',
    nav_contact: 'தொடர்புக்கு',
    nav_sign_in: 'உள்நுழைக',
    nav_get_started: 'தொடங்குங்கள்',
    nav_post_project: 'திட்டத்தை பதிவிடுங்கள்',
    nav_dashboard: 'டாஷ்போர்டு',
    nav_admin_dashboard: 'நிர்வாக டாஷ்போர்டு',
    nav_all_projects: 'அனைத்து திட்டங்கள்',
    nav_profile: 'சுயவிவரம் & அமைப்புகள்',
    nav_sign_out: 'வெளியேறு',
    nav_choose_language: 'மொழியை தேர்ந்தெடுக்கவும்',

    // Hero
    hero_badge: 'மேலாண்மை தொழில்நுட்ப சேவை தளம்',
    hero_title_1: 'உருவாக்குங்கள். ஆதரவு பெறுங்கள்.',
    hero_title_2: 'பராமரியுங்கள்.',
    hero_desc: 'உழைப்பு உங்கள் மென்பொருளை உருவாக்க, ஆதரவளிக்க மற்றும் அளவிட ஒரு பிரத்யேக பொறியியல் குழுவுடன் இணைக்கிறது. திட்டத்தை பதிவிட்டு வெளிப்படையான விலையறிக்கையைப் பெற்று ஒவ்வொரு மைல்கல்லையும் கண்காணிக்கவும்.',
    hero_cta_post: 'திட்டத்தை பதிவிடுங்கள் — இலவசம்',
    hero_cta_explore: 'சேவைகளை ஆராயுங்கள்',
    hero_social_proof: 'வாடிக்கையாளர்கள் உழைப்புடன் இணைந்து பணியாற்றுகிறார்கள்',

    // Stats
    stat_delivered: 'நிறைவேற்றப்பட்ட திட்டங்கள்',
    stat_satisfaction: 'வாடிக்கையாளர் திருப்தி',
    stat_specialists: 'தொழில்நுட்ப வல்லுநர்கள்',
    stat_excellence: 'சிறந்த சேவை அனுபவம்',

    // Services
    services_eyebrow: 'நாங்கள் செய்வது',
    services_title: 'உங்கள் திட்டத்திற்கு தேவையான அனைத்து சேவைகளும்',
    services_desc: 'புதிய மென்பொருள் உருவாக்கம் முதல் தொடர் பராமரிப்பு வரை — முழு வாழ்க்கை சுழற்சியையும் உழைப்பு ஒரே குழுவாக நிறைவேற்றுகிறது.',
    services_get_started: 'தொடங்குங்கள்',

    // Process
    process_eyebrow: 'செயல்முறை',
    process_title: 'உழைப்பு எவ்வாறு செயல்படுகிறது',
    process_desc: 'வெளிப்படையான, கட்டமைக்கப்பட்ட மற்றும் நம்பகமான செயல்முறை.',
    process_step1_title: 'திட்டத்தை பதிவிடுங்கள்',
    process_step1_desc: 'தேவைகளை விவரிக்கவும், வகையைத் தேர்வு செய்யவும், பட்ஜெட்டை நிர்ணயிக்கவும்.',
    process_step2_title: 'வல்லுநர் மதிப்பாய்வு',
    process_step2_desc: 'எங்கள் குழு உங்கள் கோரிக்கையை ஆய்வு செய்து விரிவான திட்ட முன்மொழிவைத் தயாரிக்கும்.',
    process_step3_title: 'விலைப்புள்ளியை ஏற்கவும்',
    process_step3_desc: 'விவரங்களை மதிப்பாய்வு செய்து ஏற்கவும், உடனடியாக ஒப்பந்தம் உருவாக்கப்படும்.',
    process_step4_title: 'கண்காணித்து பெறுங்கள்',
    process_step4_desc: 'மைல்கற்களைக் கண்காணித்து, நிர்வாகியுடன் அரட்டையடித்து விநியோகங்களை அங்கீகரிக்கவும்.',
    process_start_btn: 'திட்டத்தை இப்போதே தொடங்குங்கள்',

    // Testimonials
    testimonials_eyebrow: 'வாடிக்கையாளர் கருத்துக்கள்',
    testimonials_title: 'உலகளாவிய குழுக்களின் நம்பிக்கை',

    // CTA
    cta_title: 'உங்கள் திட்டம் சிறந்த நிபுணத்துவத்திற்கு தகுதியானது.',
    cta_desc: 'இன்றே திட்டத்தை பதிவிடுங்கள், தொடக்க விலை முதல் இறுதி விநியோகம் வரை உழைப்பு குழு பொறுப்பேற்கும்.',
    cta_btn_free: 'திட்டத்தை பதிவிடுங்கள் — இலவசம்',
    cta_btn_about: 'எங்களை பற்றி அறியுங்கள்'
  },
  hi: {
    // Nav
    nav_home: 'होम',
    nav_services: 'सेवाएं',
    nav_how_it_works: 'यह कैसे काम करता है',
    nav_about: 'हमारे बारे में',
    nav_contact: 'संपर्क करें',
    nav_sign_in: 'साइन इन',
    nav_get_started: 'शुरू करें',
    nav_post_project: 'प्रोजेक्ट पोस्ट करें',
    nav_dashboard: 'डैशबोर्ड',
    nav_admin_dashboard: 'व्यवस्थापक डैशबोर्ड',
    nav_all_projects: 'सभी प्रोजेक्ट्स',
    nav_profile: 'प्रोफाइल और सेटिंग्स',
    nav_sign_out: 'साइन आउट',
    nav_choose_language: 'भाषा चुनें',

    // Hero
    hero_badge: 'प्रबंधित टेक सेवा मंच',
    hero_title_1: 'बनाएं। समर्थन पाएं।',
    hero_title_2: 'रखरखाव करें।',
    hero_desc: 'Uzhaipu आपको समर्पित इंजीनियरिंग टीम से जोड़ता है। प्रोजेक्ट पोस्ट करें, पारदर्शी कोटेशन प्राप्त करें, और सभी माइलस्टोन ट्रैक करें।',
    hero_cta_post: 'प्रोजेक्ट पोस्ट करें — मुफ्त',
    hero_cta_explore: 'सेवाएं देखें',
    hero_social_proof: 'क्लाइंट्स Uzhaipu के साथ काम कर रहे हैं',

    // Stats
    stat_delivered: 'सफल प्रोजेक्ट्स',
    stat_satisfaction: 'ग्राहक संतुष्टि',
    stat_specialists: 'तकनीकी विशेषज्ञ',
    stat_excellence: 'उत्कृष्टता के वर्ष',

    // Services
    services_eyebrow: 'हम क्या करते हैं',
    services_title: 'आपके प्रोजेक्ट की हर ज़रूरत का समाधान',
    services_desc: 'नए निर्माण से लेकर निरंतर रखरखाव तक — Uzhaipu पूर्ण सॉफ्टवेयर जीवनचक्र संभालता है।',
    services_get_started: 'शुरू करें',

    // Process
    process_eyebrow: 'प्रक्रिया',
    process_title: 'Uzhaipu कैसे काम करता है',
    process_desc: 'पारदर्शी, संरचित और विश्वसनीय कार्यप्रणाली।',
    process_step1_title: 'प्रोजेक्ट पोस्ट करें',
    process_step1_desc: 'आवश्यकताएं बताएं, प्रकार चुनें और बजट तय करें।',
    process_step2_title: 'विशेषज्ञ समीक्षा',
    process_step2_desc: 'हमारी टीम प्रस्ताव और विस्तृत कोटेशन तैयार करेगी।',
    process_step3_title: 'कोटेशन स्वीकारें',
    process_step3_desc: 'प्रस्ताव की समीक्षा करें और अनुबंध तुरंत तैयार होगा।',
    process_step4_title: 'ट्रैक और डिलीवरी',
    process_step4_desc: 'माइलस्टोन ट्रैक करें और सीधे व्यवस्थापक से बात करें।',
    process_start_btn: 'अभी प्रोजेक्ट शुरू करें',

    // Testimonials
    testimonials_eyebrow: 'क्लाइंट समीक्षाएं',
    testimonials_title: 'विश्वभर में भरोसेमंद',

    // CTA
    cta_title: 'आपके प्रोजेक्ट को बेहतरीन निष्पादन की ज़रूरत है।',
    cta_desc: 'आज ही प्रोजेक्ट पोस्ट करें और Uzhaipu टीम को सब कुछ संभालने दें।',
    cta_btn_free: 'प्रोजेक्ट पोस्ट करें — मुफ्त',
    cta_btn_about: 'और जानें'
  },
  es: {
    // Nav
    nav_home: 'Inicio',
    nav_services: 'Servicios',
    nav_how_it_works: 'Cómo Funciona',
    nav_about: 'Nosotros',
    nav_contact: 'Contacto',
    nav_sign_in: 'Iniciar Sesión',
    nav_get_started: 'Comenzar',
    nav_post_project: 'Publicar Proyecto',
    nav_dashboard: 'Panel de Control',
    nav_admin_dashboard: 'Panel Admin',
    nav_all_projects: 'Todos los Proyectos',
    nav_profile: 'Perfil y Ajustes',
    nav_sign_out: 'Cerrar Sesión',
    nav_choose_language: 'Elegir Idioma',

    // Hero
    hero_badge: 'Plataforma de Servicios Tecnológicos',
    hero_title_1: 'Construir. Soporte.',
    hero_title_2: 'Mantenimiento.',
    hero_desc: 'Uzhaipu te conecta con un equipo de ingeniería dedicado para construir, dar soporte y escalar tu software.',
    hero_cta_post: 'Publicar Proyecto — Gratis',
    hero_cta_explore: 'Explorar Servicios',
    hero_social_proof: 'clientes ya están construyendo con Uzhaipu',

    // Stats
    stat_delivered: 'Proyectos Entregados',
    stat_satisfaction: 'Satisfacción del Cliente',
    stat_specialists: 'Especialistas Tech',
    stat_excellence: 'Años de Excelencia',

    // Services
    services_eyebrow: 'Lo Que Hacemos',
    services_title: 'Cada servicio que tu proyecto necesita',
    services_desc: 'Desde desarrollo inicial hasta mantenimiento continuo.',
    services_get_started: 'Comenzar',

    // Process
    process_eyebrow: 'Proceso',
    process_title: 'Cómo Funciona Uzhaipu',
    process_desc: 'Transparente, estructurado y predecible.',
    process_step1_title: 'Publica tu Proyecto',
    process_step1_desc: 'Describe tus requerimientos y presupuesto.',
    process_step2_title: 'Revisión Experta',
    process_step2_desc: 'Preparamos una cotización detallada.',
    process_step3_title: 'Acepta la Cotización',
    process_step3_desc: 'Revisa y genera el contrato al instante.',
    process_step4_title: 'Sigue y Recibe',
    process_step4_desc: 'Supervisa entregables y gestiona pagos.',
    process_start_btn: 'Iniciar Proyecto Ahora',

    // Testimonials
    testimonials_eyebrow: 'Voces de Clientes',
    testimonials_title: 'Confiado por Equipos Globales',

    // CTA
    cta_title: 'Tu proyecto merece una ejecución experta.',
    cta_desc: 'Publica tu proyecto hoy y deja que el equipo de Uzhaipu se encargue de todo.',
    cta_btn_free: 'Publicar Proyecto — Gratis',
    cta_btn_about: 'Conoce Más'
  },
  fr: {
    // Nav
    nav_home: 'Accueil',
    nav_services: 'Services',
    nav_how_it_works: 'Comment ça marche',
    nav_about: 'À propos',
    nav_contact: 'Contact',
    nav_sign_in: 'Connexion',
    nav_get_started: 'Commencer',
    nav_post_project: 'Publier un projet',
    nav_dashboard: 'Tableau de bord',
    nav_admin_dashboard: 'Tableau Admin',
    nav_all_projects: 'Tous les projets',
    nav_profile: 'Profil et paramètres',
    nav_sign_out: 'Déconnexion',
    nav_choose_language: 'Choisir la langue',

    // Hero
    hero_badge: 'Plateforme de services technologiques gérés',
    hero_title_1: 'Développer. Supporter.',
    hero_title_2: 'Maintenir.',
    hero_desc: 'Uzhaipu vous connecte à une équipe d’ingénieurs dédiée pour concevoir, supporter et faire évoluer vos logiciels.',
    hero_cta_post: 'Publier un projet — Gratuit',
    hero_cta_explore: 'Découvrir nos services',
    hero_social_proof: 'clients créent déjà avec Uzhaipu',

    // Stats
    stat_delivered: 'Projets livrés',
    stat_satisfaction: 'Satisfaction client',
    stat_specialists: 'Spécialistes tech',
    stat_excellence: "Années d'excellence",

    // Services
    services_eyebrow: 'Ce que nous faisons',
    services_title: 'Tous les services dont votre projet a besoin',
    services_desc: 'Du développement neuf à la maintenance continue.',
    services_get_started: 'Commencer',

    // Process
    process_eyebrow: 'Processus',
    process_title: 'Comment fonctionne Uzhaipu',
    process_desc: 'Transparent, structuré et prévisible.',
    process_step1_title: 'Publiez votre projet',
    process_step1_desc: 'Décrivez vos besoins et votre budget.',
    process_step2_title: 'Examen expert',
    process_step2_desc: 'Nous préparons un devis détaillé.',
    process_step3_title: 'Acceptez le devis',
    process_step3_desc: 'Générez votre contrat officiel immédiatement.',
    process_step4_title: 'Suivi et livraison',
    process_step4_desc: 'Suivez les jalons et échangez directement.',
    process_start_btn: 'Démarrer votre projet',

    // Testimonials
    testimonials_eyebrow: 'Témoignages',
    testimonials_title: 'Recommandé dans le monde entier',

    // CTA
    cta_title: 'Votre projet mérite une exécution experte.',
    cta_desc: "Publiez votre projet aujourd'hui et laissez l'équipe Uzhaipu s'occuper de tout.",
    cta_btn_free: 'Publier un projet — Gratuit',
    cta_btn_about: 'En savoir plus'
  },
  de: {
    // Nav
    nav_home: 'Startseite',
    nav_services: 'Dienste',
    nav_how_it_works: 'So funktioniert es',
    nav_about: 'Über uns',
    nav_contact: 'Kontakt',
    nav_sign_in: 'Anmelden',
    nav_get_started: 'Loslegen',
    nav_post_project: 'Projekt einstellen',
    nav_dashboard: 'Dashboard',
    nav_admin_dashboard: 'Admin-Dashboard',
    nav_all_projects: 'Alle Projekte',
    nav_profile: 'Profil & Einstellungen',
    nav_sign_out: 'Abmelden',
    nav_choose_language: 'Sprache wählen',

    // Hero
    hero_badge: 'Managed Tech Service Plattform',
    hero_title_1: 'Bauen. Unterstützen.',
    hero_title_2: 'Warten.',
    hero_desc: 'Uzhaipu verbindet Sie mit einem engagierten Engineering-Team für Softwareentwicklung und Wartung.',
    hero_cta_post: 'Projekt einstellen — Kostenlos',
    hero_cta_explore: 'Dienste entdecken',
    hero_social_proof: 'Kunden bauen bereits mit Uzhaipu',

    // Stats
    stat_delivered: 'Gelieferte Projekte',
    stat_satisfaction: 'Kundenzufriedenheit',
    stat_specialists: 'Tech-Spezialisten',
    stat_excellence: 'Jahre Exzellenz',

    // Services
    services_eyebrow: 'Unsere Leistungen',
    services_title: 'Jeder Service, den Ihr Projekt braucht',
    services_desc: 'Vom Neuaufbau bis zur kontinuierlichen Systemwartung.',
    services_get_started: 'Loslegen',

    // Process
    process_eyebrow: 'Ablauf',
    process_title: 'So funktioniert Uzhaipu',
    process_desc: 'Transparent, strukturiert und verlässlich.',
    process_step1_title: 'Projekt einstellen',
    process_step1_desc: 'Anforderungen und Budget definieren.',
    process_step2_title: 'Experten-Prüfung',
    process_step2_desc: 'Detailliertes Angebot erhalten.',
    process_step3_title: 'Angebot annehmen',
    process_step3_desc: 'Vertrag sofort automatisch erstellen.',
    process_step4_title: 'Verfolgen & Liefern',
    process_step4_desc: 'Meilensteine live überwachen.',
    process_start_btn: 'Jetzt Projekt starten',

    // Testimonials
    testimonials_eyebrow: 'Kundenstimmen',
    testimonials_title: 'Weltweit geschätzt',

    // CTA
    cta_title: 'Ihr Projekt verdient erstklassige Umsetzung.',
    cta_desc: 'Stellen Sie noch heute Ihr Projekt ein.',
    cta_btn_free: 'Projekt einstellen — Kostenlos',
    cta_btn_about: 'Mehr erfahren'
  },
  ar: {
    // Nav
    nav_home: 'الرئيسية',
    nav_services: 'الخدمات',
    nav_how_it_works: 'كيف يعمل',
    nav_about: 'من نحن',
    nav_contact: 'اتصل بنا',
    nav_sign_in: 'تسجيل الدخول',
    nav_get_started: 'ابدأ الآن',
    nav_post_project: 'نشر مشروع',
    nav_dashboard: 'لوحة التحكم',
    nav_admin_dashboard: 'لوحة الإدارة',
    nav_all_projects: 'جميع المشاريع',
    nav_profile: 'الملف الشخصي والإعدادات',
    nav_sign_out: 'تسجيل الخروج',
    nav_choose_language: 'اختر لغتك',

    // Hero
    hero_badge: 'منصة الخدمات التقنية المدارة',
    hero_title_1: 'بناء. دعم.',
    hero_title_2: 'صيانة.',
    hero_desc: 'تربطك Uzhaipu بفريق هندسي متكامل لبناء برمجياتك وتطويرها وصيانتها.',
    hero_cta_post: 'نشر مشروع — مجاناً',
    hero_cta_explore: 'استكشاف الخدمات',
    hero_social_proof: 'عميل يبنون مشاريعهم مع Uzhaipu',

    // Stats
    stat_delivered: 'مشاريع منجزة',
    stat_satisfaction: 'رضا العملاء',
    stat_specialists: 'خبراء تقنيون',
    stat_excellence: 'سنوات من التميز',

    // Services
    services_eyebrow: 'ما نقدمه',
    services_title: 'كل خدمة يحتاجها مشروعك',
    services_desc: 'من البناء الجديد إلى الصيانة الشاملة المستمرة.',
    services_get_started: 'ابدأ الآن',

    // Process
    process_eyebrow: 'خطوات العمل',
    process_title: 'كيف تعمل منصة Uzhaipu',
    process_desc: 'عملية شفافة، منظمة وموثوقة من البداية حتى التسليم.',
    process_step1_title: 'انشر مشروعك',
    process_step1_desc: 'حدد المتطلبات ونوع الخدمة والميزانية.',
    process_step2_title: 'مراجعة الخبراء',
    process_step2_desc: 'نعد عرض أسعار تفصيلي للمشروع.',
    process_step3_title: 'قبول العرض',
    process_step3_desc: 'توليد العقد تلقائياً بعد الموافقة.',
    process_step4_title: 'المتابعة والاستلام',
    process_step4_desc: 'متابعة مراحل الإنجاز والمحادثة المباشرة.',
    process_start_btn: 'ابدأ مشروعك الآن',

    // Testimonials
    testimonials_eyebrow: 'آراء العملاء',
    testimonials_title: 'موثوق من فرق العمل حول العالم',

    // CTA
    cta_title: 'مشروعك يستحق تنفيذاً احترافياً.',
    cta_desc: 'انشر مشروعك اليوم ودع فريق Uzhaipu يتكفل بالباقي.',
    cta_btn_free: 'نشر مشروع — مجاناً',
    cta_btn_about: 'معرفة المزيد'
  }
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('uzhaipu_language') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('uzhaipu_language', currentLang);
    const langObj = languages.find(l => l.code === currentLang);
    document.documentElement.lang = currentLang;
    if (langObj?.dir) {
      document.documentElement.dir = langObj.dir;
    } else {
      document.documentElement.dir = 'ltr';
    }
  }, [currentLang]);

  const t = (key, fallback = '') => {
    const langDict = translations[currentLang] || translations.en;
    return langDict[key] || translations.en[key] || fallback || key;
  };

  const selectedLanguage = languages.find(l => l.code === currentLang) || languages[0];

  return (
    <LanguageContext.Provider value={{ currentLang, setLanguage: setCurrentLang, selectedLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
