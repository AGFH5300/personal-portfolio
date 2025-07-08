import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Code2, ArrowRight } from "lucide-react";
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
            A selection of projects I've worked on, ranging from personal
            initiatives to professional collaborations.
          </p>
        </motion.div>

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
                      key={i}
                      variant="outline"
                      className={`px-2 py-1 tech-badge-${tech.color} text-xs rounded`}
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-4">
                  {project.demoUrl && project.demoUrl !== "#" && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-black transition-colors duration-300 flex items-center"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      <span>View Project</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Learning Journey Section - Under Maintenance */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="relative bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 max-w-4xl mx-auto overflow-hidden">
            {/* Construction Tape X */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Top-left to bottom-right tape */}
              <div 
                className="absolute h-8 shadow-lg"
                style={{
                  top: '0',
                  left: '0',
                  width: '141.42%',
                  backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 20px, #fbbf24 20px, #fbbf24 40px)',
                  backgroundSize: '40px 100%',
                  transform: 'rotate(45deg)',
                  transformOrigin: '0 0'
                }}>
              </div>

              {/* Top-right to bottom-left tape */}
              <div 
                className="absolute h-8 shadow-lg"
                style={{
                  top: '0',
                  right: '0',
                  width: '141.42%',
                  backgroundImage: 'repeating-linear-gradient(90deg, #000 0px, #000 20px, #fbbf24 20px, #fbbf24 40px)',
                  backgroundSize: '40px 100%',
                  transform: 'rotate(-45deg)',
                  transformOrigin: '100% 0'
                }}>
              </div>

              {/* Construction text on tape */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 border-2 border-black px-4 py-2 rounded shadow-lg">
                <div className="text-black font-bold text-sm uppercase tracking-wide">
                  Under Maintenance
                </div>
              </div>
            </div>

            {/* Original content - slightly grayed */}
            <CardContent className="p-8 filter grayscale-[50%] opacity-75">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Code2 className="text-primary" size={32} />
                </div>
              </div>

              <h3 className="text-2xl font-bold text-dark mb-4">
                My Coding Learning Journey
              </h3>

              <p className="text-gray-600 mb-6 max-w-2xl mx-auto text-lg">
                Explore my complete collection of Python projects, web applications, and coding projects created while learning and exploring different programming languages and technologies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">60+</div>
                  <div className="text-sm text-gray-600">Python Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">Multiple</div>
                  <div className="text-sm text-gray-600">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">100+</div>
                  <div className="text-sm text-gray-600">Hours Coded</div>
                </div>
              </div>

              <Link href="">
                <Button size="lg" className="group cursor-not-allowed opacity-60" disabled>
                  View All My Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <p className="text-xs text-gray-500 mt-4">
                Includes projects from Harvard CS50, Udemy courses, and personal projects
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
