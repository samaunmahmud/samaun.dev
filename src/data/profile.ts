import type { Profile } from './types'

/**
 * ─────────────────────────────────────────────────────────────
 *  SINGLE SOURCE OF TRUTH for the whole site.
 *  Every section reads from this object — to change what the site
 *  says, edit this file only. Search for "TODO" to find the gaps.
 * ─────────────────────────────────────────────────────────────
 */
export const profile: Profile = {
  name: 'Samaun Mahmud',
  shortName: 'Samaun',
  role: 'Full-stack Java developer',
  location: 'Uxbridge, London',
  timezone: 'Europe/London',
  headline: { lead: 'Full-stack Java developer building', accent: 'real-time systems.' },
  tagline:
    'Computer Science (AI) student at Brunel University London. I build real-time, data-heavy applications with Spring Boot and React, with a particular interest in fintech.',
  about: [
    "I'm a second-year Computer Science (Artificial Intelligence) student at Brunel University London, on the four-year track with an industrial placement.",
    "Most of what I build sits where backend engineering meets finance: streaming market data over WebSockets, keeping trade ledgers consistent with transactions, and wiring third-party banking APIs into apps people can actually use.",
    "I learn by shipping. Every project here was deployed, broken, debugged and rebuilt — and the debugging stories are usually my favourite part. Outside my own projects I'm a Student Support Ambassador at Brunel, and I spend a lot of weekends at hackathons.",
  ],
  availability: 'Open to 12-month industrial placements from summer 2027',
  now: [
    { label: 'Building', value: 'Meridian — merging frontend & backend into one repo' },
    { label: 'Hacking', value: 'Multi-agent investment committee for Nebius × NVIDIA' },
    { label: 'Looking for', value: 'A 12-month placement in fintech or big tech' },
  ],
  email: 'samaunmahmud9@gmail.com',
  // TODO: add your CV as public/cv.pdf, then uncomment — the résumé buttons reappear automatically
  // cvUrl: '/cv.pdf',
  sourceRepo: 'https://github.com/samaunmahmud/samaun.dev',

  socials: [
    {
      key: 'github',
      label: 'GitHub',
      handle: 'samaunmahmud',
      url: 'https://github.com/samaunmahmud',
    },
    {
      key: 'linkedin',
      label: 'LinkedIn',
      handle: 'samaun-mahmud',
      url: 'https://www.linkedin.com/in/samaun-mahmud',
    },
    // TODO: add your LeetCode username, then uncomment (hidden so there's no broken link)
    // {
    //   key: 'leetcode',
    //   label: 'LeetCode',
    //   handle: 'your-username',
    //   url: 'https://leetcode.com/u/your-username/',
    // },
    {
      key: 'email',
      label: 'Email',
      handle: 'samaunmahmud9@gmail.com',
      url: 'mailto:samaunmahmud9@gmail.com',
    },
  ],

  stats: [
    { value: '6', label: 'projects shipped or in build' },
    { value: '3', label: 'hackathons in 2026' },
    { value: 'Java', label: 'first language' },
  ],

  projects: [
    {
      slug: 'meridian',
      name: 'Meridian',
      tagline: 'Real-time market data dashboard & paper trading platform',
      description:
        'An end-to-end trading sandbox: live prices stream from the backend to the browser over WebSockets, and a full paper-trading engine lets you buy and sell against them with a proper ledger behind every position.',
      highlights: [
        'WebSocket price streaming from Spring Boot to a React dashboard',
        'Buy/sell engine with weighted-average-cost tracking and realised P&L',
        '@Transactional boundaries so a failed trade never leaves a half-written position',
        'Built with TDD and CI/CD practices; services run in Docker',
      ],
      stack: ['Spring Boot', 'React', 'PostgreSQL', 'WebSocket', 'Docker', 'Alpha Vantage'],
      status: 'in-progress',
      featured: true,
      repo: 'https://github.com/samaunmahmud/Meridian',
      accent: 'teal',
      art: 'candles',
      flow: [
        {
          id: 'data',
          label: 'Market data',
          tech: 'Alpha Vantage API',
          detail: 'Price data comes into the backend from the Alpha Vantage API.',
        },
        {
          id: 'backend',
          label: 'Trade engine',
          tech: 'Spring Boot · Java',
          detail:
            'The Spring Boot backend runs the buy/sell engine: weighted-average-cost tracking and realised P&L for every position.',
        },
        {
          id: 'ledger',
          label: 'Ledger',
          tech: 'PostgreSQL',
          detail:
            'Positions and trades are stored in PostgreSQL. @Transactional boundaries mean a failed trade never leaves a half-written position.',
          branchOf: 'backend',
        },
        {
          id: 'stream',
          label: 'Live stream',
          tech: 'WebSocket',
          detail: 'Live prices stream from Spring Boot to the browser over WebSockets.',
        },
        {
          id: 'ui',
          label: 'Dashboard',
          tech: 'React',
          detail: 'A React dashboard shows the live prices and lets you buy and sell against them.',
        },
      ],
    },
    {
      slug: 'expense-tracker',
      name: 'Expense Tracker',
      tagline: 'Full-stack personal finance app with live bank connections',
      description:
        'Links real bank accounts through Plaid, pulls transactions, and tracks spending behind JWT-secured endpoints. Deployed with the API on Render and the frontend on Vercel.',
      highlights: [
        'Plaid integration for real bank account linking and transaction sync',
        'Tracked down silent 403s caused by a Spring WebFlux / MVC classpath clash',
        'Worked around Plaid client_user_id restrictions and a JSON serialisation recursion bug',
      ],
      stack: ['Spring Boot', 'React', 'PostgreSQL', 'Plaid API', 'JWT', 'Docker'],
      status: 'live',
      featured: true,
      repo: undefined, // TODO: repo URL
      demo: undefined, // TODO: live Vercel URL
      accent: 'sky',
      art: 'bars',
    },
    {
      slug: 'investment-committee',
      name: 'AI Investment Committee',
      tagline: 'Multi-agent system that debates a stock and writes the memo',
      description:
        'Fundamentals, technicals and risk analyst agents each build a case; a Nemotron Ultra chair weighs them and writes an investment memo. Built for the Nebius × NVIDIA Global AI Hackathon.',
      highlights: [
        'Specialist agents with separate tools and briefs',
        'Chair agent reconciles disagreements into one written memo',
      ],
      stack: ['Multi-agent', 'LLM agents', 'Nemotron Ultra', 'Nebius'],
      status: 'hackathon',
      repo: 'https://github.com/samaunmahmud/zenith',
      accent: 'violet',
      art: 'network',
    },
    {
      slug: 'pneumonia-classifier',
      name: 'Pneumonia Classifier',
      tagline: 'Chest X-ray CNN served behind a Java REST API',
      description:
        'A convolutional network trained in Deeplearning4j to flag pneumonia in chest X-rays, tuned for recall because a missed case costs far more than a false alarm.',
      highlights: [
        'Optimised for high recall rather than headline accuracy',
        'Custom EvaluateModel.java script to measure the model properly',
        'Model exposed through a Spring Boot REST endpoint',
      ],
      stack: ['Java', 'Deeplearning4j', 'CNN', 'Spring Boot'],
      status: 'live',
      accent: 'rose',
      art: 'scan',
    },
    {
      slug: 'pacific-marketplace',
      name: 'Pacific Marketplace',
      tagline: 'Reviews & ratings module for a group e-commerce platform',
      description:
        'My part of a team-built e-commerce marketplace: the reviews and ratings module, built to plug into the rest of the group’s platform.',
      highlights: ['Built the reviews & ratings module', 'Worked inside a shared team codebase'],
      stack: ['Java', 'Team project'],
      status: 'coursework',
      accent: 'amber',
      art: 'stars',
    },
    {
      slug: 'cinescout',
      name: 'CineScout',
      tagline: 'AI location scouting for film productions',
      description:
        'A filmmaker submits a scene; CineScout extracts the physical location requirements, finds real venues with grounded web search, assesses booking friction, works out shoot logistics and drafts outreach to venue owners.',
      highlights: [
        'Scene → location requirements → real venues, using an IBM watsonx.ai LLM with Parallel grounded web search',
        'Resilience4j retries and circuit breakers around every LLM and search call, with bounded assessment concurrency',
        'Shoot logistics from keyless public data: sun, weather (Open-Meteo), noise and nearby services (OpenStreetMap)',
        'Flyway-owned schema, tested against real PostgreSQL via Testcontainers; external APIs stubbed with WireMock',
      ],
      stack: ['Java', 'Spring Boot', 'Spring WebFlux', 'PostgreSQL', 'React', 'TypeScript', 'watsonx.ai', 'Parallel', 'Docker'],
      status: 'in-progress',
      repo: 'https://github.com/samaunmahmud/cinescout',
      accent: 'teal',
      art: 'map',
    },
  ],

  timeline: [
    {
      title: 'BSc Computer Science (Artificial Intelligence) with Work Placement',
      org: 'Brunel University London',
      period: '2025 — present', // TODO: check dates
      kind: 'education',
      points: ['Second year; placement year planned for 2027–28', 'Focus: software engineering, AI and machine learning'],
    },
    {
      title: 'Student Support Ambassador',
      org: 'Brunel University London',
      period: 'Current', // TODO: start date
      kind: 'role',
      points: ['Help new and current students find their way around university life and support services'],
    },
    {
      title: 'Nebius × NVIDIA Global AI Hackathon',
      org: 'Devpost',
      period: 'Autumn 2026',
      kind: 'hackathon',
      points: ['Building a multi-agent AI investment committee'],
    },
    {
      title: 'Agentic Cinema Hackathon',
      org: 'Google Cloud',
      period: 'Sep 2026',
      kind: 'hackathon',
      points: ['Built a film-production research agent on the Parallel track'],
    },
  ],

  // TODO: add a right-to-work / visa answer here if you want recruiters to see it
  faq: [
    {
      q: 'When could you start?',
      a: 'Summer 2027, for a 12-month industrial placement. It’s the placement year of my four-year Computer Science (AI) degree at Brunel University London.',
    },
    {
      q: 'What kind of role are you looking for?',
      a: 'A 12-month placement in fintech or big tech, ideally backend or full-stack Java work.',
    },
    {
      q: 'What’s your strongest stack?',
      a: 'Java is my first language. Most of my projects pair Spring Boot on the backend with React on the frontend, PostgreSQL for data and Docker for running services.',
    },
    {
      q: 'Can I see your code?',
      a: 'Yes. My projects are on GitHub at @samaunmahmud, including the source for this site.',
    },
    {
      q: 'Where are you based?',
      a: 'Uxbridge, London, near Brunel’s campus.',
    },
  ],

  // TODO: prune anything here you wouldn't want to be quizzed on in an interview
  skills: [
    { name: 'Languages', items: ['Java', 'TypeScript', 'JavaScript', 'Python', 'SQL'] },
    { name: 'Backend', items: ['Spring Boot', 'Spring Security', 'REST', 'WebSockets', 'JPA / Hibernate', 'JWT'] },
    { name: 'Frontend', items: ['React', 'Vite', 'Tailwind CSS', 'HTML & CSS'] },
    { name: 'Data & ML', items: ['PostgreSQL', 'Deeplearning4j', 'CNNs', 'LLM agents'] },
    { name: 'Tooling', items: ['Docker', 'Git & GitHub', 'CI/CD', 'JUnit / TDD', 'Render', 'Vercel'] },
  ],

}
