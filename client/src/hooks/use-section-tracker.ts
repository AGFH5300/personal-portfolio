
import { useEffect } from 'react';

export function useSectionTracker() {
  useEffect(() => {
    const trackSection = (sectionId: string) => {
      fetch('/api/track-section', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ section: sectionId }),
      }).catch(err => console.error('Failed to track section:', err));
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionId = entry.target.id;
            if (sectionId) {
              trackSection(sectionId);
            }
          }
        });
      },
      {
        threshold: 0.5, // Track when 50% of section is visible
        rootMargin: '-10% 0px -10% 0px', // Only track when well into view
      }
    );

    // Observe all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);
}
