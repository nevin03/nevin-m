'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
// import { AboutExperience } from '@/components/AboutExperience';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { TerminalView } from '@/components/TerminalView';
import { QuoteModal } from '@/components/QuoteModal';
import { IdleSpiderman } from '@/components/IdleSpiderman';
import { IdleBatman } from '@/components/IdleBatman';
// import { FloatingMessageChat } from '@/components/FloatingMessageChat';

export default function Home() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [initialCmd, setInitialCmd] = useState<string | undefined>(undefined);
  const [isChildMode, setIsChildMode] = useState(false);

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

  const handleOpenDinoGame = () => {
    setInitialCmd('dino');
    setIsTerminalOpen(true);
  };

  const handleToggleTerminal = () => {
    if (isTerminalOpen) {
      setIsTerminalOpen(false);
      setInitialCmd(undefined);
    } else {
      setInitialCmd(undefined);
      setIsTerminalOpen(true);
    }
  };

  const handleCloseTerminal = () => {
    setIsTerminalOpen(false);
    setInitialCmd(undefined);
  };

  return (
    <main style={{ minHeight: '100vh', position: 'relative' }}>
      <IdleSpiderman isActive={isChildMode} />
      <IdleBatman isActive={isChildMode} />
      <QuoteModal />
      <Header
        activeSection={activeSection}
        onToggleTerminal={handleToggleTerminal}
        isTerminalOpen={isTerminalOpen}
        isChildMode={isChildMode}
        onToggleChildMode={() => setIsChildMode(!isChildMode)}
      />
      <Hero onOpenTerminal={() => { setInitialCmd(undefined); setIsTerminalOpen(true); }} />
      {/* <AboutExperience /> */}
      <ContactSection />
      <Footer onOpenDinoGame={handleOpenDinoGame} />
      <TerminalView
        isOpen={isTerminalOpen}
        onClose={handleCloseTerminal}
        initialCommand={initialCmd}
      />
      {/* <FloatingMessageChat /> */}
    </main>
  );
}
