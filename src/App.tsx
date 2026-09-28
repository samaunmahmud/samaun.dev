import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { Contact } from './components/sections/Contact'
import { Hero } from './components/sections/Hero'
import { Journey } from './components/sections/Journey'
import { Profiles } from './components/sections/Profiles'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { CommandPalette } from './components/ui/CommandPalette'

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only z-[60] rounded-lg bg-accent px-4 py-2 text-ink-950 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Journey />
        <Skills />
        <Profiles />
        <Contact />
      </main>
      <Footer />
      <CommandPalette />
    </>
  )
}
