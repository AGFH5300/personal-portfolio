export type ClubHistory = {
  schoolYear: string;
  role: string;
};

export type ClubHighlight = {
  name: string;
  role: string;
  history: ClubHistory[];
  responsibilities: string[];
  url?: string;
  logo?: string;
};

export type ProjectHighlight = {
  name: string;
  description: string;
  url?: string;
  image?: string;
  achievement?: string;
};

const standardTechnologyResponsibilities = [
  "Create and maintain the main website.",
  "Oversee technical aspects on the day of the event.",
];

export const clubHighlights: ClubHighlight[] = [
  {
    name: "Enterprise and Entrepreneurship",
    role: "Head",
    history: [{ schoolYear: "2022-23", role: "Head" }],
    responsibilities: [
      "Create entrepreneurial events for school students.",
      "Manage leadership roles across school events.",
    ],
    logo: "https://i.postimg.cc/wj2XcBPS/winchester-logo.png",
  },
  {
    name: "DIAconomics Club",
    role: "Deputy Head of Media",
    history: [{ schoolYear: "2025-26", role: "Deputy Head of Media" }],
    responsibilities: [
      "Manage the club's media presence and content creation.",
      "Create promotional materials for club events.",
    ],
    logo: "https://i.postimg.cc/D0pnFLYq/diaconomic-logo.png",
  },
  {
    name: "DIAMUN",
    role: "Head of Technology",
    history: [
      { schoolYear: "2025-26", role: "Deputy Head of Technology" },
      { schoolYear: "2026-27", role: "Head of Technology" },
    ],
    responsibilities: [
      "Revamp and maintain the conference website.",
      "Manage technical aspects on the day of the conference.",
    ],
    url: "https://diamun.org",
    logo: "https://i.postimg.cc/0jbhY3cw/diamun-logo.png",
  },
  {
    name: "SyntaxEngine",
    role: "President",
    history: [
      { schoolYear: "2025-26", role: "President" },
      { schoolYear: "2026-27", role: "President" },
    ],
    responsibilities: [
      "Lead and coordinate club activities and projects.",
      "Support members in learning coding and completing projects.",
    ],
    logo: "https://i.postimg.cc/L60LQWvs/syntaxengine-logo.jpg",
  },
  {
    name: "VOFMUN",
    role: "Co-Founder & Head of Technology",
    history: [
      { schoolYear: "2025-26", role: "Co-Founder & Head of Technology" },
      { schoolYear: "2026-27", role: "Co-Founder & Head of Technology" },
    ],
    responsibilities: [
      "Revamp and maintain the conference website.",
      "Manage technical aspects on the day of the conference.",
    ],
    url: "https://vofmun.org",
    logo: "https://i.postimg.cc/fWXPK8zN/vofmun-logo.png",
  },
  {
    name: "EconMinds xChange",
    role: "Head of Technology",
    history: [{ schoolYear: "2025-26", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
    logo: "https://i.postimg.cc/YCHTwM8t/econminds-logo.png",
  },
  {
    name: "TEDxYouth@DIA",
    role: "Head of Technology",
    history: [{ schoolYear: "2025-26", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
    logo: "https://i.postimg.cc/Kjc8SYYC/tedx-logo.png",
  },
  {
    name: "Aviation@DIA",
    role: "Head of Technology",
    history: [{ schoolYear: "2025-26", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
    logo: "https://i.postimg.cc/7LyGDPzt/aviation-logo.png",
  },
  {
    name: "Legal Horizons",
    role: "Head of Technology",
    history: [{ schoolYear: "2025-26", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
    logo: "https://i.postimg.cc/Vs4d9HV5/legal-logo.png",
  },
  {
    name: "Debate Society",
    role: "Head of Technology",
    history: [{ schoolYear: "2025-26", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
    logo: "https://i.postimg.cc/brJZbKtQ/debsoc-logo.png",
  },
  {
    name: "DIACubing",
    role: "Head of Technology",
    history: [
      { schoolYear: "2025-26", role: "Head of Technology" },
      { schoolYear: "2026-27", role: "Head of Technology" },
    ],
    responsibilities: standardTechnologyResponsibilities,
    logo: "https://i.postimg.cc/d0sqZSCR/cubing-logo.png",
  },
  {
    name: "Events@DIA",
    role: "Head of Technology",
    history: [
      { schoolYear: "2025-26", role: "Head of Technology" },
      { schoolYear: "2026-27", role: "Head of Technology" },
    ],
    responsibilities: [
      "Create and maintain the main website.",
      "Oversee technical aspects on the day of events.",
    ],
    logo: "https://i.postimg.cc/3NYxQQ7v/events-logo.png",
  },
  {
    name: "DIA Mathletes",
    role: "Head of Technology",
    history: [{ schoolYear: "2025-26", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
    url: "https://mathletes-site.onrender.com",
    logo: "https://i.postimg.cc/y8phZPpP/mathletes-logo-new.png",
  },
  {
    name: "STEM Scholars Society",
    role: "Vice President",
    history: [{ schoolYear: "2025-26", role: "Vice President" }],
    responsibilities: [
      "Create and manage events and planning.",
      "Oversee all departments of the club.",
    ],
    logo: "https://i.postimg.cc/k4RFvbR6/stem-logo.png",
  },
  {
    name: "Haven Equities",
    role: "CTO",
    history: [
      { schoolYear: "2025-26", role: "CTO" },
      { schoolYear: "2026-27", role: "CTO" },
    ],
    responsibilities: standardTechnologyResponsibilities,
    url: "https://havenequities.site",
    logo: "https://i.postimg.cc/NMLwnJPw/haven-logo.png",
  },
  {
    name: "BraverTogether",
    role: "CTO",
    history: [{ schoolYear: "2026-27", role: "CTO" }],
    responsibilities: standardTechnologyResponsibilities,
  },
  {
    name: "Engineering Society",
    role: "Head of Technology",
    history: [{ schoolYear: "2026-27", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
  },
  {
    name: "Business Minds",
    role: "Head of Technology",
    history: [{ schoolYear: "2026-27", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
    logo: "https://i.postimg.cc/L8xMspXB/bm-logo.png",
  },
  {
    name: "Astro Nova",
    role: "Head of Technology",
    history: [{ schoolYear: "2026-27", role: "Head of Technology" }],
    responsibilities: standardTechnologyResponsibilities,
  },
];

export const projectHighlights: ProjectHighlight[] = [
  {
    name: "DP Resources",
    description: "IB Diploma resources and Question Bank platform.",
    url: "https://dp.resources.anshgupta.cc",
  },
  {
    name: "MYP Resources",
    description: "IB MYP resources platform.",
    url: "https://myp.resources.anshgupta.cc",
  },
  {
    name: "Idle Realms",
    description: "Idle clicker game created for the DIA Game Jam 2025.",
    url: "https://game-jam.wuaze.com",
    image: "https://i.postimg.cc/PqN30h0j/idle-realms-thumbnail.png",
    achievement: "1st Place - DIA Game Jam 2025",
  },
  {
    name: "DI@TECH 2025 Project",
    description: "Electricity and water usage tracking and visualisation project.",
    achievement: "1st Place / Best Product",
  },
  {
    name: "InnovAIte Hackathon",
    description: "AI-powered schedule creator and personal life tracker.",
  },
  {
    name: "UAE Guide for Expats",
    description: "Website helping expats learn key information about moving to and living in the UAE.",
    url: "https://dd.wuaze.com",
    image: "https://i.postimg.cc/Xqnkh4wK/dd.png",
  },
  {
    name: "Chat Application",
    description: "Web-based chat system.",
  },
  {
    name: "Personal Portfolio",
    description: "My personal website for projects, experience, achievements and technology work.",
    url: "https://anshgupta.cc",
  },
];
