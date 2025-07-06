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

        {/* Learning Journey Section - Under Construction */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="relative bg-gray-200 border-gray-300 max-w-4xl mx-auto overflow-hidden">
            {/* Construction Tape Overlay */}
            <div className="absolute inset-0 z-10 pointer-events-none">
              {/* Diagonal tape stripes with animation */}
              <motion.div 
                className="absolute inset-0 transform rotate-45 translate-x-[-25%] translate-y-[-25%]"
                animate={{ 
                  opacity: [0.7, 0.9, 0.7],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div className="w-[150%] h-[150%] shadow-lg"
                     style={{
                       background: 'repeating-linear-gradient(90deg, #000 0px, #000 20px, #fbbf24 20px, #fbbf24 40px, #000 40px, #000 60px, #fbbf24 60px, #fbbf24 80px)',
                       backgroundSize: '80px 100%',
                       filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                     }}>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute inset-0 transform -rotate-45 translate-x-[25%] translate-y-[-25%]"
                animate={{ 
                  opacity: [0.9, 0.7, 0.9],
                  scale: [1.02, 1, 1.02]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
              >
                <div className="w-[150%] h-[150%] shadow-lg"
                     style={{
                       background: 'repeating-linear-gradient(90deg, #000 0px, #000 20px, #fbbf24 20px, #fbbf24 40px, #000 40px, #000 60px, #fbbf24 60px, #fbbf24 80px)',
                       backgroundSize: '80px 100%',
                       filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                     }}>
                </div>
              </motion.div>

              {/* Construction Warning Sign with pulsing animation */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-yellow-400 border-4 border-black p-6 rounded-lg shadow-2xl text-black font-bold text-center"
                animate={{ 
                  scale: [1, 1.05, 1],
                  rotate: [0, 1, -1, 0]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                style={{
                  boxShadow: '0 10px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.3)'
                }}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🚧
                </motion.div>
                <div className="text-xl font-extrabold uppercase tracking-wide text-shadow">
                  Under Construction
                </div>
                <motion.div 
                  className="text-sm mt-2"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Coming Soon
                </motion.div>
              </motion.div>
              
              {/* Additional animated elements */}
              <motion.div
                className="absolute top-4 right-4 text-yellow-500 text-xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                ⚠️
              </motion.div>
              
              <motion.div
                className="absolute bottom-4 left-4 text-yellow-500 text-xl"
                animate={{ rotate: -360 }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              >
                🔧
              </motion.div>
            </div>

            {/* Grayed out content */}
            <CardContent className="p-8 filter grayscale opacity-30">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                  <Code2 className="text-gray-500" size={32} />
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-600 mb-4">
                My Coding Learning Journey
              </h3>
              
              <p className="text-gray-500 mb-6 max-w-2xl mx-auto text-lg">
                Explore my complete collection of Python projects, web applications, and coding projects created while learning and exploring different programming languages and technologies.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-500">60+</div>
                  <div className="text-sm text-gray-400">Python Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-500">Multiple</div>
                  <div className="text-sm text-gray-400">Languages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-500">100+</div>
                  <div className="text-sm text-gray-400">Hours Coded</div>
                </div>
              </div>

              <Button size="lg" className="bg-gray-400 text-gray-600 cursor-not-allowed" disabled>
                View All My Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              
              <p className="text-xs text-gray-400 mt-4">
                Includes projects from Harvard CS50, Udemy courses, and personal projects
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
