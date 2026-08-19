export const siteConfig = {
  name: "Uzhaipu",
  tagline: "Build. Support. Maintain.",
  heroHeading: "Your project. Our expertise.",
  description: "Enterprise-grade managed tech services and project execution platform. Submit your requirements, receive transparent itemized proposals, and track milestone-based delivery with a dedicated team.",
  logoPath: "/logo.png",
  apiBaseUrl: "http://localhost:5000/api",
  storageBaseUrl: "http://localhost:5000/uploads",
  contact: {
    email: "contact@uzhaipu.dev",
    supportEmail: "support@uzhaipu.dev",
    phone: "+1 (800) 555-WORK",
    address: "100 Tech Hub Blvd, Suite 400, San Francisco, CA 94107",
    hours: "Mon - Fri, 9:00 AM - 6:00 PM UTC",
    linkedin: "https://linkedin.com/company/uzhaipu",
    github: "https://github.com/uzhaipu",
    twitter: "https://twitter.com/uzhaipu_dev"
  },
  projectTypes: [
    {
      id: "build",
      title: "Build",
      tag: "Greenfield & Core Apps",
      description: "New websites, mobile applications, ERP systems, SaaS platforms, and custom software engineered from the ground up.",
      examples: ["New Website", "Mobile Application", "SaaS Platform", "ERP System", "E-Commerce Platform", "Custom Software"],
      icon: "Code2",
      color: "from-blue-600 to-indigo-600"
    },
    {
      id: "support",
      title: "Support",
      tag: "24/7 Reliability",
      description: "Dedicated technical, server, database, and application level support to keep your operations rock solid.",
      examples: ["App Support", "Server Support", "Database Support", "24/7 Support", "Production Escalation"],
      icon: "Headphones",
      color: "from-cyan-600 to-blue-600"
    },
    {
      id: "maintenance",
      title: "Maintenance",
      tag: "Stability & Security",
      description: "Monthly application updates, server maintenance, database vacuuming, dependency patching, and security audits.",
      examples: ["Website Upkeep", "Security Updates", "DB Maintenance", "Server Tuning", "Monthly Retainer"],
      icon: "Wrench",
      color: "from-emerald-600 to-teal-600"
    },
    {
      id: "bug_fix",
      title: "Bug Fix",
      tag: "Rapid Diagnostics",
      description: "Fast-response troubleshooting and resolution for React bugs, Node.js errors, production crashes, and API failures.",
      examples: ["React Bugs", "Node.js Errors", "DB Issues", "API Failures", "High Memory Leaks"],
      icon: "Bug",
      color: "from-rose-600 to-red-600"
    },
    {
      id: "improvement",
      title: "Improvement",
      tag: "Modernize & Scale",
      description: "Add new features, overhaul UI/UX, optimize database queries, improve Lighthouse performance, and refactor legacy code.",
      examples: ["New Features", "UI Upgrade", "Performance", "System Upgrade", "Refactoring"],
      icon: "TrendingUp",
      color: "from-amber-600 to-orange-600"
    },
    {
      id: "consulting",
      title: "Consulting",
      tag: "Strategic Architecture",
      description: "Software architecture reviews, cloud migration strategies, tech stack selection, database design, and scalability planning.",
      examples: ["Architecture", "Cloud Strategy", "Tech Selection", "DB Design", "Security Review"],
      icon: "Compass",
      color: "from-purple-600 to-pink-600"
    },
    {
      id: "other",
      title: "Other Requirement",
      tag: "Custom Solutions",
      description: "Have a unique technical challenge or specialized pipeline requirement? Tell us what you need and we will structure a custom roadmap.",
      examples: ["Custom Hardware/IoT", "AI/ML Pipelines", "Blockchain/Smart Contracts", "Data Engineering"],
      icon: "Sparkles",
      color: "from-violet-600 to-indigo-600"
    }
  ]
};
