import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  ExternalLink,
  Layers3,
  MessageSquare,
  Sparkles,
  Trophy,
} from "lucide-react";
import { projectHighlights } from "@/data/profileHighlights";

function ProjectVisual({ name }: { name: string }) {
  const isDP = name === "DP Resources";
  const isMYP = name === "MYP Resources";

  if (isDP || isMYP) {
    return (
      <div className="relative h-44 overflow-hidden border-b border-border bg-[hsl(var(--surface-alt))] p-4">
        <div className="absolute inset-0 opacity-50 [background-image:linear-gradient(to_right,hsl(var(--border)/.45)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/.45)_1px,transparent_1px)] [background-size:24px_24px]" />
        <div className="relative h-full overflow-hidden rounded-md border border-border bg-card shadow-sm">
          <div className="flex h-8 items-center gap-1.5 border-b border-border px-3">
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="h-2 w-2 rounded-full bg-border" />
            <span className="ml-auto font-pixel-square text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
              {isDP ? "DP" : "MYP"}
            </span>
          </div>
          <div className="grid h-[calc(100%-2rem)] grid-cols-[72px_1fr]">
            <div className="border-r border-border bg-muted/40 p-2">
              <div className="mb-2 h-2 w-10 rounded bg-primary/40" />
              <div className="mb-1.5 h-1.5 w-12 rounded bg-border" />
              <div className="mb-1.5 h-1.5 w-9 rounded bg-border" />
              <div className="h-1.5 w-11 rounded bg-border" />
            </div>
            <div className="p-3">
              <div className="mb-2 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" />
                <div className="h-2 w-24 rounded bg-foreground/70" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="h-12 rounded border border-border bg-muted/40 p-2">
                  <div className="mb-1 h-1.5 w-8 rounded bg-primary/40" />
                  <div className="h-1.5 w-12 rounded bg-border" />
                </div>
                <div className="h-12 rounded border border-border bg-muted/40 p-2">
                  <div className="mb-1 h-1.5 w-10 rounded bg-primary/40" />
                  <div className="h-1.5 w-9 rounded bg-border" />
                </div>
              </div>
              <div className="mt-2 h-1.5 w-3/4 rounded bg-border" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const Icon =
    name.includes("Chat") ? MessageSquare :
    name.includes("DI@TECH") ? Layers3 :
    name.includes("InnovAIte") ? Sparkles :
    Code2;

  return (
    <div className="relative flex h-44 items-center justify-center overflow-hidden border-b border-border bg-[hsl(var(--surface-alt))]">
      <div className="absolute inset-0 opacity-60 [background-image:radial-gradient(hsl(var(--border))_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
        <Icon className="h-8 w-8 text-primary" />
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-[hsl(var(--surface-alt))] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-pixel-square mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Selected work
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground">Projects</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Platforms, websites, competition builds and applications I've designed and developed.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projectHighlights.map((project, index) => (
            <motion.article
              key={project.name}
              className="group flex overflow-hidden rounded-xl border border-border bg-card shadow-sm transition duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg flex-col"
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.24) }}
            >
              {project.image ? (
                <div className="h-44 overflow-hidden border-b border-border bg-muted">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ) : (
                <ProjectVisual name={project.name} />
              )}

              <div className="flex flex-1 flex-col p-5">
                <div className="mb-3 flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">
                    {project.name}
                  </h3>
                  <span className="font-pixel-square shrink-0 text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mb-4 text-sm leading-6 text-muted-foreground">
                  {project.description}
                </p>

                {project.achievement && (
                  <div className="mb-4 inline-flex self-start items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    <Trophy className="mr-1.5 h-3.5 w-3.5" />
                    {project.achievement}
                  </div>
                )}

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-foreground transition hover:text-primary"
                  >
                    View project
                    <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
