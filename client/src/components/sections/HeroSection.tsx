import { motion } from "framer-motion";
import { ArrowDownRight, ExternalLink } from "lucide-react";
import { personalData } from "@/data/personalData";

export default function HeroSection() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="about"
      className="relative isolate overflow-hidden border-b border-border bg-background py-20 md:py-28"
    >
      <div className="portfolio-grid pointer-events-none absolute inset-0 -z-20 opacity-70" />
      <div className="pointer-events-none absolute -left-24 top-10 -z-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 md:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="order-2 md:order-1"
          >
            <p className="font-pixel-square mb-5 text-[11px] uppercase tracking-[0.16em] text-primary">
              Student / Developer / Builder
            </p>

            <h1 className="max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.05em] text-foreground sm:text-6xl lg:text-7xl">
              {personalData.name}
            </h1>

            <p className="mt-5 text-xl font-medium tracking-[-0.02em] text-foreground/80 sm:text-2xl">
              {personalData.title}
            </p>

            <p className="mt-6 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              {personalData.shortBio}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-5 py-3 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:opacity-90"
              >
                View projects
                <ArrowDownRight className="h-4 w-4" />
              </button>

              <a
                href={personalData.social.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card/70 px-5 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/40"
              >
                GitHub
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </motion.div>

          <motion.div
            className="order-1 flex justify-center md:order-2 md:justify-end"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            <div className="relative">
              <div className="absolute -inset-3 -z-10 rounded-[2rem] border border-primary/20 bg-primary/5" />
              <img
                src={personalData.profileImage}
                alt={`${personalData.name} profile`}
                className="h-64 w-64 rounded-[1.6rem] border border-border object-cover shadow-2xl sm:h-72 sm:w-72 lg:h-80 lg:w-80"
              />
              <div className="absolute -bottom-4 -left-4 rounded-lg border border-border bg-card/95 px-4 py-3 shadow-lg backdrop-blur">
                <p className="font-pixel-square text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                  Currently
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Building for the web
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
