import { motion } from "framer-motion";
import { personalData } from "@/data/personalData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BookOpenCheck,
  Briefcase,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Lightbulb,
  ListTodo,
  MessageSquare,
  Users,
} from "lucide-react";

const languageIconMap = {
  "Native or bilingual proficiency": Globe2,
  "Professional working proficiency": Briefcase,
  "Limited working proficiency": BookOpenCheck,
  "Elementary proficiency": GraduationCap,
};

const softSkillIcons = {
  "Problem Solving": Lightbulb,
  Communication: MessageSquare,
  Adaptability: CheckCircle2,
  "Time Management": ListTodo,
  "Team Leadership": Users,
};

export default function LanguagesSection() {
  const languageGroups = personalData.languages.reduce<Record<string, typeof personalData.languages>>(
    (groups, language) => {
      if (!groups[language.proficiency]) {
        groups[language.proficiency] = [];
      }
      groups[language.proficiency].push(language);
      return groups;
    },
    {},
  );

  const proficiencyOrder = [
    "Native or bilingual proficiency",
    "Professional working proficiency",
    "Limited working proficiency",
    "Elementary proficiency",
  ];

  const proficiencyDetails: Record<
    string,
    { title: string; description: string }
  > = {
    "Native or bilingual proficiency": {
      title: "Native & Bilingual",
      description: "Languages I use fluently every single day.",
    },
    "Professional working proficiency": {
      title: "Professional Working",
      description: "Languages I leverage in academic and professional settings.",
    },
    "Limited working proficiency": {
      title: "Conversational",
      description: "Comfortable in day-to-day conversations with continued practice.",
    },
    "Elementary proficiency": {
      title: "Learning & Elementary",
      description: "Languages I am actively learning and building confidence in.",
    },
  };

  const orderedGroups = proficiencyOrder
    .filter((proficiency) => languageGroups[proficiency]?.length)
    .map((proficiency) => ({
      proficiency,
      languages: languageGroups[proficiency],
      ...proficiencyDetails[proficiency],
    }));

  return (
    <section id="languages" className="py-16 bg-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-dark mb-4">Languages & Collaboration</h2>
          <div className="w-20 h-1 bg-accent mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Building bridges across cultures and teams with multilingual fluency and
            people-first soft skills.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {orderedGroups.map((group, index) => {
            const Icon = languageIconMap[group.proficiency] ?? Globe2;
            return (
              <motion.div
                key={group.proficiency}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border border-primary/10 bg-white shadow-md transition-shadow hover:shadow-lg">
                  <CardHeader className="pb-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                        <Icon size={22} />
                      </div>
                      <div>
                        <CardTitle className="text-xl text-dark">{group.title}</CardTitle>
                        <CardDescription className="text-sm text-gray-600">
                          {group.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {group.languages.map((language) => (
                        <span
                          key={language.name}
                          className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-white px-3 py-1 text-sm font-medium text-dark shadow-sm"
                        >
                          {language.logo ? (
                            <img
                              src={language.logo}
                              alt={`${language.name} flag`}
                              className="h-4 w-4 rounded-full object-cover"
                            />
                          ) : null}
                          {language.name}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: orderedGroups.length * 0.1 }}
          >
            <Card className="h-full border border-primary/10 bg-white shadow-md transition-shadow hover:shadow-lg">
              <CardHeader className="pb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <Users size={22} />
                  </div>
                  <div>
                    <CardTitle className="text-xl text-dark">Soft Skills Spotlight</CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Collaborative strengths that keep teams aligned and projects moving.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {personalData.skills.soft.map((skill) => {
                    const Icon = softSkillIcons[skill.name as keyof typeof softSkillIcons] ?? CheckCircle2;
                    return (
                      <div key={skill.name} className="flex items-start gap-3">
                        <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-dark">{skill.name}</h4>
                          <p className="text-sm text-gray-600">{skill.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
