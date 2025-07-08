import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Code2, ArrowRight } from "lucide-react";
import { Link } from "wouter";

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
            A selection of projects I've worked on, including interactive coding projects you can run.
          </p>
        </motion.div>

        {/* Web Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-dark mb-8">Web Projects</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalData.projects.map((project, index) => (
              <motion.div
                key={`project-${index}`}
                className="bg-white rounded-lg overflow-hidden shadow-md transition transform hover:-translate-y-1 hover:shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full object-cover"
                />
                <div className="p-6" style={{paddingBottom:'12px'}}>
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, i) => (
                      <Badge
                        key={`tech-${i}`}
                        variant="secondary"
                        className={`text-xs px-2 py-1 bg-${tech.color}-100 text-${tech.color}-800 hover:bg-${tech.color}-200`}
                      >
                        {tech.name}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="text-xs px-3 py-1"
                    >
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Coding Projects Preview */}
        <div>
          <h3 className="text-2xl font-semibold text-dark mb-8">Interactive Coding Projects</h3>
          <div className="bg-white rounded-lg p-8 text-center shadow-md">
            <Code2 className="h-16 w-16 text-accent mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Explore My Code</h4>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Run and interact with my coding projects directly in your browser. Experience real Python programs with live execution.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 max-w-md mx-auto">
              {personalData.codingProjects.slice(0, 6).map((project) => (
                <div key={project.id} className="text-center">
                  <div className="text-xs font-medium text-gray-700">{project.name}</div>
                  <div className="text-xs text-gray-500">{project.language}</div>
                </div>
              ))}
            </div>
            <Button asChild size="lg" className="text-white">
              <Link href="/all" className="flex items-center gap-2">
                <Code2 className="h-4 w-4" />
                View All My Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}