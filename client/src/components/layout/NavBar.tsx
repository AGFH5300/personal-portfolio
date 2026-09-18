import { useEffect, useRef, useState } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#competition" },
  { name: "Clubs", href: "#clubs" },
  { name: "Languages", href: "#languages" },
  { name: "Volunteer", href: "#volunteer" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [navVisible, setNavVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);
      setShowBackToTop(currentY > 300);

      if (isOpen || currentY <= 80) {
        setNavVisible(true);
      } else if (currentY > lastScrollY.current + 6) {
        setNavVisible(false);
      } else if (currentY < lastScrollY.current - 6) {
        setNavVisible(true);
      }

      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = currentY + 110;

      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");

    if (href?.startsWith("#")) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        const offsetTop =
          element.getBoundingClientRect().top + window.pageYOffset - 88;
        window.scrollTo({ top: offsetTop, behavior: "smooth" });
      }

      setIsOpen(false);
      setNavVisible(true);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={cn(
          "fixed left-0 right-0 top-0 z-50 border-b border-transparent bg-background/90 backdrop-blur-xl transition-[transform,box-shadow,border-color,padding] duration-300",
          scrolled ? "border-border/80 py-2 shadow-sm" : "py-3.5",
          navVisible ? "translate-y-0" : "-translate-y-full",
        )}
      >
        <div className="container mx-auto flex items-center justify-between gap-5 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="shrink-0 text-[22px] font-bold tracking-tight">
            <span className="text-primary">Ansh </span>
            <span className="text-foreground">Gupta</span>
          </Link>

          <div className="ml-auto hidden items-center gap-4 md:flex">
            <nav>
              <ul className="flex items-center gap-4 lg:gap-6">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);

                  return (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className={cn(
                          "relative py-2 text-[15px] font-semibold tracking-[-0.01em] transition-colors duration-200",
                          isActive
                            ? "text-primary"
                            : "text-foreground/80 hover:text-foreground",
                        )}
                        onClick={handleLinkClick}
                      >
                        {link.name}
                        {isActive && (
                          <span className="absolute inset-x-0 -bottom-0.5 h-px bg-primary" />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen((open) => !open)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        <div
          className={cn(
            "overflow-hidden border-border bg-background/95 transition-[max-height,opacity,border-color] duration-300 md:hidden",
            isOpen
              ? "max-h-[32rem] border-t opacity-100"
              : "max-h-0 border-t-transparent opacity-0",
          )}
        >
          <ul className="px-4 py-3 sm:px-6">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);

              return (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={cn(
                      "block rounded-md px-3 py-2.5 text-[15px] font-semibold transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/80 hover:bg-muted hover:text-foreground",
                    )}
                    onClick={handleLinkClick}
                  >
                    {link.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      {showBackToTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.85 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-lg transition hover:-translate-y-0.5 hover:border-primary/50 hover:text-primary"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </>
  );
}
