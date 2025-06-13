import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Briefcase, GraduationCap, Trophy } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function AboutSection() {
  return (
    <section className="py-16 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">About Me</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold mb-4">Who I Am</h3>
            <p className="text-gray-700 mb-4">{personalData.fullBio[0]}</p>
            <p className="text-gray-700 mb-4">{personalData.fullBio[1]}</p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="w-24 font-medium">Name:</span>
                  <span className="text-gray-700">{personalData.name}</span>
                </li>
                <li className="flex items-center">
                  <span className="w-24 font-medium">Age:</span>
                  <span className="text-gray-700">{personalData.age}</span>
                </li>
                <li className="flex items-center">
                  <span className="w-24 font-medium">Nationality:</span>
                  <span className="text-gray-700">
                    {personalData.nationality}
                  </span>
                </li>
                <li className="flex items-center">
                  <span className="w-24 font-medium">Email:</span>
                  <span className="text-gray-700">{personalData.email}</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold mb-4">
              Education & Experience
            </h3>
            <div className="space-y-4">
              {personalData.education.map((edu, index) => (
                <Card
                  key={`edu-${index}`}
                  className="shadow-sm border border-gray-100"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="text-primary mr-3" />
                      <h4 className="font-medium">{edu.school}</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {edu.degree} | {edu.period}
                    </p>
                  </CardContent>
                </Card>
              ))}

              {personalData.experience.map((exp, index) => (
                <Card
                  key={`exp-${index}`}
                  className="shadow-sm border border-gray-100"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center mb-2">
                      <Briefcase className="text-primary mr-3" />
                      <h4 className="font-medium">{exp.position}</h4>
                    </div>
                    <p className="text-sm text-gray-600">
                      {exp.company} {exp.period}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <a
                // href="https://drive.google.com/uc?export=download&id=<id>"
                className="inline-flex items-center text-primary hover:text-black transition-colors duration-300"
              >
                <span>Download CV</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
