import { motion, useAnimation } from "framer-motion";
import { Award, ExternalLink, Lightbulb, MessageSquare, Clock, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CertificateModal } from "@/components/ui/certificate-modal";
import { ThemeAwareLogo } from "@/components/ui/theme-aware-logo";
import { personalData } from "@/data/personalData";

export default function SkillsSection() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    image: string;
    name: string;
    downloadUrl?: string;
  } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) controls.start("visible");
      },
      { threshold: 0.12 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [controls]);

  const softIcons = {
    "Problem Solving": Lightbulb,
    Communication: MessageSquare,
    Adaptability: Zap,
    "Time Management": Clock,
  };

  return (
    <section id="skills" className="bg-background py-16" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-pixel-square mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Capabilities
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground">Skills & expertise</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-xl border border-border bg-card p-6">
            <div className="mb-6 flex items-end justify-between">
              <h3 className="text-lg font-semibold tracking-[-0.02em] text-foreground">Technical skills</h3>
              <span className="font-pixel-square text-[8px] uppercase tracking-[0.1em] text-muted-foreground">
                Current stack
              </span>
            </div>

            <div className="space-y-5">
              {personalData.skills.technical.map((skill, index) => (
                <div key={skill.name}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="font-medium text-foreground">{skill.name}</span>
                    <span className="font-pixel-square text-[8px] tracking-[0.08em] text-muted-foreground">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-primary"
                      initial={{ width: 0 }}
                      animate={controls}
                      variants={{
                        visible: {
                          width: `${skill.level}%`,
                          transition: { duration: 1.1, delay: index * 0.06 },
                        },
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {personalData.skills.soft.map((skill, index) => {
              const Icon = softIcons[skill.name as keyof typeof softIcons] || Lightbulb;

              return (
                <motion.article
                  key={skill.name}
                  className="rounded-xl border border-border bg-card p-5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.4, delay: 0.12 + index * 0.05 },
                    },
                  }}
                >
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-4 w-4 text-primary" />
                  </div>
                  <h4 className="text-sm font-semibold text-foreground">{skill.name}</h4>
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">{skill.description}</p>
                </motion.article>
              );
            })}
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="font-pixel-square text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                Credentials
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-foreground">
                Certifications & achievements
              </h3>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">
              {personalData.certifications.length} credentials
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {personalData.certifications.map((cert, index) => (
              <motion.article
                key={cert.name}
                className="flex min-h-[190px] flex-col rounded-xl border border-border bg-card p-5 shadow-sm"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.04, 0.24) }}
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 shrink-0">
                    {cert.logo ? (
                      <ThemeAwareLogo src={cert.logo} alt={`${cert.issuer} logo`} label={cert.issuer} />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-primary/10">
                        <Award className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold leading-5 text-foreground">{cert.name}</h4>
                    <p className="mt-1 text-xs text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>

                <p className="mt-4 font-pixel-square text-[8px] tracking-[0.08em] text-primary">
                  {cert.issueDate}
                </p>

                <div className="mt-auto flex flex-wrap gap-3 pt-5">
                  {cert.image && (
                    <button
                      type="button"
                      onClick={() =>
                        setSelectedCertificate({
                          image: cert.image,
                          name: cert.name,
                          downloadUrl: cert.downloadUrl,
                        })
                      }
                      className="text-xs font-semibold text-foreground underline decoration-border underline-offset-4 transition hover:text-primary hover:decoration-primary"
                    >
                      View certificate
                    </button>
                  )}

                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground transition hover:text-primary"
                    >
                      Credential <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <CertificateModal
        isOpen={selectedCertificate !== null}
        onClose={() => setSelectedCertificate(null)}
        imageUrl={selectedCertificate?.image || ""}
        title={selectedCertificate?.name || ""}
        downloadUrl={selectedCertificate?.downloadUrl || ""}
      />
    </section>
  );
}
