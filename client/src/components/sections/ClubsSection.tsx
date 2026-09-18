import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { ThemeAwareLogo } from "@/components/ui/theme-aware-logo";
import { clubHighlights } from "@/data/profileHighlights";

export default function ClubsSection() {
  return (
    <section id="clubs" className="border-y border-border bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <p className="font-pixel-square text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            All committees
          </p>
          <div className="mt-3 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground">
                Clubs & Leadership
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                Leadership, technology and event roles across school committees and student organisations.
              </p>
            </div>
            <p className="font-pixel-square text-[9px] uppercase tracking-[0.12em] text-muted-foreground/70">
              {clubHighlights.length.toString().padStart(2, "0")} roles
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
          {clubHighlights.map((club, index) => {
            const yearRange = club.history.map((item) => item.schoolYear).join(" → ");

            return (
              <motion.article
                key={club.name}
                className="group min-h-[255px] rounded-lg border border-border bg-card/75 p-4 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.36, delay: Math.min(index * 0.025, 0.2) }}
              >
                <div className="flex min-h-12 items-start gap-3">
                  <div className="h-11 w-11 shrink-0">
                    <ThemeAwareLogo
                      src={club.logo}
                      alt={`${club.name} logo`}
                      label={club.name}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold leading-5 tracking-[-0.02em] text-foreground">
                      {club.name}
                    </h3>
                    <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                      {club.role}
                    </p>
                    <p className="font-pixel-square mt-1 text-[8px] tracking-[0.08em] text-primary/80">
                      {yearRange}
                    </p>
                  </div>
                </div>

                <div className="my-3 h-px bg-border" />

                <div className="space-y-1.5">
                  {club.history.map((historyItem) => (
                    <div
                      key={`${club.name}-${historyItem.schoolYear}`}
                      className="grid grid-cols-[55px_1fr] items-baseline gap-2 text-[11px] leading-4"
                    >
                      <span className="font-pixel-square text-[8px] tracking-[0.06em] text-primary/80">
                        {historyItem.schoolYear}
                      </span>
                      <span className="text-muted-foreground">
                        {historyItem.role}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3 space-y-1.5 pl-3">
                  {club.responsibilities.slice(0, 2).map((responsibility) => (
                    <p
                      key={responsibility}
                      className="relative text-[11px] leading-[1.45] text-muted-foreground before:absolute before:-left-3 before:top-[0.63em] before:h-px before:w-1.5 before:bg-border"
                    >
                      {responsibility}
                    </p>
                  ))}
                </div>

                {club.url && (
                  <a
                    href={club.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary"
                  >
                    Visit website
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
