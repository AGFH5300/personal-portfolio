import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play, Code, Zap } from "lucide-react";
import { Link } from "wouter";

export default function AllProjects() {
  const handleProjectClick = (projectId: string) => {
    // Navigate to individual project page
    window.location.href = `/project/${projectId}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'games':
        return <Play className="w-4 h-4" />;
      case 'utility':
        return <Zap className="w-4 h-4" />;
      default:
        return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-light">
      {/* Header */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link href="/" className="inline-flex items-center text-primary hover:text-dark transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl font-bold text-dark mb-4">
              My Coding Learning Journey
            </h1>
            <p className="text-gray-600 text-lg max-w-3xl">
              Explore my collection of Python projects created while learning programming. 
              Each project represents a step in my coding journey, from basic concepts to more complex applications.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {personalData.pythonProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2 text-primary">
                        {getCategoryIcon(project.category)}
                        <span className="text-sm font-medium">{project.category}</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={getDifficultyColor(project.difficulty)}
                      >
                        {project.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {project.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex flex-col h-full">
                    <p className="text-gray-600 mb-6 flex-grow">
                      {project.description}
                    </p>
                    
                    <Button 
                      onClick={() => handleProjectClick(project.id)}
                      className="w-full group-hover:bg-primary group-hover:text-white transition-all"
                      variant="outline"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Run Project
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Coming Soon Section */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-dark mb-4">
                  More Projects Coming Soon!
                </h3>
                <p className="text-gray-600">
                  I'm constantly working on new projects and challenges. 
                  Check back regularly to see my latest coding adventures and learning milestones.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}