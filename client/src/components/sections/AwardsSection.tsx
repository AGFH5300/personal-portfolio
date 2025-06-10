import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Medal, Trophy } from "lucide-react";

export default function AwardsSection() {
  const awardIcons = {
    "1st Place": <Trophy className="text-yellow-500" />,
    "2nd Place": <Medal className="text-gray-400" />,
    "3rd Place": <Medal className="text-amber-700" />,
    "4th Place": <Award className="text-primary" />,
  };

  // Helper function to get icon based on award name
  const getAwardIcon = (name: string) => {
    if (name.includes("1st Place")) return awardIcons["1st Place"];
    if (name.includes("2nd Place")) return awardIcons["2nd Place"];
    if (name.includes("3rd Place")) return awardIcons["3rd Place"];
    if (name.includes("4th Place")) return awardIcons["4th Place"];
    return <Award className="text-primary" />;
  };

  return (
    <section id="awards" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">Awards & Honors</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Recognition for academic achievements and competition success.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {personalData.awards.map((award, index) => (
            <motion.div
              key={`award-${index}`}
              className="bg-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                      {getAwardIcon(award.name)}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">{award.name}</h3>
                      <p className="text-sm text-gray-700 mb-1">{award.issuer}</p>
                      <p className="text-xs text-gray-500">{award.date}</p>
                    </div>
                  </div>
                </CardContent>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}