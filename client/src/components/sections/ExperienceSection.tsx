import { motion } from "framer-motion";
import { Award, ChevronLeft, ChevronRight, Medal, Trophy } from "lucide-react";
import { useState } from "react";
import { CertificateModal } from "@/components/ui/certificate-modal";
import { ThemeAwareLogo } from "@/components/ui/theme-aware-logo";
import { personalData } from "@/data/personalData";

export default function ExperienceSection() {
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    name: string;
    downloadUrl?: string;
    images?: Array<{ url: string; downloadUrl?: string; caption?: string }>;
  } | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});
  const [modalImageIndex, setModalImageIndex] = useState(0);

  const competitionIcons = {
    "Python Developer": Award,
    Scholar: Trophy,
    Competitor: Medal,
    "Game Developer": Award,
    Delegate: Award,
  };

  return (
    <section id="competition" className="bg-background py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
        >
          <p className="font-pixel-square mb-2 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
            Competitions & milestones
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground">Experience</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Academic, technical and competition experience, including team awards and individual achievements.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {personalData.Experience.map((competition, index) => {
            const Icon =
              competitionIcons[competition.position as keyof typeof competitionIcons] || Award;
            const images = competition.images ?? [];
            const imageIndex = currentImageIndex[index] || 0;
            const image = images[imageIndex];

            return (
              <motion.article
                key={competition.name}
                className="flex min-h-[235px] flex-col rounded-xl border border-border bg-card p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.035, 0.22) }}
              >
                <div className="flex items-start gap-3">
                  <div className="h-11 w-11 shrink-0">
                    {competition.logo ? (
                      <ThemeAwareLogo
                        src={competition.logo}
                        alt={`${competition.name} logo`}
                        label={competition.name}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-[15px] font-semibold leading-5 tracking-[-0.02em] text-foreground">
                      {competition.name}
                    </h3>
                    <p className="mt-1 text-xs font-medium text-primary">{competition.position}</p>
                    <p className="font-pixel-square mt-1.5 text-[8px] tracking-[0.08em] text-muted-foreground">
                      {competition.date}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-muted-foreground">{competition.description}</p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {competition.achievements.map((achievement) => (
                    <span
                      key={achievement}
                      className="rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1 text-[10px] font-semibold text-primary"
                    >
                      {achievement}
                    </span>
                  ))}
                </div>

                {image && (
                  <div className="mt-auto pt-4">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setModalImageIndex(imageIndex);
                          setSelectedImage({
                            image: image.url,
                            name: competition.name,
                            downloadUrl: image.downloadUrl,
                            images,
                          });
                        }}
                        className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border bg-muted/30 p-2 text-left transition hover:border-primary/35"
                      >
                        <img
                          src={image.url}
                          alt={image.caption || `${competition.name} image`}
                          className="h-9 w-9 rounded object-cover"
                          loading="lazy"
                        />
                        <span className="truncate text-[11px] font-medium text-foreground">
                          {image.caption || "View image"}
                        </span>
                      </button>

                      {images.length > 1 && (
                        <div className="flex shrink-0 gap-1">
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentImageIndex((prev) => ({
                                ...prev,
                                [index]:
                                  imageIndex > 0
                                    ? imageIndex - 1
                                    : images.length - 1,
                              }))
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:text-primary"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setCurrentImageIndex((prev) => ({
                                ...prev,
                                [index]:
                                  imageIndex < images.length - 1
                                    ? imageIndex + 1
                                    : 0,
                              }))
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground transition hover:text-primary"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>

      <CertificateModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.image || ""}
        title={selectedImage?.name || ""}
        downloadUrl={selectedImage?.downloadUrl || ""}
        images={selectedImage?.images}
        currentImageIndex={modalImageIndex}
        onImageChange={setModalImageIndex}
      />
    </section>
  );
}
