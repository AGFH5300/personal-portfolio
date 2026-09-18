import { motion } from "framer-motion";
import { Briefcase, Download, GraduationCap, Loader2 } from "lucide-react";
import { useState } from "react";
import { personalData } from "@/data/personalData";

export default function AboutSection() {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadCV = () => {
    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = personalData.cvUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      window.setTimeout(() => setIsDownloading(false), 1200);
    }
  };

  return (
    <section className="bg-[hsl(var(--surface-alt))] py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-pixel-square text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Profile
          </p>
          <h2 className="mt-2 text-3xl font-bold tracking-[-0.035em] text-foreground">About me</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="rounded-xl border border-border bg-card p-6 sm:p-7"
          >
            <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Who I am</h3>
            <div className="mt-4 space-y-4 text-[15px] leading-7 text-muted-foreground">
              <p>{personalData.fullBio[0]}</p>
              <p>{personalData.fullBio[1]}</p>
            </div>

            <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-border pt-6 sm:grid-cols-4">
              {[
                ["Name", personalData.name],
                ["Age", String(personalData.age)],
                ["Nationality", personalData.nationality],
                ["Email", personalData.email],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="font-pixel-square text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                    {label}
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-foreground" title={value}>
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <div className="space-y-3">
              {personalData.education.map((edu, index) => (
                <div key={`edu-${index}`} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{edu.school}</h4>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {edu.degree} · {edu.period}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {personalData.experience.map((exp, index) => (
                <div key={`exp-${index}`} className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{exp.position}</h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {exp.company}{exp.period ? ` · ${exp.period}` : ""}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={handleDownloadCV}
              disabled={isDownloading}
              className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isDownloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              {isDownloading ? "Opening CV..." : "View / download CV"}
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
