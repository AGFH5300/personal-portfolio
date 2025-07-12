import { useEffect } from "react";
import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ClubsSection from "@/components/sections/ClubsSection";
import VolunteerSection from "@/components/sections/VolunteerSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import ExperienceSection from "@/components/sections/ExperienceSection";
import LanguagesSection from "@/components/sections/LanguagesSection";
import { useSectionTracker } from "@/hooks/use-section-tracker";

export default function Home() {
  // Track section navigation
  useSectionTracker();

  useEffect(() => {
    // Restore scroll position when coming back from /all
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition, 10);
      
      // Use requestAnimationFrame to ensure smooth scroll restoration
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      });
      
      sessionStorage.removeItem('homeScrollPosition');
    }
  }, []);

  return (
    <>
      <NavBar />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ClubsSection />
        <LanguagesSection />
        <VolunteerSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
