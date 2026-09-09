export interface SamplePost {
  title: string;
  snippet: string;
  engagement: string;
}

export interface CreatorStats {
  engagementRate: number;
  avgViews: number;
  postsPerMonth: number;
}

export interface Creator {
  id: string;
  name: string;
  initials: string;
  bio: string;
  verticals: string[];
  followers: number;
  pricePerPostCents: number;
  location: string;
  samplePosts: SamplePost[];
  stats: CreatorStats;
}

export const VERTICALS = [
  "Product Marketing",
  "Fintech & Ops",
  "Future of Work",
  "DevTools & Infra",
  "Sales & RevOps",
  "Data & AI",
  "Cybersecurity",
  "Supply Chain",
  "Healthcare Tech",
  "Climate Tech",
] as const;

export const LOCATIONS = [
  "New York, NY",
  "San Francisco, CA",
  "Austin, TX",
  "London, UK",
  "Toronto, ON",
  "Berlin, DE",
  "Chicago, IL",
  "Seattle, WA",
  "Remote",
] as const;

export const CREATORS: Creator[] = [
  {
    id: "priya-anand",
    name: "Priya Anand",
    initials: "PA",
    bio: "Turns dry release notes into posts people actually screenshot. Ex-PMM at two unicorns.",
    verticals: ["Product Marketing"],
    followers: 84000,
    pricePerPostCents: 65000,
    location: "San Francisco, CA",
    samplePosts: [
      {
        title: "Why most launch posts fail in the first 10 seconds",
        snippet: "Nobody cares about your feature list. They care what breaks if they don't have it...",
        engagement: "4.1% engagement · 312K views",
      },
      {
        title: "I audited 50 B2B launch posts. Here's the pattern.",
        snippet: "The top 10% all did one thing differently in the first line...",
        engagement: "5.6% engagement · 480K views",
      },
    ],
    stats: { engagementRate: 4.8, avgViews: 340000, postsPerMonth: 6 },
  },
  {
    id: "marcus-chen",
    name: "Marcus Chen",
    initials: "MC",
    bio: "The voice CFOs and finance leaders actually stop scrolling for. 12 years in fintech ops.",
    verticals: ["Fintech & Ops", "Data & AI"],
    followers: 112000,
    pricePerPostCents: 90000,
    location: "New York, NY",
    samplePosts: [
      {
        title: "The spreadsheet that's quietly costing your finance team 20 hours a week",
        snippet: "I watched a controller rebuild this by hand every close. There's a better way...",
        engagement: "3.9% engagement · 290K views",
      },
      {
        title: "What actually changes when you automate AP",
        snippet: "Not what the vendors tell you. Here's what changed on my team...",
        engagement: "4.4% engagement · 355K views",
      },
    ],
    stats: { engagementRate: 4.1, avgViews: 310000, postsPerMonth: 5 },
  },
  {
    id: "dana-whitfield",
    name: "Dana Whitfield",
    initials: "DW",
    bio: "HR and people-ops takes that get forwarded, not just liked. Former Head of People at a Series C startup.",
    verticals: ["Future of Work"],
    followers: 63000,
    pricePerPostCents: 48000,
    location: "Austin, TX",
    samplePosts: [
      {
        title: "Your return-to-office memo is not the problem",
        snippet: "Three companies I advise this quarter all made the same mistake...",
        engagement: "6.2% engagement · 410K views",
      },
      {
        title: "What exit interviews actually tell you (if you're honest)",
        snippet: "I've run 200+ of these. The real reasons never sound like the stated ones...",
        engagement: "5.1% engagement · 280K views",
      },
    ],
    stats: { engagementRate: 5.7, avgViews: 345000, postsPerMonth: 8 },
  },
  {
    id: "elliot-ruiz",
    name: "Elliot Ruiz",
    initials: "ER",
    bio: "Explains infra decisions engineers actually trust. Staff engineer turned full-time creator.",
    verticals: ["DevTools & Infra", "Cybersecurity"],
    followers: 97000,
    pricePerPostCents: 72000,
    location: "Remote",
    samplePosts: [
      {
        title: "We migrated 40 services off our monolith. Here's what broke.",
        snippet: "Not the parts you'd expect. The auth layer held up fine — it was the...",
        engagement: "4.7% engagement · 365K views",
      },
      {
        title: "The on-call rotation that finally stopped burning people out",
        snippet: "It wasn't fewer alerts. It was a change to how we defined severity...",
        engagement: "5.3% engagement · 402K views",
      },
    ],
    stats: { engagementRate: 4.9, avgViews: 350000, postsPerMonth: 6 },
  },
  {
    id: "sofia-marchetti",
    name: "Sofia Marchetti",
    initials: "SM",
    bio: "RevOps leader who makes pipeline math actually interesting. Runs a 40K-member newsletter on the side.",
    verticals: ["Sales & RevOps"],
    followers: 71000,
    pricePerPostCents: 55000,
    location: "Chicago, IL",
    samplePosts: [
      {
        title: "Your CRM has a lying problem",
        snippet: "I pulled the numbers from 30 pipelines. Half the 'qualified' leads weren't...",
        engagement: "4.3% engagement · 260K views",
      },
      {
        title: "The forecast call that changed how I run QBRs",
        snippet: "One question exposed how little we actually knew about deal risk...",
        engagement: "3.8% engagement · 210K views",
      },
    ],
    stats: { engagementRate: 4.0, avgViews: 235000, postsPerMonth: 5 },
  },
  {
    id: "jamal-okafor",
    name: "Jamal Okafor",
    initials: "JO",
    bio: "Applied AI for supply chain leaders — no hype, just the numbers. Advises three logistics unicorns.",
    verticals: ["Data & AI", "Supply Chain"],
    followers: 58000,
    pricePerPostCents: 51000,
    location: "Toronto, ON",
    samplePosts: [
      {
        title: "Demand forecasting AI isn't magic. Here's the math.",
        snippet: "Every vendor pitch skips this part. I'll show you the actual model...",
        engagement: "5.0% engagement · 240K views",
      },
      {
        title: "Why my warehouse client ignored the AI recommendation (and was right)",
        snippet: "The model was accurate. It was also missing something the floor manager knew...",
        engagement: "4.6% engagement · 198K views",
      },
    ],
    stats: { engagementRate: 4.8, avgViews: 220000, postsPerMonth: 4 },
  },
  {
    id: "hannah-lindqvist",
    name: "Hannah Lindqvist",
    initials: "HL",
    bio: "Security takes for people who don't have time to read CVEs all day. 15 years in appsec.",
    verticals: ["Cybersecurity", "DevTools & Infra"],
    followers: 45000,
    pricePerPostCents: 39000,
    location: "Berlin, DE",
    samplePosts: [
      {
        title: "The breach that started with a Slack integration nobody remembered installing",
        snippet: "Three years later, still active, still had write access. Here's how we found it...",
        engagement: "6.8% engagement · 300K views",
      },
      {
        title: "Your SOC 2 report is not a security strategy",
        snippet: "I've reviewed 40+ of these this year. Compliance and security keep getting confused...",
        engagement: "5.4% engagement · 215K views",
      },
    ],
    stats: { engagementRate: 6.1, avgViews: 260000, postsPerMonth: 7 },
  },
  {
    id: "reginald-osei",
    name: "Reginald Osei",
    initials: "RO",
    bio: "Healthcare tech operator writing about the gap between clinical reality and product roadmaps.",
    verticals: ["Healthcare Tech", "Product Marketing"],
    followers: 39000,
    pricePerPostCents: 42000,
    location: "New York, NY",
    samplePosts: [
      {
        title: "The feature every EHR vendor builds and every nurse hates",
        snippet: "I sat in on 12 hospital rollouts this year. The pattern is almost identical...",
        engagement: "5.9% engagement · 190K views",
      },
      {
        title: "Why our 'time saved' metric was quietly lying to us",
        snippet: "The dashboard looked great. The floor staff felt the opposite...",
        engagement: "4.9% engagement · 165K views",
      },
    ],
    stats: { engagementRate: 5.3, avgViews: 178000, postsPerMonth: 4 },
  },
  {
    id: "clara-fontaine",
    name: "Clara Fontaine",
    initials: "CF",
    bio: "Climate tech builder turned storyteller. Makes carbon accounting genuinely understandable.",
    verticals: ["Climate Tech", "Data & AI"],
    followers: 52000,
    pricePerPostCents: 46000,
    location: "London, UK",
    samplePosts: [
      {
        title: "Scope 3 emissions: the number every company gets wrong",
        snippet: "I audited a Fortune 500 supply chain. The reported number was off by 40%...",
        engagement: "5.2% engagement · 205K views",
      },
      {
        title: "The carbon offset that wasn't",
        snippet: "We traced one credit back to its source project. It didn't exist anymore...",
        engagement: "6.4% engagement · 275K views",
      },
    ],
    stats: { engagementRate: 5.6, avgViews: 230000, postsPerMonth: 5 },
  },
  {
    id: "victor-nakamura",
    name: "Victor Nakamura",
    initials: "VN",
    bio: "Ex-VP Sales writing the RevOps playbooks he wishes he'd had. Sharp, short, no fluff.",
    verticals: ["Sales & RevOps", "Future of Work"],
    followers: 128000,
    pricePerPostCents: 98000,
    location: "Seattle, WA",
    samplePosts: [
      {
        title: "The discount that cost us the renewal, not the deal",
        snippet: "We won the logo. We lost the account eighteen months later. Here's why...",
        engagement: "4.5% engagement · 420K views",
      },
      {
        title: "I killed our SDR team's favorite metric. Pipeline went up.",
        snippet: "Activity volume looked great on the dashboard. It was hiding a real problem...",
        engagement: "5.0% engagement · 460K views",
      },
    ],
    stats: { engagementRate: 4.7, avgViews: 440000, postsPerMonth: 6 },
  },
  {
    id: "amara-boateng",
    name: "Amara Boateng",
    initials: "AB",
    bio: "Product-led growth for developer tools. Writes the onboarding teardown thread everyone reshares.",
    verticals: ["DevTools & Infra", "Product Marketing"],
    followers: 76000,
    pricePerPostCents: 58000,
    location: "Remote",
    samplePosts: [
      {
        title: "I signed up for 20 dev tools this month. Two didn't lose me by step 3.",
        snippet: "Here's exactly where the other 18 fell apart, screenshot by screenshot...",
        engagement: "5.8% engagement · 330K views",
      },
      {
        title: "The onboarding flow that converts free users without a single email",
        snippet: "No drip campaign. No sales call. Just three screens done right...",
        engagement: "4.9% engagement · 275K views",
      },
    ],
    stats: { engagementRate: 5.2, avgViews: 300000, postsPerMonth: 7 },
  },
  {
    id: "thomas-berger",
    name: "Thomas Berger",
    initials: "TB",
    bio: "Supply chain operator who makes logistics content that non-logistics people actually read.",
    verticals: ["Supply Chain", "Fintech & Ops"],
    followers: 34000,
    pricePerPostCents: 36000,
    location: "Chicago, IL",
    samplePosts: [
      {
        title: "The container shortage was never about containers",
        snippet: "Everyone blamed the ships. The real bottleneck was three layers upstream...",
        engagement: "4.2% engagement · 140K views",
      },
      {
        title: "Why 'just in time' quietly became 'just in case' for most of my clients",
        snippet: "The math changed after 2021 and most procurement teams haven't caught up...",
        engagement: "3.9% engagement · 122K views",
      },
    ],
    stats: { engagementRate: 4.0, avgViews: 131000, postsPerMonth: 3 },
  },
  {
    id: "leila-haddad",
    name: "Leila Haddad",
    initials: "LH",
    bio: "AI product leader demystifying what's actually shipping vs. what's demo-ware. Blunt and well-sourced.",
    verticals: ["Data & AI"],
    followers: 143000,
    pricePerPostCents: 110000,
    location: "San Francisco, CA",
    samplePosts: [
      {
        title: "I tried 14 'AI agent' products this month. Here's what actually works unsupervised.",
        snippet: "Two. The answer is two. Here's what separated them from the other twelve...",
        engagement: "6.0% engagement · 610K views",
      },
      {
        title: "The eval most AI teams skip, and why it's the one that matters",
        snippet: "Everyone benchmarks accuracy. Almost nobody benchmarks this...",
        engagement: "5.5% engagement · 540K views",
      },
    ],
    stats: { engagementRate: 5.8, avgViews: 575000, postsPerMonth: 8 },
  },
];
