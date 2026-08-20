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
    cta_btn_about: 'Learn More About Us',

    // Services Page
    services_page_eyebrow: 'Our Services',
    services_page_title: 'Engineering, Support & Modernization',
    services_page_desc: "Explore our tailored service capabilities. Whether you're architecting a new SaaS or fixing an emergency production bug, Uzhaipu delivers.",
    services_engagement_types: 'Common Engagement Types:',
    services_request: 'Request',

    // About Page
    about_eyebrow: 'About Uzhaipu',
    about_title: 'A Managed Approach to Tech Delivery',
    about_desc: 'Traditional freelancing platforms force clients to sift through hundreds of unverified bids, deal with inconsistent code quality, and navigate complex escrow disputes. Uzhaipu changes the equation.',
    about_traditional_title: 'Traditional Bidding Platforms',
    about_traditional_1: 'Hundreds of automated spam bids on every project posting.',
    about_traditional_2: 'No guarantee of code quality, test coverage, or maintainability.',
    about_traditional_3: 'Freelancers ghost or disappear halfway through the project.',
    about_traditional_4: 'Arbitrary disputes with non-technical platform support staff.',
    about_uzhaipu_title: 'The Uzhaipu Standard',
    about_dedicated_mgmt: 'Dedicated Management:',
    about_dedicated_mgmt_desc: 'A single Technical Lead coordinates full execution.',
    about_itemized_proposals: 'Itemized Proposals:',
    about_itemized_proposals_desc: 'Transparent, line-item quotations for every deliverable.',
    about_milestone_escrow: 'Milestone Escrow:',
    about_milestone_escrow_desc: 'Pay only when you review and approve working software.',
    about_full_lifecycle: 'Full Lifecycle:',
    about_full_lifecycle_desc: 'We build, support, and maintain your systems long-term.',
    about_comprehensive: 'Comprehensive Tech Execution',
    about_post_requirement: 'Post Your Requirement Now',

    // Contact Page
    contact_eyebrow: 'Get In Touch',
    contact_title: 'Have a project in mind?',
    contact_desc: 'Reach out to our technical leadership directly. We typically respond within 2-4 business hours.',
    contact_channels: 'Contact Channels',
    contact_channels_desc: 'Connect with our solutions team for technical reviews, RFPs, enterprise support agreements, or architecture consultations.',
    contact_email_us: 'Email Us',
    contact_working_hours: 'Working Hours',
    contact_headquarters: 'Headquarters',
    contact_official_links: 'Official Links',
    contact_send_message: 'Send a Direct Message',
    contact_your_name: 'Your Name',
    contact_email_address: 'Email Address',
    contact_subject: 'Subject',
    contact_message_label: 'Message / Requirements',
    contact_send_btn: 'Send Message',
    contact_success: 'Thank you! Your message has been sent. We will respond shortly.',
    contact_error: 'Failed to submit contact message. Please try again.',

    // HowItWorks step details
    hiw_step1_d1: 'Select service category: Build, Support, Maintenance, Bug Fix, Improvement, Consulting, or Other',
    hiw_step1_d2: 'Specify your expected timeline and preferred budget range',
    hiw_step1_d3: 'Attach specification documents, wireframes, or architecture files safely',
    hiw_step1_d4: 'No public bidding spam — only our verified Technical Leads will review',
    hiw_step2_d1: 'Dedicated technical manager analyzes your tech stack and deliverables',
    hiw_step2_d2: 'Direct project messaging available for real-time clarification',
    hiw_step2_d3: 'Receive an official line-item quotation with exact pricing and milestones',
    hiw_step2_d4: 'Transparent tax, timeline, and scope breakdown before you commit',
    hiw_step3_d1: 'Review transparent deliverables and milestone payment schedule',
    hiw_step3_d2: 'Accept the quotation with a single click',
    hiw_step3_d3: 'Formal legally binding digital contract generated automatically',
    hiw_step3_d4: 'Direct connection to milestone escrow protection',
    hiw_step4_d1: 'Live milestone progress tracking and task checklist updates',
    hiw_step4_d2: 'Direct messaging with your Tech Lead for feedback and review',
    hiw_step4_d3: 'Milestone deliverables review before funds release',
    hiw_step4_d4: 'Leave a verified review upon final completion',
    hiw_guarantees_title: 'Built-In Client Guarantees',
    hiw_guarantees_desc: 'Every project executed through Uzhaipu includes structural security, quality controls, and financial protection.',
    hiw_step: 'Step',

    // Home Page remaining
    home_tech_we_master: 'Technologies We Master',
    home_escrow_title: 'Escrow-Protected Payments',
    home_escrow_desc: 'Client funds held safely in escrow, released only upon milestone sign-off. Zero risk.',
    home_itemized_title: 'Itemized Quotations',
    home_itemized_desc: 'Line-by-line proposals with transparent pricing. No vague bulk totals. Accept or negotiate.',
    home_tracking_title: 'Real-Time Tracking',
    home_tracking_desc: 'Live milestone progress bars, task checklists, and direct admin messaging — 24/7.',
    home_no_hidden_fees: '✓ No hidden fees',
    home_escrow_protected: '✓ Escrow-protected',
    home_direct_chat: '✓ Direct admin chat',
    home_milestone_based: '✓ Milestone-based',

    // Login Page
    login_enterprise_title: 'Enterprise Tech Delivery.',
    login_enterprise_desc: 'Log in to manage active software projects, review proposals, approve milestones, and communicate directly with technical management.',
    login_demo_access: 'Quick Demo Access:',
    login_demo_admin: 'Demo Admin',
    login_demo_client: 'Demo Client',
    login_welcome: 'Welcome back',
    login_subtitle: 'Please enter your account credentials to continue',
    login_email: 'Email Address',
    login_password: 'Password',
    login_forgot: 'Forgot password?',
    login_btn: 'Sign In to Uzhaipu',
    login_no_account: "Don't have an account yet?",
    login_create_account: 'Create Client Account',

    // Register Page
    reg_title: 'Start Your Project with Uzhaipu.',
    reg_desc: 'Create a free Client account to post requirements, get detailed quotations, track development milestones, and collaborate seamlessly with our technical execution leads.',
    reg_feature1: 'Dedicated Technical Lead Assignment',
    reg_feature2: 'Transparent Line-Item Quotations',
    reg_feature3: '100% Escrow Milestone Protection',
    reg_form_title: 'Create Client Account',
    reg_form_desc: 'Join Uzhaipu to post projects and receive quotes',
    reg_full_name: 'Full Name',
    reg_email: 'Email Address',
    reg_country: 'Choose your country or region',
    reg_password: 'Password',
    reg_confirm_password: 'Confirm Password',
    reg_agree: 'I agree to the',
    reg_terms: 'Terms of Service',
    reg_and: 'and',
    reg_privacy: 'Privacy Policy',
    reg_btn: 'Create Account',
    reg_has_account: 'Already have an account?',
    reg_sign_in: 'Sign In',
    reg_pwd_mismatch: 'Passwords do not match.',
    reg_pwd_length: 'Password must be at least 6 characters long.',
    reg_agree_required: 'You must agree to the Terms of Service & Privacy Policy.',
    reg_failed: 'Registration failed. Please try again.',

    // Forgot Password
    fp_back: 'Back to Sign In',
    fp_title: 'Reset your password',
    fp_desc: 'Enter your account email and we will send password reset instructions.',
    fp_email: 'Email Address',
    fp_btn: 'Send Reset Link',
    fp_success: 'Password reset link has been dispatched to your email address. Please check your inbox and spam folder.',
    fp_reset_complete: 'Password Reset Complete',
    fp_reset_desc: 'Your password has been successfully updated. You may now sign in with your new credentials.',
    fp_sign_in_now: 'Sign In Now',
    fp_email_verified: 'Email Verified',
    fp_email_verified_desc: 'Your email address has been verified. Welcome to the Uzhaipu platform!',
    fp_go_dashboard: 'Go to Dashboard',

    // Dashboard
    dash_workspace: 'Client Workspace',
    dash_greeting: 'Good day,',
    dash_desc: 'Track your ongoing builds, review official quotations, and manage milestone delivery directly with Uzhaipu technical leadership.',
    dash_post_project: 'Post a Project',
    dash_active: 'Active Projects',
    dash_completed: 'Completed Projects',
    dash_pending_quotes: 'Pending Quotations',
    dash_total_invested: 'Total Invested',
    dash_quote_alert_title: 'new quotation(s) ready for review!',
    dash_quote_alert_desc: 'Review the line-item deliverables and pricing to accept and initiate development.',
    dash_review_quote: 'Review Quote',
    dash_my_projects: 'My Active Projects',
    dash_view_all: 'View all projects',
    dash_no_projects: 'No projects posted yet',
    dash_no_projects_desc: 'Ready to build something great? Post your technical requirements to receive a comprehensive proposal.',
    dash_post_first: 'Post Your First Project',
    dash_quick_actions: 'Quick Actions',
    dash_post_new: 'Post a New Request',
    dash_view_quotations: 'View Quotations',
    dash_contact_admin: 'Contact Tech Admin',
    dash_activity: 'Platform Activity Stream',
    dash_project_label: 'Project',
    dash_current_status: 'Current Status:',
    dash_loading: 'Loading your projects...',

    // Sidebar
    sidebar_portal: 'Client Portal',
    sidebar_dashboard: 'Dashboard',
    sidebar_post_project: 'Post a Project',
    sidebar_my_projects: 'My Projects',
    sidebar_quotations: 'Quotations',
    sidebar_milestones: 'Milestones',
    sidebar_payments: 'Payments',
    sidebar_messages: 'Messages',
    sidebar_reviews: 'Reviews',
    sidebar_profile: 'Profile',
    sidebar_settings: 'Settings',
    sidebar_need_help: 'Need Assistance?',
    sidebar_help_desc: 'Direct 1-on-1 support with our technical architect team.',
    sidebar_contact_support: 'Contact Support →',

    // Admin Sidebar
    admin_control_center: 'Admin Control Center',
    admin_operations: 'Operations',
    admin_management: 'Management',
    admin_platform_config: 'Platform Config',
    admin_sidebar_dashboard: 'Dashboard',
    admin_sidebar_projects: 'Projects & Requests',
    admin_sidebar_quotations: 'Quotations',
    admin_sidebar_milestones: 'Milestones',
    admin_sidebar_payments: 'Payments & Revenue',
    admin_sidebar_messages: 'Messages',
    admin_sidebar_users: 'Users & Clients',
    admin_sidebar_reviews: 'Reviews',
    admin_sidebar_contact: 'Contact Inquiries',
    admin_sidebar_reports: 'Reports & Analytics',
    admin_sidebar_categories: 'Categories',
    admin_sidebar_skills: 'Skills & Tech',
    admin_sidebar_countries: 'Countries',
    admin_sidebar_settings: 'Settings',

    // ProjectCard
    card_progress: 'Progress',
    card_custom: 'Custom',
    card_view_details: 'View Details',
    card_manage: 'Manage',

    // Project type details
    ptype_build_tag: 'Greenfield & Core Apps',
    ptype_build_desc: 'New websites, mobile applications, ERP systems, SaaS platforms, and custom software engineered from the ground up.',
    ptype_support_tag: '24/7 Reliability',
    ptype_support_desc: 'Dedicated technical, server, database, and application level support to keep your operations rock solid.',
    ptype_maintenance_tag: 'Stability & Security',
    ptype_maintenance_desc: 'Monthly application updates, server maintenance, database vacuuming, dependency patching, and security audits.',
    ptype_bug_fix_tag: 'Rapid Diagnostics',
    ptype_bug_fix_desc: 'Fast-response troubleshooting and resolution for React bugs, Node.js errors, production crashes, and API failures.',
    ptype_improvement_tag: 'Modernize & Scale',
    ptype_improvement_desc: 'Add new features, overhaul UI/UX, optimize database queries, improve Lighthouse performance, and refactor legacy code.',
    ptype_consulting_tag: 'Strategic Architecture',
    ptype_consulting_desc: 'Software architecture reviews, cloud migration strategies, tech stack selection, database design, and scalability planning.',
    ptype_other_tag: 'Custom Solutions',
    ptype_other_desc: 'Have a unique technical challenge or specialized pipeline requirement? Tell us what you need and we will structure a custom roadmap.'
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
    cta_btn_about: 'எங்களைப் பற்றி மேலும் அறிக',

    // Services Page
    services_page_eyebrow: 'எங்கள் சேவைகள்',
    services_page_title: 'பொறியியல், ஆதரவு & நவீனமயமாக்கல்',
    services_page_desc: 'எங்கள் தனிப்பயன் சேவைகளை ஆராயுங்கள். புதிய SaaS உருவாக்கம் முதல் அவசர பிழை திருத்தம் வரை — உழைப்பு அனைத்தையும் வழங்குகிறது.',
    services_engagement_types: 'பொதுவான ஈடுபாடு வகைகள்:',
    services_request: 'கோரிக்கை',

    // About Page
    about_eyebrow: 'உழைப்பு பற்றி',
    about_title: 'தொழில்நுட்ப விநியோகத்திற்கான மேலாண்மை அணுகுமுறை',
    about_desc: 'பாரம்பரிய ஃப்ரீலான்சிங் தளங்கள் சரிபார்க்கப்படாத ஏலங்களை கையாள கட்டாயப்படுத்துகின்றன. உழைப்பு இந்த சமன்பாட்டை மாற்றுகிறது.',
    about_traditional_title: 'பாரம்பரிய ஏல தளங்கள்',
    about_traditional_1: 'ஒவ்வொரு திட்ட பதிவிலும் நூற்றுக்கணக்கான தானியங்கி ஸ்பேம் ஏலங்கள்.',
    about_traditional_2: 'குறியீட்டு தரம், சோதனை அல்லது பராமரிப்புக்கு உத்தரவாதம் இல்லை.',
    about_traditional_3: 'ஃப்ரீலான்சர்கள் திட்டத்தின் நடுவில் மறைந்துவிடுகிறார்கள்.',
    about_traditional_4: 'தொழில்நுட்பமற்ற ஆதரவு ஊழியர்களுடன் தர்க்கங்கள்.',
    about_uzhaipu_title: 'உழைப்பு தரநிலை',
    about_dedicated_mgmt: 'பிரத்யேக மேலாண்மை:',
    about_dedicated_mgmt_desc: 'ஒரு தொழில்நுட்ப தலைவர் முழு செயல்பாட்டையும் ஒருங்கிணைக்கிறார்.',
    about_itemized_proposals: 'விரிவான விலைப்புள்ளிகள்:',
    about_itemized_proposals_desc: 'ஒவ்வொரு வழங்கலுக்கும் வெளிப்படையான வரிவாரியான விலைப்புள்ளிகள்.',
    about_milestone_escrow: 'மைல்கல் எஸ்க்ரோ:',
    about_milestone_escrow_desc: 'செயல்படும் மென்பொருளை ஆய்வு செய்து ஏற்கும்போது மட்டுமே பணம் செலுத்தவும்.',
    about_full_lifecycle: 'முழு வாழ்க்கைச்சுழற்சி:',
    about_full_lifecycle_desc: 'உங்கள் அமைப்புகளை நீண்டகாலமாக கட்டமைத்து, ஆதரித்து, பராமரிக்கிறோம்.',
    about_comprehensive: 'விரிவான தொழில்நுட்ப செயல்படுத்துதல்',
    about_post_requirement: 'உங்கள் தேவையை இப்போதே பதிவு செய்க',

    // Contact Page
    contact_eyebrow: 'தொடர்புகொள்ளுங்கள்',
    contact_title: 'ஒரு திட்டம் மனதில் உள்ளதா?',
    contact_desc: 'எங்கள் தொழில்நுட்ப தலைமையை நேரடியாக தொடர்புகொள்ளுங்கள். 2-4 வணிக மணிநேரத்திற்குள் பதிலளிப்போம்.',
    contact_channels: 'தொடர்பு வழிகள்',
    contact_channels_desc: 'தொழில்நுட்ப ஆய்வுகள், நிறுவன ஆதரவு ஒப்பந்தங்கள் அல்லது கட்டமைப்பு ஆலோசனைகளுக்கு எங்கள் குழுவை தொடர்புகொள்ளுங்கள்.',
    contact_email_us: 'மின்னஞ்சல் அனுப்புங்கள்',
    contact_working_hours: 'வேலை நேரம்',
    contact_headquarters: 'தலைமையகம்',
    contact_official_links: 'அதிகாரப்பூர்வ இணைப்புகள்',
    contact_send_message: 'நேரடி செய்தி அனுப்புங்கள்',
    contact_your_name: 'உங்கள் பெயர்',
    contact_email_address: 'மின்னஞ்சல் முகவரி',
    contact_subject: 'பொருள்',
    contact_message_label: 'செய்தி / தேவைகள்',
    contact_send_btn: 'செய்தி அனுப்பு',
    contact_success: 'நன்றி! உங்கள் செய்தி அனுப்பப்பட்டது. விரைவில் பதிலளிப்போம்.',
    contact_error: 'செய்தி சமர்ப்பிக்க முடியவில்லை. மீண்டும் முயற்சிக்கவும்.',

    // HowItWorks step details
    hiw_step1_d1: 'சேவை வகையை தேர்ந்தெடுக்கவும்: உருவாக்கம், ஆதரவு, பராமரிப்பு, பிழை திருத்தம், மேம்பாடு, ஆலோசனை அல்லது பிற',
    hiw_step1_d2: 'எதிர்பார்க்கும் காலக்கெடு மற்றும் விருப்பமான பட்ஜெட் வரம்பை குறிப்பிடவும்',
    hiw_step1_d3: 'விவரக்குறிப்பு ஆவணங்கள், வயர்ஃபிரேம்கள் அல்லது கோப்புகளை பாதுகாப்பாக இணைக்கவும்',
    hiw_step1_d4: 'பொது ஏல ஸ்பேம் இல்லை — எங்கள் சரிபார்க்கப்பட்ட தொழில்நுட்ப தலைவர்கள் மட்டுமே ஆய்வு செய்வார்கள்',
    hiw_step2_d1: 'பிரத்யேக தொழில்நுட்ப மேலாளர் உங்கள் தொழில்நுட்ப அடுக்கையும் வழங்கல்களையும் பகுப்பாய்வு செய்கிறார்',
    hiw_step2_d2: 'நிகழ்நேர விளக்கத்திற்கு நேரடி திட்ட செய்தியிடல் கிடைக்கும்',
    hiw_step2_d3: 'துல்லியமான விலை மற்றும் மைல்கற்களுடன் அதிகாரப்பூர்வ விலைப்புள்ளியை பெறுங்கள்',
    hiw_step2_d4: 'நீங்கள் உறுதிப்படுத்தும் முன் வெளிப்படையான வரி, காலக்கெடு மற்றும் நோக்க விவரம்',
    hiw_step3_d1: 'வெளிப்படையான வழங்கல்கள் மற்றும் மைல்கல் கட்டண அட்டவணையை ஆய்வு செய்யுங்கள்',
    hiw_step3_d2: 'ஒரே கிளிக்கில் விலைப்புள்ளியை ஏற்கவும்',
    hiw_step3_d3: 'அதிகாரப்பூர்வ சட்டப்பூர்வ டிஜிட்டல் ஒப்பந்தம் தானாக உருவாக்கப்படும்',
    hiw_step3_d4: 'மைல்கல் எஸ்க்ரோ பாதுகாப்புடன் நேரடி இணைப்பு',
    hiw_step4_d1: 'நிகழ்நேர மைல்கல் முன்னேற்ற கண்காணிப்பு மற்றும் பணி சரிபார்ப்பு புதுப்பிப்புகள்',
    hiw_step4_d2: 'கருத்து மற்றும் ஆய்வுக்கான உங்கள் தொழில்நுட்ப தலைவருடன் நேரடி செய்தியிடல்',
    hiw_step4_d3: 'நிதி விடுவிக்கும் முன் மைல்கல் வழங்கல் ஆய்வு',
    hiw_step4_d4: 'இறுதி முடிவின் போது சரிபார்க்கப்பட்ட மதிப்புரையை வழங்கவும்',
    hiw_guarantees_title: 'உள்ளமைக்கப்பட்ட வாடிக்கையாளர் உத்தரவாதங்கள்',
    hiw_guarantees_desc: 'உழைப்பு வழியாக செயல்படுத்தப்படும் ஒவ்வொரு திட்டத்திலும் கட்டமைப்பு பாதுகாப்பு, தர கட்டுப்பாடுகள் மற்றும் நிதி பாதுகாப்பு அடங்கும்.',
    hiw_step: 'படி',

    // Home Page remaining
    home_tech_we_master: 'நாங்கள் கைகொண்ட தொழில்நுட்பங்கள்',
    home_escrow_title: 'எஸ்க்ரோ பாதுகாப்பு கொடுப்பனவுகள்',
    home_escrow_desc: 'மைல்கல் ஒப்புதலின் போது மட்டுமே வாடிக்கையாளர் நிதி விடுவிக்கப்படும். பூஜ்ஜிய ஆபத்து.',
    home_itemized_title: 'வரிவாரியான விலைப்புள்ளிகள்',
    home_itemized_desc: 'வெளிப்படையான விலையுடன் வரிவாரியான முன்மொழிவுகள். தெளிவற்ற மொத்தங்கள் இல்லை.',
    home_tracking_title: 'நிகழ்நேர கண்காணிப்பு',
    home_tracking_desc: 'நிகழ்நேர மைல்கல் முன்னேற்றம், பணி சரிபார்ப்புகள் மற்றும் நேரடி நிர்வாக செய்தியிடல் — 24/7.',
    home_no_hidden_fees: '✓ மறைமுக கட்டணம் இல்லை',
    home_escrow_protected: '✓ எஸ்க்ரோ பாதுகாப்பு',
    home_direct_chat: '✓ நேரடி நிர்வாக உரையாடல்',
    home_milestone_based: '✓ மைல்கல் அடிப்படை',

    // Login Page
    login_enterprise_title: 'நிறுவன தொழில்நுட்ப விநியோகம்.',
    login_enterprise_desc: 'செயலில் உள்ள மென்பொருள் திட்டங்களை நிர்வகிக்க, முன்மொழிவுகளை ஆய்வு செய்ய, மைல்கற்களை ஒப்புக்கொள்ள உள்நுழையவும்.',
    login_demo_access: 'விரைவு டெமோ அணுகல்:',
    login_demo_admin: 'டெமோ நிர்வாகி',
    login_demo_client: 'டெமோ வாடிக்கையாளர்',
    login_welcome: 'மீண்டும் வரவேற்கிறோம்',
    login_subtitle: 'தொடர உங்கள் கணக்கு சான்றுகளை உள்ளிடவும்',
    login_email: 'மின்னஞ்சல் முகவரி',
    login_password: 'கடவுச்சொல்',
    login_forgot: 'கடவுச்சொல் மறந்துவிட்டதா?',
    login_btn: 'உழைப்பு-க்கு உள்நுழைக',
    login_no_account: 'இன்னும் கணக்கு இல்லையா?',
    login_create_account: 'வாடிக்கையாளர் கணக்கை உருவாக்குக',

    // Register Page
    reg_title: 'உழைப்புடன் உங்கள் திட்டத்தைத் தொடங்குங்கள்.',
    reg_desc: 'தேவைகளை பதிவிட, விரிவான விலைப்புள்ளிகளைப் பெற, மைல்கற்களை கண்காணிக்க இலவச வாடிக்கையாளர் கணக்கை உருவாக்கவும்.',
    reg_feature1: 'பிரத்யேக தொழில்நுட்ப தலைவர் நியமனம்',
    reg_feature2: 'வெளிப்படையான வரிவாரியான விலைப்புள்ளிகள்',
    reg_feature3: '100% எஸ்க்ரோ மைல்கல் பாதுகாப்பு',
    reg_form_title: 'வாடிக்கையாளர் கணக்கை உருவாக்குக',
    reg_form_desc: 'திட்டங்களை பதிவிட மற்றும் விலைப்புள்ளிகளைப் பெற உழைப்பு-வில் சேருங்கள்',
    reg_full_name: 'முழு பெயர்',
    reg_email: 'மின்னஞ்சல் முகவரி',
    reg_country: 'உங்கள் நாடு அல்லது பிராந்தியத்தைத் தேர்ந்தெடுக்கவும்',
    reg_password: 'கடவுச்சொல்',
    reg_confirm_password: 'கடவுச்சொல்லை உறுதிப்படுத்துக',
    reg_agree: 'நான் ஏற்றுக்கொள்கிறேன்',
    reg_terms: 'சேவை விதிமுறைகள்',
    reg_and: 'மற்றும்',
    reg_privacy: 'தனியுரிமைக் கொள்கை',
    reg_btn: 'கணக்கை உருவாக்குக',
    reg_has_account: 'ஏற்கனவே கணக்கு உள்ளதா?',
    reg_sign_in: 'உள்நுழைக',
    reg_pwd_mismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை.',
    reg_pwd_length: 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் நீளமாக இருக்க வேண்டும்.',
    reg_agree_required: 'சேவை விதிமுறைகள் & தனியுரிமைக் கொள்கையை ஏற்க வேண்டும்.',
    reg_failed: 'பதிவு தோல்வியடைந்தது. மீண்டும் முயற்சிக்கவும்.',

    // Forgot Password
    fp_back: 'உள்நுழைவுக்கு திரும்புக',
    fp_title: 'கடவுச்சொல்லை மீட்டமைக்கவும்',
    fp_desc: 'உங்கள் கணக்கு மின்னஞ்சலை உள்ளிடவும், கடவுச்சொல் மீட்டமைப்பு வழிமுறைகளை அனுப்புவோம்.',
    fp_email: 'மின்னஞ்சல் முகவரி',
    fp_btn: 'மீட்டமைப்பு இணைப்பை அனுப்பு',
    fp_success: 'கடவுச்சொல் மீட்டமைப்பு இணைப்பு உங்கள் மின்னஞ்சலுக்கு அனுப்பப்பட்டது. உங்கள் இன்பாக்ஸ் மற்றும் ஸ்பேம் கோப்புறையை சரிபார்க்கவும்.',
    fp_reset_complete: 'கடவுச்சொல் மீட்டமைப்பு முடிந்தது',
    fp_reset_desc: 'உங்கள் கடவுச்சொல் வெற்றிகரமாக புதுப்பிக்கப்பட்டது. இப்போது புதிய சான்றுகளுடன் உள்நுழையலாம்.',
    fp_sign_in_now: 'இப்போது உள்நுழைக',
    fp_email_verified: 'மின்னஞ்சல் சரிபார்க்கப்பட்டது',
    fp_email_verified_desc: 'உங்கள் மின்னஞ்சல் முகவரி சரிபார்க்கப்பட்டது. உழைப்பு தளத்திற்கு வரவேற்கிறோம்!',
    fp_go_dashboard: 'டாஷ்போர்டுக்கு செல்க',

    // Dashboard
    dash_workspace: 'வாடிக்கையாளர் பணியிடம்',
    dash_greeting: 'வணக்கம்,',
    dash_desc: 'உங்கள் நடப்பு திட்டங்களை கண்காணியுங்கள், அதிகாரப்பூர்வ விலைப்புள்ளிகளை ஆய்வு செய்யுங்கள், உழைப்பு தொழில்நுட்ப தலைமையுடன் மைல்கல் விநியோகத்தை நிர்வகிக்கவும்.',
    dash_post_project: 'திட்டத்தை பதிவு செய்க',
    dash_active: 'செயலில் உள்ள திட்டங்கள்',
    dash_completed: 'முடிக்கப்பட்ட திட்டங்கள்',
    dash_pending_quotes: 'நிலுவையில் உள்ள விலைப்புள்ளிகள்',
    dash_total_invested: 'மொத்த முதலீடு',
    dash_quote_alert_title: 'புதிய விலைப்புள்ளி(கள்) ஆய்வுக்கு தயாராக உள்ளன!',
    dash_quote_alert_desc: 'வழங்கல்கள் மற்றும் விலையை ஆய்வு செய்து, ஏற்று, வளர்ச்சியைத் தொடங்கவும்.',
    dash_review_quote: 'விலைப்புள்ளியை ஆய்வு செய்க',
    dash_my_projects: 'எனது செயலில் உள்ள திட்டங்கள்',
    dash_view_all: 'அனைத்து திட்டங்களையும் காண்க',
    dash_no_projects: 'இன்னும் திட்டங்கள் பதிவிடப்படவில்லை',
    dash_no_projects_desc: 'சிறந்ததை உருவாக்க தயாரா? விரிவான முன்மொழிவைப் பெற உங்கள் தொழில்நுட்ப தேவைகளை பதிவிடுங்கள்.',
    dash_post_first: 'முதல் திட்டத்தை பதிவு செய்க',
    dash_quick_actions: 'விரைவு செயல்கள்',
    dash_post_new: 'புதிய கோரிக்கையை பதிவு செய்க',
    dash_view_quotations: 'விலைப்புள்ளிகளை காண்க',
    dash_contact_admin: 'தொழில்நுட்ப நிர்வாகியை தொடர்புகொள்க',
    dash_activity: 'தள செயல்பாட்டு ஸ்ட்ரீம்',
    dash_project_label: 'திட்டம்',
    dash_current_status: 'தற்போதைய நிலை:',
    dash_loading: 'உங்கள் திட்டங்கள் ஏற்றப்படுகின்றன...',

    // Sidebar
    sidebar_portal: 'வாடிக்கையாளர் போர்ட்டல்',
    sidebar_dashboard: 'டாஷ்போர்டு',
    sidebar_post_project: 'திட்டத்தை பதிவு செய்க',
    sidebar_my_projects: 'எனது திட்டங்கள்',
    sidebar_quotations: 'விலைப்புள்ளிகள்',
    sidebar_milestones: 'மைல்கற்கள்',
    sidebar_payments: 'கொடுப்பனவுகள்',
    sidebar_messages: 'செய்திகள்',
    sidebar_reviews: 'மதிப்புரைகள்',
    sidebar_profile: 'சுயவிவரம்',
    sidebar_settings: 'அமைப்புகள்',
    sidebar_need_help: 'உதவி தேவையா?',
    sidebar_help_desc: 'எங்கள் தொழில்நுட்ப கட்டமைப்பு குழுவுடன் நேரடி 1-க்கு-1 ஆதரவு.',
    sidebar_contact_support: 'ஆதரவை தொடர்புகொள்க →',

    // Admin Sidebar
    admin_control_center: 'நிர்வாக கட்டுப்பாட்டு மையம்',
    admin_operations: 'செயல்பாடுகள்',
    admin_management: 'மேலாண்மை',
    admin_platform_config: 'தள அமைப்புகள்',
    admin_sidebar_dashboard: 'டாஷ்போர்டு',
    admin_sidebar_projects: 'திட்டங்கள் & கோரிக்கைகள்',
    admin_sidebar_quotations: 'விலைப்புள்ளிகள்',
    admin_sidebar_milestones: 'மைல்கற்கள்',
    admin_sidebar_payments: 'கொடுப்பனவுகள் & வருவாய்',
    admin_sidebar_messages: 'செய்திகள்',
    admin_sidebar_users: 'பயனர்கள் & வாடிக்கையாளர்கள்',
    admin_sidebar_reviews: 'மதிப்புரைகள்',
    admin_sidebar_contact: 'தொடர்பு விசாரணைகள்',
    admin_sidebar_reports: 'அறிக்கைகள் & பகுப்பாய்வு',
    admin_sidebar_categories: 'வகைகள்',
    admin_sidebar_skills: 'திறன்கள் & தொழில்நுட்பம்',
    admin_sidebar_countries: 'நாடுகள்',
    admin_sidebar_settings: 'அமைப்புகள்',

    // ProjectCard
    card_progress: 'முன்னேற்றம்',
    card_custom: 'தனிப்பயன்',
    card_view_details: 'விவரங்களை காண்க',
    card_manage: 'நிர்வகி',

    // Project type details
    ptype_build_tag: 'புதிய & முக்கிய பயன்பாடுகள்',
    ptype_build_desc: 'புதிய வலைத்தளங்கள், மொபைல் பயன்பாடுகள், ERP அமைப்புகள், SaaS தளங்கள் மற்றும் தனிப்பயன் மென்பொருள் உருவாக்கம்.',
    ptype_support_tag: '24/7 நம்பகத்தன்மை',
    ptype_support_desc: 'உங்கள் செயல்பாடுகளை உறுதியாக வைக்க பிரத்யேக தொழில்நுட்ப, சர்வர், தரவுத்தள மற்றும் பயன்பாட்டு நிலை ஆதரவு.',
    ptype_maintenance_tag: 'நிலைத்தன்மை & பாதுகாப்பு',
    ptype_maintenance_desc: 'மாதாந்திர பயன்பாட்டு புதுப்பிப்புகள், சர்வர் பராமரிப்பு, தரவுத்தள சுத்தப்படுத்துதல் மற்றும் பாதுகாப்பு தணிக்கைகள்.',
    ptype_bug_fix_tag: 'விரைவான கண்டறிதல்',
    ptype_bug_fix_desc: 'React பிழைகள், Node.js பிழைகள், உற்பத்தி செயலிழப்புகள் மற்றும் API தோல்விகளுக்கான விரைவான சரிசெய்தல்.',
    ptype_improvement_tag: 'நவீனமயமாக்கல் & அளவிடுதல்',
    ptype_improvement_desc: 'புதிய அம்சங்களை சேர்த்தல், UI/UX மேம்படுத்துதல், தரவுத்தள வினவல்களை மேம்படுத்துதல் மற்றும் மரபு குறியீட்டை மறுசீரமைத்தல்.',
    ptype_consulting_tag: 'மூலோபாய கட்டமைப்பு',
    ptype_consulting_desc: 'மென்பொருள் கட்டமைப்பு ஆய்வுகள், கிளவுட் இடம்பெயர்வு உத்திகள், தொழில்நுட்ப தேர்வு மற்றும் அளவிடுதல் திட்டமிடல்.',
    ptype_other_tag: 'தனிப்பயன் தீர்வுகள்',
    ptype_other_desc: 'தனித்துவமான தொழில்நுட்ப சவால் உள்ளதா? உங்களுக்கு என்ன தேவை என்று சொல்லுங்கள், தனிப்பயன் திட்டவரைவை உருவாக்குவோம்.'
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
