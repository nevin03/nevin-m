'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
// import { AboutExperience } from '@/components/AboutExperience';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { TerminalView } from '@/components/TerminalView';
import { QuoteModal } from '@/components/QuoteModal';
// import { FloatingMessageChat } from '@/components/FloatingMessageChat';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <QuoteModal />
      <Header
        activeSection={activeSection}
        onToggleTerminal={() => setIsTerminalOpen(!isTerminalOpen)}
        isTerminalOpen={isTerminalOpen}
      />
      <Hero onOpenTerminal={() => setIsTerminalOpen(true)} />
      {/* <AboutExperience /> */}
      <ContactSection />
      <Footer />
      <TerminalView isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />
      {/* <FloatingMessageChat /> */}
    </main>
  );
}
