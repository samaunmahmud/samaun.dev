// Content checks for profile.ts that TypeScript can't catch. Runs as part of `npm run check`.
// Usage: node scripts/validate-content.ts
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { profile } from '../src/data/profile.ts'
import { NAV_SECTIONS } from '../src/data/sections.ts'

const errors: string[] = []
const fail = (msg: string) => errors.push(msg)

/** Width/height from a WebP or PNG header, so `imageSize` can't drift from the real file. */
function imageSize(file: string): [number, number] | null {
  const b = readFileSync(file)
  if (b.toString('ascii', 1, 4) === 'PNG') return [b.readUInt32BE(16), b.readUInt32BE(20)]
  if (b.toString('ascii', 0, 4) !== 'RIFF' || b.toString('ascii', 8, 12) !== 'WEBP') return null
  const chunk = b.toString('ascii', 12, 16)
  if (chunk === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)]
  if (chunk === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]
  }
  return null
}

const publicFile = (path: string) => `public${path}`

// Every URL is absolute https (or mailto for email)
const urls: [string, string | undefined][] = [
  ['siteUrl', profile.siteUrl],
  ['sourceRepo', profile.sourceRepo],
  ...profile.socials.map((s): [string, string] => [`socials.${s.key}`, s.url]),
  ...profile.projects.flatMap((p): [string, string | undefined][] => [
    [`${p.slug}.repo`, p.repo],
    [`${p.slug}.demo`, p.demo],
  ]),
]
for (const [where, url] of urls) {
  if (url && !/^https:\/\/[^\s]+$/.test(url) && !/^mailto:[^\s@]+@[^\s@]+$/.test(url)) fail(`${where}: not an https:// or mailto: URL — ${url}`)
}
if (profile.siteUrl.endsWith('/')) fail('siteUrl: drop the trailing slash')

// Projects: unique slugs, images exist and match imageSize
const slugs = profile.projects.map((p) => p.slug)
for (const s of new Set(slugs)) if (slugs.filter((x) => x === s).length > 1) fail(`projects: duplicate slug "${s}"`)

for (const p of profile.projects) {
  if (!/^[a-z0-9-]+$/.test(p.slug)) fail(`${p.slug}: slug must be lowercase letters, digits and dashes`)
  if (p.highlights.length === 0) fail(`${p.slug}: add at least one highlight`)
  if (p.imageDark && !p.image) fail(`${p.slug}: imageDark is set but image isn't`)
  for (const img of [p.image, p.imageDark]) {
    if (!img) continue
    if (!existsSync(publicFile(img))) {
      fail(`${p.slug}: ${img} not found in public/`)
      continue
    }
    const size = imageSize(publicFile(img))
    if (!p.imageSize) fail(`${p.slug}: set imageSize${size ? ` to [${size.join(', ')}]` : ''}`)
    else if (size && (size[0] !== p.imageSize[0] || size[1] !== p.imageSize[1]))
      fail(`${p.slug}: imageSize is [${p.imageSize.join(', ')}] but ${img} is [${size.join(', ')}]`)
  }
  for (const node of p.flow ?? []) {
    if (node.branchOf && !p.flow!.some((n) => n.id === node.branchOf)) fail(`${p.slug}.flow: "${node.id}" branches off unknown node "${node.branchOf}"`)
  }
}

for (const file of [profile.cvUrl, profile.photo]) {
  if (file && !existsSync(publicFile(file))) fail(`${file} is set in profile.ts but missing from public/`)
}

// Every navbar entry has a matching <Section id> (or <section id>) in a component
const componentSource = readdirSync('src/components/sections')
  .map((f) => readFileSync(`src/components/sections/${f}`, 'utf8'))
  .join('\n')
for (const { id } of NAV_SECTIONS) {
  if (!componentSource.includes(`id="${id}"`)) fail(`sections.ts: no section with id="${id}" in src/components/sections`)
}

if (errors.length) {
  console.error(`✗ profile.ts content check failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`)
  process.exit(1)
}
console.log(`✓ content OK — ${profile.projects.length} projects, ${NAV_SECTIONS.length} sections`)
