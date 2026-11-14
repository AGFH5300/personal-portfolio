import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, BookOpen, GraduationCap, Gift } from "lucide-react";

export default function VolunteerSection() {
  const volunteerIcons = {
    "Panchgani Education Initiative": <GraduationCap className="text-white" />,
    "Donating Hot Meals": <Gift className="text-white" />,
    "Tata Cancer Hospital": <Heart className="text-white" />,
    "School for Children with Hearing and Speech Impairments": <BookOpen className="text-white" />
  };

  return (
    <section id="volunteer" className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">Volunteer Experience</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>
        
        <div className="relative pl-10 timeline-container">
          {personalData.volunteerWork.map((work, index) => (
            <motion.div 
              key={`volunteer-${index}`}
              className="mb-10 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute left-0 w-9 h-9 -ml-10 bg-primary rounded-full flex items-center justify-center text-white shadow-md z-10">
                {volunteerIcons[work.organization as keyof typeof volunteerIcons] || <Heart className="text-white" />}
              </div>
              <Card className="shadow-sm ml-4">
                <CardContent className="p-6">
                  <div className="flex justify-between flex-wrap mb-2">
                    <h3 className="text-lg font-medium">{work.organization}</h3>
                    <span className="text-sm text-gray-600">{work.period}</span>
                  </div>
                  <p className="text-gray-700 mb-3">{work.role}</p>
                  <p className="text-sm text-gray-600">{work.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gray-200" style={{ left: "18px" }}></div>
        </div>
      </div>
    </section>
  );
}
