import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Ansh <span className="text-foreground">Gupta</span>
            </Link>
          </div>
          <div className="text-sm text-gray-400">
            &copy; {currentYear} Ansh Gupta. All rights reserved.
          </div>
          <div className="mt-4 md:mt-0">
            <a
              href="#about"
              className="text-gray-400 hover:text-primary mx-2 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              About
            </a>
            <a
              href="#competition"
              className="text-gray-400 hover:text-primary mx-2 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("competition")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-gray-400 hover:text-primary mx-2 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Projects
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
