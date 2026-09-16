import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Users } from "lucide-react";
import { clubHighlights } from "@/data/profileHighlights";

export default function ClubsSection() {
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {clubHighlights.map((club, index) => (
            <motion.div
              key={club.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
            >
              <Card className="h-full shadow-md transition-shadow hover:shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 flex items-center justify-center">
                      {club.logo ? (
                        <img
                          src={club.logo}
                          alt={`${club.name} logo`}
                          className="w-full h-full object-contain rounded-sm"
                          loading="lazy"
                          decoding="async"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users className="text-primary" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="text-lg font-semibold mb-1">{club.name}</h3>
                      <p className="text-sm text-gray-700">{club.role}</p>
                      {club.period && (
                        <p className="text-xs text-gray-500 mt-1">{club.period}</p>
                      )}

                      {club.url && (
                        <a
                          href={club.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center mt-3 text-sm font-semibold text-primary underline-offset-4 hover:underline"
                        >
                          <ExternalLink className="mr-2 h-3.5 w-3.5" />
                          Visit website
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
