import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Medal, Trophy, ImageIcon } from "lucide-react";
import { CertificateModal } from "@/components/ui/certificate-modal";
import { useState } from "react";

export default function ExperienceSection() {
  const [selectedImage, setSelectedImage] = useState<{
    image: string;
    name: string;
  } | null>(null);

  const competitionIcons = {
    "Python Developer": <Award className="text-blue-500" />,
    Scholar: <Trophy className="text-yellow-500" />,
    Competitor: <Medal className="text-purple-500" />,
    "Game Developer": <Award className="text-green-500" />,
    Delegate: <Award className="text-indigo-500" />,
  };

  // Helper function to get icon based on position
  const getCompetitionIcon = (position: string) => {
    return (
      competitionIcons[position as keyof typeof competitionIcons] || (
        <Award className="text-primary" />
      )
    );
  };

  return (
    <section id="competition" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">Experience</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Participation and achievements in various academic and technical
            competitions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalData.Experience.map((competition, index) => (
            <motion.div
              key={`competition-${index}`}
              className="bg-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    {getCompetitionIcon(competition.position)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium mb-2">
                          {competition.name}
                        </h3>
                        <p className="text-sm text-primary font-medium mb-1">
                          {competition.position}
                        </p>
                        <p className="text-xs text-gray-500 mb-2">
                          {competition.date}
                        </p>
                      </div>
                      {competition.image && (
                        <div className="ml-4 flex-shrink-0">
                          <div 
                            className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200 shadow-sm cursor-pointer relative group"
                            onClick={() => setSelectedImage({ image: competition.image, name: competition.name })}
                          >
                            <img
                              src={competition.image}
                              alt={`${competition.name} award`}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                              <span className="bg-white/0 group-hover:bg-white/90 text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                View
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {competition.description}
                    </p>
                    <div className="space-y-1">
                      {competition.achievements.map((achievement, i) => (
                        <div
                          key={i}
                          className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block mr-1 mb-1"
                        >
                          {achievement}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Image Modal */}
      <CertificateModal
        isOpen={selectedImage !== null}
        onClose={() => setSelectedImage(null)}
        imageUrl={selectedImage?.image || ""}
        title={selectedImage?.name || ""}
      />
    </section>
  );
}
