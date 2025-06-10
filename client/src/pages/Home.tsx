import NavBar from "@/components/layout/NavBar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ClubsSection from "@/components/sections/ClubsSection";
import VolunteerSection from "@/components/sections/VolunteerSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ContactSection from "@/components/sections/ContactSection";
import AwardsSection from "@/components/sections/AwardsSection";

export default function Home() {
  return (
    <>
      <NavBar />
      <main className="pt-16">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <AwardsSection />
        <ClubsSection />
        <VolunteerSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
