export type ClubHighlight = {
  name: string;
  role: string;
  period?: string;
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

export const clubHighlights: ClubHighlight[] = [
  {
    name: "VOFMUN",
    role: "Co-Founder & Head of Technology",
    period: "Sep 2025 - Current",
    url: "https://vofmun.org",
    logo: "https://i.postimg.cc/fWXPK8zN/vofmun-logo.png",
  },
  {
    name: "DIAMUN",
    role: "Head of Technology",
    period: "Jun 2025 - Current",
    url: "https://diamun.org",
    logo: "https://i.postimg.cc/0jbhY3cw/diamun-logo.png",
  },
  {
    name: "SyntaxEngine",
    role: "President",
    period: "Aug 2025 - Current",
    logo: "https://i.postimg.cc/L60LQWvs/syntaxengine-logo.jpg",
  },
  {
    name: "Haven Equities",
    role: "CTO",
    period: "Jan 2026 - Current",
    url: "https://havenequities.site",
    logo: "https://i.postimg.cc/NMLwnJPw/haven-logo.png",
  },
  {
    name: "EconMinds xChange",
    role: "Head of Technology",
    period: "Sep 2025 - Current",
    logo: "https://i.postimg.cc/YCHTwM8t/econminds-logo.png",
  },
  {
    name: "TEDxYouth@DIA",
    role: "Technology Team",
    period: "Sep 2025 - Current",
    logo: "https://i.postimg.cc/Kjc8SYYC/tedx-logo.png",
  },
  {
    name: "Debate Society",
    role: "Head of Technology",
    period: "Oct 2025 - Current",
    logo: "https://i.postimg.cc/brJZbKtQ/debsoc-logo.png",
  },
  {
    name: "DIACubing",
    role: "Head of Technology",
    period: "Oct 2025 - Current",
    logo: "https://i.postimg.cc/d0sqZSCR/cubing-logo.png",
  },
  {
    name: "Events@DIA",
    role: "Head of Technology",
    period: "Oct 2025 - Current",
    logo: "https://i.postimg.cc/3NYxQQ7v/events-logo.png",
  },
  {
    name: "DIA Mathletes",
    role: "Head of Technology",
    period: "Oct 2025 - Current",
    url: "https://mathletes-site.onrender.com",
    logo: "https://i.postimg.cc/y8phZPpP/mathletes-logo-new.png",
  },
  {
    name: "Legal Horizons",
    role: "Head of Technology",
    period: "Oct 2025 - Current",
    logo: "https://i.postimg.cc/Vs4d9HV5/legal-logo.png",
  },
  {
    name: "DIAconomics Club",
    role: "Deputy Head of Media",
    period: "Apr 2025 - Current",
    logo: "https://i.postimg.cc/D0pnFLYq/diaconomic-logo.png",
  },
  {
    name: "BraverTogether",
    role: "CTO",
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
