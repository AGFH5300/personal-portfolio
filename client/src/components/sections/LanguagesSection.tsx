import { motion } from "framer-motion";
import { Globe2, Star } from "lucide-react";
import { personalData } from "@/data/personalData";

export default function LanguagesSection() {
  const getProficiencyLevel = (proficiency: string) => {
    if (proficiency.includes("Native") || proficiency.includes("bilingual")) return 5;
    if (proficiency.includes("Professional")) return 4;
    if (proficiency.includes("Limited")) return 2;
    if (proficiency.includes("Elementary")) return 1;
    return 3;
  };

  return (
    <section id="languages" className="bg-[hsl(var(--surface-alt))] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-pixel-square mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Communication
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground">
            Languages
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Languages I can communicate in, from native fluency to elementary proficiency.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {personalData.languages.map((language, index) => {
            const level = getProficiencyLevel(language.proficiency);

            return (
              <motion.article
                key={language.name}
                className="rounded-lg border border-border bg-card p-5 shadow-sm"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.045, 0.22) }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-14 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border bg-background">
                    {language.logo ? (
                      <img
                        src={language.logo}
                        alt={`${language.name} flag`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <Globe2 className="h-5 w-5 text-primary" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold tracking-[-0.02em] text-foreground">
                      {language.name}
                    </h3>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {language.proficiency}
                    </p>
                    <div className="mt-3 flex items-center gap-1" aria-label={`${level} out of 5 proficiency`}>
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          className={
                            star < level
                              ? "fill-amber-400 text-amber-400"
                              : "fill-transparent text-border"
                          }
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
