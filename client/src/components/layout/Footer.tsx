import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="container mx-auto flex flex-col gap-5 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <Link href="/" className="text-lg font-bold tracking-[-0.02em]">
            <span className="text-primary">Ansh </span>
            <span className="text-foreground">Gupta</span>
          </Link>
          <p className="font-pixel-square mt-1 text-[8px] uppercase tracking-[0.12em] text-muted-foreground">
            Developer · Student · Builder
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-muted-foreground">
          <a href="#about" className="transition hover:text-primary">About</a>
          <a href="#competition" className="transition hover:text-primary">Experience</a>
          <a href="#projects" className="transition hover:text-primary">Projects</a>
          <a
            href="https://github.com/AGFH5300"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 transition hover:text-primary"
          >
            GitHub <ArrowUpRight className="h-3 w-3" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {currentYear} Ansh Gupta
        </p>
      </div>
    </footer>
  );
}
