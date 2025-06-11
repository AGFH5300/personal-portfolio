import { motion, useAnimation } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { personalData } from "@/data/personalData";
import { Card, CardContent } from "@/components/ui/card";
import { Users, MessageSquare, Lightbulb, ListTodo } from "lucide-react";
import { CertificateModal } from "@/components/ui/certificate-modal";

export default function SkillsSection() {
  const controls = useAnimation();
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<{
    image: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start("visible");
        }
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const skillIcons = {
    "Team Leadership": <Users className="text-primary text-xl" />,
    Communication: <MessageSquare className="text-primary text-xl" />,
    "Problem Solving": <Lightbulb className="text-primary text-xl" />,
    "Project Management": <ListTodo className="text-primary text-xl" />,
  };

  return (
    <section id="skills" className="py-16 bg-white" ref={sectionRef}>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold mb-6">Technical Skills</h3>

            {personalData.skills.technical.map((skill, index) => (
              <div className="mb-5" key={`tech-${index}`}>
                <div className="flex justify-between mb-1">
                  <span className="font-medium">{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div
                    className="bg-primary h-2.5 rounded-full"
                    initial={{ width: 0 }}
                    animate={controls}
                    variants={{
                      visible: {
                        width: `${skill.level}%`,
                        transition: { duration: 1.5, delay: index * 0.1 },
                      },
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Soft Skills</h3>

            <div className="grid grid-cols-2 gap-4">
              {personalData.skills.soft.map((skill, index) => (
                <motion.div
                  key={`soft-${index}`}
                  className="p-4 bg-light rounded-lg text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  variants={{
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, delay: 0.2 + index * 0.1 },
                    },
                  }}
                >
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    {skillIcons[skill.name as keyof typeof skillIcons] || (
                      <Lightbulb className="text-primary text-xl" />
                    )}
                  </div>
                  <h4 className="font-medium mb-1">{skill.name}</h4>
                  <p className="text-sm text-gray-600">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
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
                  <h4 className="font-semibold text-lg mb-2">{cert.name}</h4>
                  <p className="text-sm text-gray-600 mb-3">{cert.issuer}</p>
                  <p className="text-sm text-gray-700 mb-3">{cert.issueDate}</p>
                </div>
                <div
                  className="relative overflow-hidden cursor-pointer"
                  style={{ height: "200px" }}
                  onClick={() => setSelectedCertificate(cert)}
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
      />
    </section>
  );
}
