import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve Postimg-hosted portfolio media through our own origin.
// Some managed/school networks reject i.postimg.cc's TLS chain, while
// anshgupta.cc itself remains trusted. Keeping the browser on our origin
// avoids those client-side certificate failures and lets us cache responses.
app.get("/media/postimg/*", async (req, res) => {
  try {
    const relativePath = req.params[0];

    // Only allow the simple path shapes used by Postimg asset URLs.
    if (!relativePath || !/^[A-Za-z0-9._/-]+$/.test(relativePath)) {
      return res.status(400).send("Invalid media path");
    }

    const requestUrl = new URL(req.originalUrl, "https://anshgupta.cc");
    const upstreamUrl = `https://i.postimg.cc/${relativePath}${requestUrl.search}`;

    const upstream = await fetch(upstreamUrl, {
      redirect: "follow",
      headers: {
        "User-Agent": "anshgupta.cc media proxy",
        Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      },
    });

    if (!upstream.ok) {
      return res.status(upstream.status).send("Unable to load media");
    }

    const contentType = upstream.headers.get("content-type") || "";
    if (!contentType.startsWith("image/")) {
      return res.status(502).send("Unexpected media response");
    }

    const body = Buffer.from(await upstream.arrayBuffer());
    res.setHeader("Content-Type", contentType);
    res.setHeader(
      "Cache-Control",
      "public, max-age=86400, s-maxage=604800, stale-while-revalidate=604800",
    );
    res.setHeader("X-Content-Type-Options", "nosniff");
    return res.send(body);
  } catch (error) {
    console.error("Failed to proxy Postimg media:", error);
    return res.status(502).send("Unable to load media");
  }
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api") && path !== "/api/track-section") {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = 5000;
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
