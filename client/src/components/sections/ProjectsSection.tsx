import { motion } from "framer-motion";
import { ExternalLink, Code2, Trophy } from "lucide-react";
import { projectHighlights } from "@/data/profileHighlights";

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">Projects</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            A selection of platforms, websites, competition projects and applications I've built.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectHighlights.map((project, index) => (
            <motion.div
              key={project.name}
              className="bg-white rounded-lg overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-lg flex flex-col"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: Math.min(index * 0.05, 0.3) }}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-44 object-cover"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="h-44 bg-primary/5 flex items-center justify-center border-b border-primary/10">
                  <Code2 className="text-primary/60" size={44} />
                </div>
              )}

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{project.description}</p>

                {project.achievement && (
                  <div className="inline-flex items-center self-start text-xs font-semibold bg-primary/10 text-primary rounded-full px-3 py-1 mb-4">
                    <Trophy className="mr-1.5 h-3.5 w-3.5" />
                    {project.achievement}
                  </div>
                )}

                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-flex items-center text-primary hover:text-black transition-colors duration-300 font-medium text-sm"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Project
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
