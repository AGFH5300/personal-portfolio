import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { personalData } from "@/data/personalData";

export default function HeroSection() {
  return (
    <section
      id="about"
      className="relative bg-gradient-to-r from-primary to-secondary text-foreground py-20 md:py-32"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={personalData.profileImage}
              alt={`${personalData.name} Profile Picture`}
              className="rounded-full w-64 h-64 object-cover border-4 border-white shadow-xl mx-auto md:mx-0"
            />
          </motion.div>
          <motion.div
            className="md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground drop-shadow-md">
              {personalData.name}
            </h1>
            <p className="text-xl mb-6 font-semibold text-white drop-shadow-md">
              {personalData.title}
            </p>
            <div className="relative z-[15] bg-black/40 backdrop-blur-sm p-5 rounded-lg shadow-md w-full max-w-lg">
              <p className="text-lg text-white">{personalData.shortBio}</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#F9FAFB"
            fillOpacity="1"
            d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,181.3C960,181,1056,139,1152,117.3C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
