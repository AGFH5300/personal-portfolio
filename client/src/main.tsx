import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { TooltipProvider } from "./components/ui/tooltip";
import { Toaster } from "./components/ui/toaster";

const POSTIMG_ORIGIN = "https://i.postimg.cc/";
const POSTIMG_PROXY_PREFIX = "/media/postimg/";

// React ultimately writes image/link URLs to DOM attributes. Rewrite Postimg
// URLs before the browser requests them so managed networks never connect to
// i.postimg.cc directly. This covers images as well as certificate download
// links without having to duplicate every asset inside the repository.
const originalSetAttribute = Element.prototype.setAttribute;
Element.prototype.setAttribute = function (name: string, value: string) {
  const rewrittenValue = value.startsWith(POSTIMG_ORIGIN)
    ? `${POSTIMG_PROXY_PREFIX}${value.slice(POSTIMG_ORIGIN.length)}`
    : value;

  return originalSetAttribute.call(this, name, rewrittenValue);
};

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <App />
    </TooltipProvider>
  </QueryClientProvider>
);
