import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart2, Image, Megaphone, PenTool, Users, ExternalLink } from "lucide-react";

export default function ClubsSection() {
  const clubIcons = {
    "DIAconomics Club": <BarChart2 className="text-primary" />,
    "DIAMUN": <Users className="text-primary" />,
    "Enterprise and Entrepreneurship": <PenTool className="text-primary" />,
    "SyntaxEngine": <Users className="text-primary" />
  };

  const getClubIcon = (clubName: string) => {
    return clubIcons[clubName as keyof typeof clubIcons] || <Users className="text-primary" />;
  };

  return (
    <section id="clubs" className="py-16 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">Clubs & Leadership Roles</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {personalData.clubs.map((club, index) => (
            <motion.div 
              key={`club-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 flex items-center justify-center mr-4">
                      {club.logo ? (
                        <img 
                          src={club.logo} 
                          alt={`${club.name} logo`}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          {getClubIcon(club.name)}
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-medium mb-2">{club.name}</h3>
                      <p className="text-sm text-gray-700 mb-3">{club.role} ({club.period})</p>
                      <ul className="list-disc list-inside text-gray-600 text-sm space-y-1">
                        {club.responsibilities.map((resp, i) => (
                          <li key={i}>{resp}</li>
                        ))}
                      </ul>
                      {club.url && club.url !== "#" && (
                        <a
                          href={club.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center text-sm font-semibold text-primary underline-offset-4 hover:underline"
                          style={ { paddingTop: "3px" } }
                        >
                          <ExternalLink className="mr-2 h-3 w-3" />
                          <span>Visit</span>
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
