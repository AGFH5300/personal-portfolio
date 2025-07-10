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

export default function Home() {
  useEffect(() => {
    // Restore scroll position when coming back from /all
    const savedScrollPosition = sessionStorage.getItem('homeScrollPosition');
    if (savedScrollPosition) {
      const scrollY = parseInt(savedScrollPosition, 10);
      // Use setTimeout to ensure the page is fully rendered
      setTimeout(() => {
        window.scrollTo(0, scrollY);
      }, 100);
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
