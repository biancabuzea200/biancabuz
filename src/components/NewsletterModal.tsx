import React, { useState, useEffect } from 'react';
import Modal from './General/Modal';

export default function NewsletterModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    // Don't show modal on mobile
    if (isMobile) {
      return;
    }
    
    const hasSeenModal = localStorage.getItem('newsletter-modal-shown');
    
    if (hasSeenModal === 'true') {
      return;
    }

    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercentage > 30 && !hasScrolled && !isMobile) {
        setHasScrolled(true);
        setIsOpen(true);
        localStorage.setItem('newsletter-modal-shown', 'true');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled, isMobile]);

  const handleClose = () => {
    setIsOpen(false);
  };

  // Don't render modal at all on mobile
  if (isMobile) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div style={{
        padding: '2rem',
        textAlign: 'center',
        maxWidth: '420px',
        margin: '0 auto',
      }}>
        <h2 style={{ marginBottom: '0.75rem' }}>Subscribe to DevRel Uni</h2>
        <p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
          Stay up to date with the latest posts on DevRel, open source, and community building.
        </p>
        <a
          href="https://devreluni.substack.com/subscribe"
          target="_blank"
          rel="noreferrer"
          onClick={handleClose}
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            backgroundColor: '#ff6719',
            color: 'white',
            borderRadius: '0.375rem',
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Subscribe
        </a>
      </div>
    </Modal>
  );
}