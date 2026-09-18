import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-8 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <AlertCircle className="h-5 w-5 text-primary" />
        </div>
        <p className="font-pixel-square mt-6 text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
          Error 404
        </p>
        <h1 className="mt-2 text-2xl font-bold tracking-[-0.03em] text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          The URL may be incorrect or the page may have moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>
      </div>
    </main>
  );
}
