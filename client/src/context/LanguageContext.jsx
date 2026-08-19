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
    nav_dashboard: 'Client Dashboard',
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

    // Process & How it works
    process_eyebrow: 'Process',
    process_title: 'How Uzhaipu Works',
    process_desc: 'A structured, transparent, and predictable path from initial requirement to production deployment.',
    process_step1_title: 'Post Your Project',
    process_step1_desc: 'Describe requirements, select a service type, set your budget, and upload reference files safely.',
    process_step2_title: 'Expert Review & Proposal',
    process_step2_desc: 'Our technical team reviews your request, clarifies questions, and prepares a detailed line-item proposal.',
    process_step3_title: 'Accept Quotation & Contract',
    process_step3_desc: 'Review the transparent deliverables, accept it, and an official binding contract generates automatically.',
    process_step4_title: 'Track, Approve & Deliver',
    process_step4_desc: 'Monitor milestones, chat directly with technical management, approve deliverables, and manage escrow payments.',
    process_start_btn: 'Start Your Project Now',

    // Guarantees
    guarantee_escrow_title: 'Escrow Protection',
    guarantee_escrow_desc: 'Your payment is safely held in escrow and released only after you review and approve each completed milestone.',
    guarantee_itemized_title: 'Itemized Pricing',
    guarantee_itemized_desc: 'No hidden fees or ambiguous totals. Every feature has a clear itemized breakdown.',
    guarantee_direct_title: 'Direct Communication',
    guarantee_direct_desc: 'Communicate directly with your assigned Technical Lead anytime via built-in workspace messaging.',
    guarantee_secure_title: 'Secure Transactions',
    guarantee_secure_desc: 'Enterprise-grade encryption and verified transaction records for complete peace of mind.',

    // Common Types
    type_build: 'Build',
    type_support: 'Support',
    type_maintenance: 'Maintenance',
    type_bug_fix: 'Bug Fix',
    type_improvement: 'Improvement',
    type_consulting: 'Consulting',
    type_other: 'Other Requirement',

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
    nav_how_it_works: 'செயல்முறை',
    nav_about: 'எங்களைப் பற்றி',
    nav_contact: 'தொடர்புகொள்ள',
    nav_sign_in: 'உள்நுழைக',
    nav_get_started: 'தொடங்குங்கள்',
    nav_post_project: 'புதிய திட்டத்தை பதிவு செய்க',
    nav_dashboard: 'வாடிக்கையாளர் பக்கம்',
    nav_admin_dashboard: 'நிர்வாகப் பக்கம்',
    nav_all_projects: 'அனைத்து திட்டங்கள்',
    nav_profile: 'சுயவிவரம் & அமைப்புகள்',
    nav_sign_out: 'வெளியேறு',
    nav_choose_language: 'மொழியை மாற்றுக',

    // Hero
    hero_badge: 'மேலாண்மை தொழில்நுட்ப சேவை தளம்',
    hero_title_1: 'மென்பொருள் உருவாக்கம்.',
    hero_title_2: 'பராமரிப்பு & ஆதரவு.',
    hero_desc: 'உழைப்பு உங்கள் மென்பொருளை கட்டமைக்க, பிழைகளை நீக்க மற்றும் தொடர்ச்சியாக பராமரிக்க நிபுணத்துவம் வாய்ந்த பிரத்யேக தொழில்நுட்பக் குழுவை வழங்குகிறது. திட்ட தேவைகளை பதிவிடுங்கள், வெளிப்படையான விலைப் பட்டியலைப் பெற்று உடனுக்குடன் தொடங்குங்கள்.',
    hero_cta_post: 'திட்டத்தை பதிவு செய்க — இலவசம்',
    hero_cta_explore: 'எங்கள் சேவைகளை காண்க',
    hero_social_proof: 'நிறுவனங்கள் உழைப்பு மூலம் தங்கள் மென்பொருளை உருவாக்குகின்றன',

    // Stats
    stat_delivered: 'வெற்றிகரமான திட்டங்கள்',
    stat_satisfaction: 'வாடிக்கையாளர் மனநிறைவு',
    stat_specialists: 'தொழில்நுட்ப வல்லுநர்கள்',
    stat_excellence: 'ஆண்டுகள் அனுபவம்',

    // Services
    services_eyebrow: 'எங்கள் சிறப்பம்சங்கள்',
    services_title: 'உங்கள் மென்பொருளுக்கு தேவையான அனைத்து சேவைகளும்',
    services_desc: 'புதிய மென்பொருள் உருவாக்கம் முதல் தொடர் ஆதரவு மற்றும் நவீனமயமாக்கல் வரை — முழு மென்பொருள் தேவைகளையும் உழைப்பு நிறைவேற்றுகிறது.',
    services_get_started: 'தொடங்குங்கள்',

    // Process & How it works
    process_eyebrow: 'செயல்முறை விளக்கம்',
    process_title: 'உழைப்பு தளம் எவ்வாறு செயல்படுகிறது?',
    process_desc: 'தெளிவான, நம்பகமான மற்றும் பாதுகாப்பான 4-படிநிலைகளில் உங்கள் மென்பொருள் திட்டத்தை வெற்றிகரமாக முடிக்கிறோம்.',
    process_step1_title: '1. திட்ட தேவைகளை பதிவு செய்க',
    process_step1_desc: 'உங்கள் மென்பொருள் தேவைகளை விளக்கி, சேவை வகையை தேர்ந்தெடுத்து, பட்ஜெட் மற்றும் குறிப்பு கோப்புகளை பதிவேற்றவும்.',
    process_step2_title: '2. நிபுணர் ஆய்வு & விலைப்புள்ளி',
    process_step2_desc: 'எங்கள் தலைமை மென்பொருள் பொறியாளர் உங்கள் தேவைகளை ஆராய்ந்து, தெளிவான கட்டண விவரங்களை முன்மொழிவார்.',
    process_step3_title: '3. விலைப்புள்ளி ஏற்பு & ஒப்பந்தம்',
    process_step3_desc: 'திட்ட மைல்கற்கள் மற்றும் கட்டணங்களை சரிபார்த்து ஏற்கவும். உடனடி சட்டப்பூர்வ ஒப்பந்தம் உருவாக்கப்படும்.',
    process_step4_title: '4. முன்னேற்ற கண்காணிப்பு & விநியோகம்',
    process_step4_desc: 'மைல்கற்களின் முன்னேற்றத்தை நேரலையாக கண்காணித்து, சரிபார்த்து ஏற்று, பாதுகாப்பாக பணத்தை விடுவிக்கவும்.',
    process_start_btn: 'திட்டத்தை இப்போதே தொடங்குங்கள்',

    // Guarantees
    guarantee_escrow_title: 'பாதுகாப்பான எஸ்க்ரோ முறை',
    guarantee_escrow_desc: 'நீங்கள் ஒவ்வொரு மைல்கல்லையும் ஆய்வு செய்து அங்கீகரித்த பிறகே உங்கள் பணம் விடுவிக்கப்படும். முழு பணப் பாதுகாப்பு உறுதி.',
    guarantee_itemized_title: 'வெளிப்படையான கட்டண விவரம்',
    guarantee_itemized_desc: 'மறைமுக கட்டணங்கள் இல்லை. ஒவ்வொரு மென்பொருள் அம்சம் மற்றும் பணிக்கான தெளிவான விலைப்பட்டியல் வழங்கப்படும்.',
    guarantee_direct_title: 'நேரடி தொடர்பு & உரையாடல்',
    guarantee_direct_desc: 'உங்களுக்கென ஒதுக்கப்பட்ட தலைமை பொறியாளரிடம் உள்ளமைக்கப்பட்ட மெசேஜிங் மூலம் நேரடியாக ஆலோசிக்கலாம்.',
    guarantee_secure_title: 'நம்பகமான பரிவர்த்தனைகள்',
    guarantee_secure_desc: 'முழுமையான பாதுகாப்புடன் கூடிய வங்கி பரிவர்த்தனைகள் மற்றும் உறுதிப்படுத்தப்பட்ட ரசீதுகள்.',

    // Common Types
    type_build: 'புதிய உருவாக்கம்',
    type_support: 'தொழில்நுட்ப ஆதரவு',
    type_maintenance: 'பராமரிப்பு',
    type_bug_fix: 'பிழை திருத்தம்',
    type_improvement: 'மேம்பாடு & நவீனமயமாக்கல்',
    type_consulting: 'கட்டமைப்பு ஆலோசனை',
    type_other: 'தனிப்பயன் தேவைகள்',

    // Testimonials
    testimonials_eyebrow: 'வாடிக்கையாளர் நற்சான்றிதழ்கள்',
    testimonials_title: 'உலகளாவிய வாடிக்கையாளர்களின் நம்பிக்கை',

    // CTA
    cta_title: 'உங்கள் மென்பொருள் திட்டத்திற்கு சிறந்த செயல்முறை தேவை.',
    cta_desc: 'இன்றே உங்கள் திட்டத்தை பதிவு செய்யுங்கள். தொடக்க மதிப்பீடு முதல் இறுதி விநியோகம் வரை உழைப்பு குழு பொறுப்பேற்கும்.',
    cta_btn_free: 'இலவசமாக திட்டத்தை பதிவு செய்க',
    cta_btn_about: 'எங்களைப் பற்றி மேலும் அறிக'
  },
  hi: {
    // Nav
    nav_home: 'होम',
    nav_services: 'सेवाएं',
    nav_how_it_works: 'कार्यप्रणाली',
    nav_about: 'हमारे बारे में',
    nav_contact: 'संपर्क',
    nav_sign_in: 'साइन इन',
    nav_get_started: 'शुरू करें',
    nav_post_project: 'प्रोजेक्ट पोस्ट करें',
    nav_dashboard: 'क्लाइंट डैशबोर्ड',
    nav_admin_dashboard: 'व्यवस्थापक डैशबोर्ड',
    nav_all_projects: 'सभी प्रोजेक्ट्स',
    nav_profile: 'प्रोफाइल और सेटिंग्स',
    nav_sign_out: 'साइन आउट',
    nav_choose_language: 'भाषा चुनें',

    // Hero
    hero_badge: 'प्रबंधित टेक सेवा मंच',
    hero_title_1: 'निर्माण। समर्थन।',
    hero_title_2: 'रखरखाव।',
    hero_desc: 'Uzhaipu आपको समर्पित इंजीनियरिंग टीम से जोड़ता है। प्रोजेक्ट पोस्ट करें, पारदर्शी कोटेशन प्राप्त करें, और सभी माइलस्टोन ट्रैक करें।',
    hero_cta_post: 'प्रोजेक्ट पोस्ट करें — मुफ्त',
    hero_cta_explore: 'सेवाएं देखें',
    hero_social_proof: 'क्लाइंट्स Uzhaipu के साथ निर्माण कर रहे हैं',

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

    // Process & How it works
    process_eyebrow: 'प्रक्रिया',
    process_title: 'Uzhaipu कैसे काम करता है',
    process_desc: 'पारदर्शी, संरचित और भरोसेमंद कार्यप्रणाली।',
    process_step1_title: '1. प्रोजेक्ट पोस्ट करें',
    process_step1_desc: 'आवश्यकताएं बताएं, प्रकार चुनें और बजट तय करें।',
    process_step2_title: '2. विशेषज्ञ समीक्षा',
    process_step2_desc: 'हमारी टीम प्रस्ताव और विस्तृत कोटेशन तैयार करेगी।',
    process_step3_title: '3. कोटेशन स्वीकारें',
    process_step3_desc: 'प्रस्ताव की समीक्षा करें और अनुबंध तुरंत तैयार होगा।',
    process_step4_title: '4. ट्रैक और डिलीवरी',
    process_step4_desc: 'माइलस्टोन ट्रैक करें और सीधे व्यवस्थापक से बात करें।',
    process_start_btn: 'अभी प्रोजेक्ट शुरू करें',

    // Guarantees
    guarantee_escrow_title: 'एस्क्रो सुरक्षा',
    guarantee_escrow_desc: 'माइलस्टोन स्वीकार होने पर ही भुगतान जारी किया जाता है।',
    guarantee_itemized_title: 'पारदर्शी मूल्य',
    guarantee_itemized_desc: 'कोई छिपा हुआ शुल्क नहीं।',
    guarantee_direct_title: 'सीधा संवाद',
    guarantee_direct_desc: 'अपने असाइन किए गए टेक लीड से सीधे बात करें।',
    guarantee_secure_title: 'सुरक्षित लेनदेन',
    guarantee_secure_desc: 'एंटरप्राइज-ग्रेड सुरक्षा।',

    // Common Types
    type_build: 'निर्माण',
    type_support: 'समर्थन',
    type_maintenance: 'रखरखाव',
    type_bug_fix: 'बग फिक्स',
    type_improvement: 'सुधार',
    type_consulting: 'परामर्श',
    type_other: 'अन्य आवश्यकता',

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
    process_step1_title: '1. Publica tu Proyecto',
    process_step1_desc: 'Describe tus requerimientos y presupuesto.',
    process_step2_title: '2. Revisión Experta',
    process_step2_desc: 'Preparamos una cotización detallada.',
    process_step3_title: '3. Acepta la Cotización',
    process_step3_desc: 'Revisa y genera el contrato al instante.',
    process_step4_title: '4. Sigue y Recibe',
    process_step4_desc: 'Supervisa entregables y gestiona pagos.',
    process_start_btn: 'Iniciar Proyecto Ahora',

    // Guarantees
    guarantee_escrow_title: 'Protección Escrow',
    guarantee_escrow_desc: 'Tus pagos se liberan solo tras la aprobación de cada hito.',
    guarantee_itemized_title: 'Precios Desglosados',
    guarantee_itemized_desc: 'Sin tarifas ocultas.',
    guarantee_direct_title: 'Comunicación Directa',
    guarantee_direct_desc: 'Habla directamente con tu Líder Técnico.',
    guarantee_secure_title: 'Transacciones Seguras',
    guarantee_secure_desc: 'Seguridad de nivel empresarial.',

    // Common Types
    type_build: 'Construcción',
    type_support: 'Soporte',
    type_maintenance: 'Mantenimiento',
    type_bug_fix: 'Corrección de Errores',
    type_improvement: 'Mejora',
    type_consulting: 'Consultoría',
    type_other: 'Otro Requerimiento',

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
    process_step1_title: '1. Publiez votre projet',
    process_step1_desc: 'Décrivez vos besoins et votre budget.',
    process_step2_title: '2. Examen expert',
    process_step2_desc: 'Nous préparons un devis détaillé.',
    process_step3_title: '3. Acceptez le devis',
    process_step3_desc: 'Générez votre contrat officiel immédiatement.',
    process_step4_title: '4. Suivi et livraison',
    process_step4_desc: 'Suivez les jalons et échangez directement.',
    process_start_btn: 'Démarrer votre projet',

    // Guarantees
    guarantee_escrow_title: 'Protection Séquestre',
    guarantee_escrow_desc: 'Vos fonds sont libérés uniquement après validation de chaque jalon.',
    guarantee_itemized_title: 'Tarification Détaillée',
    guarantee_itemized_desc: 'Aucun frais caché.',
    guarantee_direct_title: 'Communication Directe',
    guarantee_direct_desc: 'Échangez directement avec votre responsable technique.',
    guarantee_secure_title: 'Transactions Sécurisées',
    guarantee_secure_desc: 'Chiffrement de niveau entreprise.',

    // Common Types
    type_build: 'Développement',
    type_support: 'Support',
    type_maintenance: 'Maintenance',
    type_bug_fix: 'Correction de Bugs',
    type_improvement: 'Amélioration',
    type_consulting: 'Conseil',
    type_other: 'Autre Besoin',

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
    process_step1_title: '1. Projekt einstellen',
    process_step1_desc: 'Anforderungen und Budget definieren.',
    process_step2_title: '2. Experten-Prüfung',
    process_step2_desc: 'Detailliertes Angebot erhalten.',
    process_step3_title: '3. Angebot annehmen',
    process_step3_desc: 'Vertrag sofort automatisch erstellen.',
    process_step4_title: '4. Verfolgen & Liefern',
    process_step4_desc: 'Meilensteine live überwachen.',
    process_start_btn: 'Jetzt Projekt starten',

    // Guarantees
    guarantee_escrow_title: 'Treuhand-Schutz',
    guarantee_escrow_desc: 'Zahlungen werden erst nach Meilenstein-Freigabe freigegeben.',
    guarantee_itemized_title: 'Aufgeschlüsselte Preise',
    guarantee_itemized_desc: 'Keine versteckten Gebühren.',
    guarantee_direct_title: 'Direkte Kommunikation',
    guarantee_direct_desc: 'Direkter Kontakt zum technischen Lead.',
    guarantee_secure_title: 'Sichere Transaktionen',
    guarantee_secure_desc: 'Höchste Sicherheitsstandards.',

    // Common Types
    type_build: 'Entwicklung',
    type_support: 'Support',
    type_maintenance: 'Wartung',
    type_bug_fix: 'Fehlerbehebung',
    type_improvement: 'Verbesserung',
    type_consulting: 'Beratung',
    type_other: 'Sonstige Anforderung',

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
    nav_how_it_works: 'خطوات العمل',
    nav_about: 'من نحن',
    nav_contact: 'اتصل بنا',
    nav_sign_in: 'تسجيل الدخول',
    nav_get_started: 'ابدأ الآن',
    nav_post_project: 'نشر مشروع جديد',
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
    process_step1_title: '1. انشر مشروعك',
    process_step1_desc: 'حدد المتطلبات ونوع الخدمة والميزانية.',
    process_step2_title: '2. مراجعة الخبراء',
    process_step2_desc: 'نعد عرض أسعار تفصيلي للمشروع.',
    process_step3_title: '3. قبول العرض',
    process_step3_desc: 'توليد العقد تلقائياً بعد الموافقة.',
    process_step4_title: '4. المتابعة والاستلام',
    process_step4_desc: 'متابعة مراحل الإنجاز والمحادثة المباشرة.',
    process_start_btn: 'ابدأ مشروعك الآن',

    // Guarantees
    guarantee_escrow_title: 'حماية الدفع (الضمان)',
    guarantee_escrow_desc: 'يتم تحرير الأموال فقط بعد مراجعة وقبول كل مرحلة من مراحل المشروع.',
    guarantee_itemized_title: 'تسعير مفصل',
    guarantee_itemized_desc: 'لا توجد رسوم خفية.',
    guarantee_direct_title: 'تواصل مباشر',
    guarantee_direct_desc: 'تواصل مباشرة مع المشرف التقني على مشروعك.',
    guarantee_secure_title: 'معاملات آمنة',
    guarantee_secure_desc: 'تشفير عالي الأمان لجميع المعاملات.',

    // Common Types
    type_build: 'تطوير',
    type_support: 'دعم فني',
    type_maintenance: 'صيانة',
    type_bug_fix: 'إصلاح الأخطاء',
    type_improvement: 'تحسين وتطوير',
    type_consulting: 'استشارات تقنية',
    type_other: 'متطلبات أخرى',

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
