import { motion } from "framer-motion";
import { useState } from "react";
import { personalData } from "@/data/personalData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Award,
  BrainCircuit,
  Cloud,
  Gamepad2,
  Laptop,
  Palette,
  Radar,
  ServerCog,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { CertificateModal } from "@/components/ui/certificate-modal";

const iconMap: Record<string, LucideIcon> = {
  Laptop,
  Palette,
  ServerCog,
  BrainCircuit,
  Wrench,
  Cloud,
  Gamepad2,
  Radar,
};

export default function SkillsSection() {
  const [selectedCertificate, setSelectedCertificate] = useState<{
    image: string;
    name: string;
    downloadUrl?: string;
  } | null>(null);

  return (
    <section id="skills" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <motion.p
          className="text-gray-600 mt-4 max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          A curated overview of the technologies, platforms, and workflows I use to
          design, build, and ship polished experiences across web, backend, and game
          projects.
        </motion.p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {personalData.techStack.map((category, index) => {
            const Icon = iconMap[category.icon] ?? Laptop;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card className="h-full border border-primary/10 bg-white shadow-md transition-shadow hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <Icon size={24} />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-dark">{category.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {category.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs uppercase tracking-wide text-gray-500 mb-4">
                      {category.items.length} capabilities
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications Section */}
        <div className="mt-16">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-bold text-dark mb-4">
              Certifications & Achievements
            </h3>
            <div className="w-20 h-1 bg-accent mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalData.certifications.map((cert, index) => (
              <motion.div
                key={`cert-${index}`}
                className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-4 flex-grow">
                  <div className="flex items-start mb-3">
                    <div className="w-10 h-10 flex items-center justify-center mr-3 flex-shrink-0">
                      {cert.logo ? (
                        <img
                          src={cert.logo}
                          alt={`${cert.issuer} logo`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="text-primary" size={20} />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg mb-1">{cert.name}</h4>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mb-3">{cert.issueDate}</p>
                </div>
                {cert.image && (
                  <div
                    className="relative overflow-hidden cursor-pointer"
                    style={{ height: "200px" }}
                    onClick={() => setSelectedCertificate({ image: cert.image, name: cert.name, downloadUrl: cert.downloadUrl })}
                  >
                    <div className="absolute inset-0 bg-black/5 hover:bg-black/20 transition-colors flex items-center justify-center">
                      <span className="bg-white/90 text-primary text-xs px-2 py-1 rounded">
                        View Certificate
                      </span>
                    </div>
                    <img
                      src={cert.image}
                      alt={cert.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Certificate Modal */}
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
