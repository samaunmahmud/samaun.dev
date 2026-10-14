import type { Profile } from './types.ts'

/*
 * Machine-readable versions of profile.ts, generated at build time by the siteMeta plugin in
 * vite.config.ts — so search engines and AI tools always see the same facts as the page.
 */

const links = (p: Profile) => p.socials.filter((s) => s.key !== 'email')

/** schema.org Person, injected into index.html as JSON-LD. */
export function personJsonLd(p: Profile) {
  const uni = p.timeline.find((t) => t.kind === 'education')?.org
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: p.name,
    url: `${p.siteUrl}/`,
    email: `mailto:${p.email}`,
    jobTitle: p.role,
    description: p.tagline,
    ...(uni ? { affiliation: { '@type': 'CollegeOrUniversity', name: uni } } : {}),
    address: { '@type': 'PostalAddress', addressLocality: p.location },
    knowsAbout: p.skills.flatMap((g) => g.items),
    sameAs: links(p).map((s) => s.url),
  }
}

/** /llms.txt (llmstxt.org): a plain-Markdown summary for AI assistants a recruiter might point at the site. */
export function llmsTxt(p: Profile) {
  const project = (x: Profile['projects'][number]) =>
    [
      `### ${x.name}`,
      '',
      `${x.tagline}. ${x.description}`,
      '',
      ...x.highlights.map((h) => `- ${h}`),
      `- Stack: ${x.stack.join(', ')}`,
      ...(x.repo ? [`- Code: ${x.repo}`] : []),
      ...(x.demo ? [`- Live: ${x.demo}`] : []),
      `- Case study: ${p.siteUrl}/?project=${x.slug}`,
    ].join('\n')

  return [
    `# ${p.name}`,
    '',
    `> ${p.role}. ${p.tagline}`,
    '',
    p.about.join('\n\n'),
    '',
    `**Availability:** ${p.availability}.`,
    '',
    '## Links',
    '',
    `- [Portfolio](${p.siteUrl}/)`,
    `- [Résumé](${p.siteUrl}${p.cvUrl ?? '/resume'})`,
    `- [Email](mailto:${p.email})`,
    ...links(p).map((s) => `- [${s.label}](${s.url})`),
    '',
    '## Projects',
    '',
    p.projects.map(project).join('\n\n'),
    '',
    '## Education, roles and hackathons',
    '',
    ...p.timeline.map((t) => `- **${t.title}**, ${t.org} (${t.period}): ${t.points.join('; ')}`),
    '',
    '## Skills',
    '',
    ...p.skills.map((g) => `- **${g.name}:** ${g.items.join(', ')}`),
    '',
    '## FAQ',
    '',
    ...p.faq.flatMap((f) => [`**${f.q}**`, f.a, '']),
  ].join('\n')
}

const escape = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/**
 * /p/<slug>: a tiny page whose only job is the link preview. Crawlers read its Open Graph tags
 * (the project's own title, tagline and image); people are sent straight on to the case study.
 * `image` is a path under /public, e.g. /og/meridian.png.
 */
export function projectSharePage(p: Profile, project: Profile['projects'][number], image: string) {
  const target = `/?project=${project.slug}`
  const title = escape(`${project.name} — ${p.name}`)
  const description = escape(project.tagline)
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    <link rel="canonical" href="${p.siteUrl}${target}" />
    <meta property="og:type" content="article" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:url" content="${p.siteUrl}/p/${project.slug}" />
    <meta property="og:image" content="${p.siteUrl}${image}" />
    <meta name="twitter:card" content="summary_large_image" />
    <script>location.replace(${JSON.stringify(target)})</script>
  </head>
  <body>
    <p><a href="${target}">${escape(project.name)}: ${description}</a></p>
  </body>
</html>
`
}
