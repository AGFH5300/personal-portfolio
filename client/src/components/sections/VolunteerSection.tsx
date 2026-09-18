import { motion } from "framer-motion";
import { BookOpen, GraduationCap, Heart, ShieldCheck, Utensils } from "lucide-react";
import { personalData } from "@/data/personalData";

const volunteerIcons = {
  "Panchgani Education Initiative": GraduationCap,
  "Donating Hot Meals": Utensils,
  "Tata Cancer Hospital": Heart,
  "School for Children with Hearing and Speech Impairments": BookOpen,
  DIA: ShieldCheck,
};

export default function VolunteerSection() {
  return (
    <section id="volunteer" className="bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-pixel-square mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Community
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground">Volunteer experience</h2>
        </motion.div>

        <div className="mx-auto max-w-4xl">
          {personalData.volunteerWork.map((work, index) => {
            const Icon = volunteerIcons[work.organization as keyof typeof volunteerIcons] || Heart;

            return (
              <motion.article
                key={`${work.organization}-${work.period}-${index}`}
                className="relative grid gap-4 border-l border-border pb-8 pl-7 last:pb-0 sm:grid-cols-[150px_1fr]"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.2) }}
              >
                <div className="absolute -left-[17px] top-0 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card shadow-sm">
                  <Icon className="h-3.5 w-3.5 text-primary" />
                </div>

                <div>
                  <p className="font-pixel-square text-[8px] uppercase tracking-[0.1em] text-primary">
                    {work.period}
                  </p>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{work.role}</p>
                </div>

                <div className="rounded-xl border border-border bg-card p-5">
                  <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-foreground">
                    {work.organization}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{work.description}</p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
