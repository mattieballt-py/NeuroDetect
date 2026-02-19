import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stakes from './components/Stakes'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import Impact from './components/Impact'
import Demo from './components/Demo'
import Team from './components/Team'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-bg">
      <Navbar />
      <main>
        <Hero />
        <Stakes />
        <Solution />
        <HowItWorks />
        <Impact />
        <Demo />
        <Team />
      </main>
      <Footer />
    </div>
  )
}
