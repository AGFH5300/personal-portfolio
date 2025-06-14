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
